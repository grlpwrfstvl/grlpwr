import {defineField} from 'sanity'

type ImageFieldOptions = {
  name?: string
  title?: string
  description?: string
  required?: boolean
  group?: string
}

/** Image with hotspot and alt text. Alt is a warning, not a blocker, so old content still publishes. */
export function imageField({name = 'image', title = 'Bilde', description, required, group}: ImageFieldOptions = {}) {
  return defineField({
    name,
    title,
    description,
    group,
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternativ tekst',
        type: 'string',
        description: 'Beskriv bildet kort for de som bruker skjermleser, f.eks. «Maya Vik med bassgitar på scenen».',
        validation: (rule) => rule.warning().required(),
      }),
    ],
    validation: required ? (rule) => rule.required() : undefined,
  })
}

export const festivalReferenceField = defineField({
  name: 'festival',
  title: 'Festival',
  type: 'reference',
  to: [{type: 'festival'}],
  description: 'Hvilket festivalår hører dette til? Fylles automatisk inn med årets festival.',
  validation: (rule) => rule.required(),
})

export function slugField(source = 'name') {
  return defineField({
    name: 'slug',
    title: 'URL-navn',
    type: 'slug',
    description: 'Delen av nettadressen som peker hit. Trykk «Generate» for å lage den fra navnet.',
    options: {source, maxLength: 96},
    validation: (rule) => rule.required(),
  })
}

export const formatOsloDateTime = (value?: string) =>
  value
    ? new Intl.DateTimeFormat('nb-NO', {
        timeZone: 'Europe/Oslo',
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(value))
    : undefined

/** Pre-fills `festival` on new documents with the festival chosen in Innstillinger. */
export async function currentFestivalInitialValue(
  _params: unknown,
  {getClient}: {getClient: (options: {apiVersion: string}) => {fetch: (query: string) => Promise<string | null>}},
) {
  const ref = await getClient({apiVersion: '2025-10-01'}).fetch(`*[_id == "siteSettings"][0].currentFestival._ref`)
  return ref ? {festival: {_type: 'reference', _ref: ref}} : {}
}
