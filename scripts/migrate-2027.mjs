// Moves existing content to the festival-edition model introduced in the 2027 overhaul.
//
//   pnpm migrate            → dry run, prints what would change
//   pnpm migrate --apply    → writes to the dataset
//   pnpm migrate --apply --delete-legacy   → also deletes the old `home` document
//   pnpm migrate --out=mutations.json      → dry run, also saves the mutations for review
//
// Needs SANITY_WRITE_TOKEN (Editor) in .env or the environment. Safe to run more than once:
// new documents use fixed ids and existing values are never overwritten.
//
// Take a backup first:  pnpm sanity dataset export production backup-before-2027.tar.gz

import {createClient} from '@sanity/client'
import {createReadStream, existsSync, writeFileSync} from 'node:fs'
import {randomUUID} from 'node:crypto'
import path from 'node:path'

if (existsSync('.env')) process.loadEnvFile('.env')

const apply = process.argv.includes('--apply')
const deleteLegacy = process.argv.includes('--delete-legacy')
const outFile = process.argv.find((arg) => arg.startsWith('--out='))?.slice(6)
const token = process.env.SANITY_WRITE_TOKEN

if (apply && !token) {
  console.error('SANITY_WRITE_TOKEN is missing. Add it to .env or the environment.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '59jzk62a',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-10-01',
  token,
  useCdn: false,
})

const key = () => randomUUID().replaceAll('-', '').slice(0, 12)
const ref = (id) => ({_type: 'reference', _ref: id})
const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** YYYY-MM-DD in Oslo time */
const osloDate = (iso) =>
  new Intl.DateTimeFormat('sv-SE', {timeZone: 'Europe/Oslo', year: 'numeric', month: '2-digit', day: '2-digit'}).format(
    new Date(iso),
  )
const yearOf = (iso) => Number(osloDate(iso).slice(0, 4))

const tx = client.transaction()
const log = []
const plan = (line) => log.push(line)

const docs = await client.fetch(
  `*[_type in ["home", "siteSettings", "festival", "stage", "artist", "event", "workshop", "news", "page", "gallery"] && !(_id in path("drafts.**"))]`,
)
const byType = (type) => docs.filter((doc) => doc._type === type)
const home = byType('home')[0]

// --- Festivals -----------------------------------------------------------------------------
const scheduled = [...byType('artist'), ...byType('event'), ...byType('workshop')].filter((doc) => doc.time)
const years = new Set(scheduled.map((doc) => yearOf(doc.time)))
for (const gallery of byType('gallery')) {
  const match = gallery.name?.match(/20\d\d/)
  if (match) years.add(Number(match[0]))
}
if (home?.eventYear) years.add(home.eventYear)

const festivalId = (year) => `festival-${year}`
for (const year of [...years].sort()) {
  // Festival days = the days artists played that year
  const artistDates = byType('artist')
    .filter((artist) => artist.time && yearOf(artist.time) === year)
    .map((artist) => osloDate(artist.time))
    .sort()
  const isCurrent = home?.eventYear === year
  const festival = {
    _id: festivalId(year),
    _type: 'festival',
    title: `GRL PWR FSTVL ${year}`,
    year,
    location: (isCurrent && home?.eventLocation) || 'Fredrikstad',
    ticketStatus: isCurrent && home?.ticketsLink ? 'onSale' : 'soon',
    ...(artistDates.length ? {startDate: artistDates[0], endDate: artistDates.at(-1)} : {}),
    ...(isCurrent && home?.eventDates ? {dateLabel: home.eventDates} : {}),
    ...(isCurrent && home?.ticketsLink ? {ticketsLink: home.ticketsLink} : {}),
  }
  tx.createIfNotExists(festival)
  plan(`festival ${year}: ${festival.startDate ?? '?'} → ${festival.endDate ?? '?'}${isCurrent ? ' (current)' : ''}`)
}

// --- Stages --------------------------------------------------------------------------------
const stageNames = new Set(byType('artist').map((artist) => artist.stage).filter((stage) => typeof stage === 'string'))
const stageId = (name) => `stage-${slugify(name)}`
for (const name of stageNames) {
  tx.createIfNotExists({_id: stageId(name), _type: 'stage', name: name.trim()})
  plan(`stage: ${name}`)
}

// --- Artists and events ----------------------------------------------------------------------
for (const artist of byType('artist')) {
  const patch = client.patch(artist._id)
  if (artist.time) patch.setIfMissing({festival: ref(festivalId(yearOf(artist.time)))})
  if (typeof artist.stage === 'string') patch.set({stage: ref(stageId(artist.stage))})
  patch.setIfMissing({headliner: false})
  if (artist.name !== artist.name?.trim()) patch.set({name: artist.name.trim()})
  tx.patch(patch)
}
plan(`artists: ${byType('artist').length} get festival + stage references`)

for (const event of byType('event')) {
  const patch = client.patch(event._id).setIfMissing({category: 'event', showInProgram: true})
  if (event.time) patch.setIfMissing({festival: ref(festivalId(yearOf(event.time)))})
  if (event.name !== event.name?.trim()) patch.set({name: event.name.trim()})
  tx.patch(patch)
}
plan(`events: ${byType('event').length} get festival + category`)

// Workshops become events with category "workshop"
for (const workshop of byType('workshop')) {
  const fields = {...workshop}
  for (const system of ['_id', '_type', '_rev', '_createdAt', '_updatedAt']) delete fields[system]
  tx.createIfNotExists({
    ...fields,
    _id: `workshop-${workshop._id}`,
    _type: 'event',
    category: 'workshop',
    showInProgram: true,
    ...(workshop.time ? {festival: ref(festivalId(yearOf(workshop.time)))} : {}),
  })
  tx.delete(workshop._id)
  plan(`workshop → event: ${workshop.name}`)
}

// --- News: the old slug field held a path like "artists/maya-vik" -----------------------------
const findBySlug = (types, slug) =>
  docs.find((doc) => types.includes(doc._type) && doc.slug?.current === slug)

function linkFromOldSlug(slug) {
  if (!slug) return undefined
  const [first, second] = slug.replace(/^\/+|\/+$/g, '').split('/')
  const routes = {gallery: '/gallery', program: '/program', artists: '/artists', events: '/events', contact: '/contact'}
  const target =
    (first === 'artists' && second && findBySlug(['artist'], second)) ||
    (first === 'events' && second && findBySlug(['event'], second)) ||
    (!second && findBySlug(['page', 'event', 'artist'], first))
  if (target) return {_type: 'link', type: 'internal', internal: ref(target._id)}
  if (!second && routes[first]) return {_type: 'link', type: 'route', route: routes[first]}
  if (/^https?:\/\//.test(slug)) return {_type: 'link', type: 'external', url: slug}
  return {_type: 'link', type: 'external', url: `/${first}${second ? `/${second}` : ''}`}
}

for (const news of byType('news')) {
  const patch = client.patch(news._id).setIfMissing({date: news._createdAt.slice(0, 10)})
  const oldSlug = news.slug?.current
  if (oldSlug && !news.link) {
    const link = linkFromOldSlug(oldSlug)
    patch.set({link})
    plan(`news "${news.title.trim()}": ${oldSlug} → ${link.type} ${link.internal?._ref ?? link.route ?? link.url}`)
  }
  patch.unset(['slug'])
  tx.patch(patch)
}

// --- Pages: plain content + link → sections ----------------------------------------------------
for (const page of byType('page')) {
  if (page.sections) continue
  const sections = []
  if (page.content?.length) sections.push({_key: key(), _type: 'textSection', body: page.content})
  if (page.link) {
    sections.push({
      _key: key(),
      _type: 'ctaSection',
      buttonLabel: `Besøk ${page.title}`,
      link: {_type: 'link', type: 'external', url: page.link},
    })
  }
  tx.patch(client.patch(page._id).set({sections}).unset(['content', 'link']))
  plan(`page "${page.title}": ${sections.length} sections`)
}

// --- Galleries -------------------------------------------------------------------------------
for (const gallery of byType('gallery')) {
  const year = gallery.name?.match(/20\d\d/)?.[0]
  if (year) tx.patch(client.patch(gallery._id).setIfMissing({festival: ref(festivalId(year))}))
}

// --- Site settings (replaces the old `home` document) ----------------------------------------
const ASSETS = 'src/app/(site)/assets'
const SPONSORS = [
  {name: 'St. Croix-huset', file: 'StCroix_logo_hvit.png', url: 'https://www.fredrikstad.kommune.no/tjenester/kulturogfritid/kulturhusene/st.-croix-huset/'},
  {name: 'Kulturrådet', file: 'KR_Kulturrådet_hvit.png', url: 'https://www.kulturdirektoratet.no/'},
  {name: 'Fredrikstad kommune', file: 'fredrikstad_kommune.png', url: 'https://www.fredrikstad.kommune.no/'},
  {name: 'Østfold fylkeskommune', file: 'ostfold.fk.png', url: 'https://www.ofk.no/'},
]

if (!docs.some((doc) => doc._id === 'siteSettings')) {
  const sponsors = []
  for (const sponsor of SPONSORS) {
    const file = path.join(ASSETS, sponsor.file)
    let asset = {_id: `image-(uploaded on --apply: ${sponsor.file})`}
    if (apply && existsSync(file)) asset = await client.assets.upload('image', createReadStream(file), {filename: sponsor.file})
    sponsors.push({
      _key: key(),
      _type: 'sponsor',
      name: sponsor.name,
      url: sponsor.url,
      logo: {_type: 'image', asset: ref(asset._id)},
    })
  }

  const pages = byType('page').filter((page) => page.slug?.current !== 'kontaktinfo')
  const navItem = (label, link) => ({_key: key(), _type: 'navItem', label, link: {_type: 'link', ...link}})

  tx.createIfNotExists({
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'GRL PWR FSTVL',
    currentFestival: ref(festivalId(home?.eventYear ?? Math.max(...years))),
    ...(home?.image ? {image: home.image} : {}),
    ...(home?.description ? {description: home.description} : {}),
    ...(home?.primaryColor ? {primaryColor: home.primaryColor} : {}),
    ...(home?.secondaryColor ? {secondaryColor: home.secondaryColor} : {}),
    ...(home?.accentColor ? {accentColor: home.accentColor} : {}),
    navigation: [
      navItem('Artister', {type: 'route', route: '/artists'}),
      navItem('Program', {type: 'route', route: '/program'}),
      navItem('Events', {type: 'route', route: '/events'}),
      navItem('Galleri', {type: 'route', route: '/gallery'}),
      navItem('Kontakt', {type: 'route', route: '/contact'}),
      ...pages.map((page) => navItem(page.title, {type: 'internal', internal: ref(page._id)})),
    ],
    socialLinks: {
      instagram: 'https://www.instagram.com/grlpwr_fstvl/',
      facebook: 'https://www.facebook.com/GRLPWRFSTVL/',
    },
    credits: [
      {_key: key(), _type: 'credit', role: 'Festivalsjef', name: 'Sara Jeanine Heidenstrøm'},
      {_key: key(), _type: 'credit', role: 'Design og foto', name: 'Maja Brenna', url: 'https://www.majabrenna.com/'},
      {_key: key(), _type: 'credit', role: 'Grafikk', name: 'Nora Syvertsen', url: 'https://www.instagram.com/nillustrasjon/'},
      {_key: key(), _type: 'credit', role: 'Web', name: 'Håkon Vadstein', url: 'https://www.vadstein.dev/'},
    ],
    sponsors,
    contactIntro: [
      {
        _key: key(),
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: key(),
            _type: 'span',
            marks: [],
            text: 'Har du spørsmål om festivalen? Ønsker du fremtidig samarbeid? Ta kontakt, så svarer vi på henvendelsen din så fort vi kan.',
          },
        ],
      },
    ],
    seo: {
      _type: 'seo',
      description: 'GRL PWR Festivalens offisielle side! En feiring av kvinner, musikk og kreativitet.',
    },
  })
  plan(`siteSettings: created from home "${home?.title}", ${sponsors.length} sponsors, ${pages.length + 5} menu items`)
}

if (deleteLegacy && home) {
  tx.delete(home._id)
  plan(`delete legacy home document ${home._id}`)
}

console.log(log.map((line) => `  • ${line}`).join('\n'))

if (outFile) writeFileSync(outFile, JSON.stringify(tx.toJSON(), null, 2))

if (!apply) {
  console.log(`\nDry run: ${tx.toJSON().length} mutations planned, nothing written. Run with --apply to write.`)
} else {
  const result = await tx.commit({visibility: 'async'})
  console.log(`\nDone: ${result.results.length} mutations in transaction ${result.transactionId}.`)
}
