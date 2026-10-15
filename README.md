# GRL PWR FSTVL

Website for GRL PWR FSTVL: Next.js (App Router) with Sanity Studio embedded at `/admin`.

## Development

```bash
pnpm install
cp .env.example .env   # fill in tokens as needed
pnpm dev               # http://localhost:3000, Studio on /admin
```

| Script | What it does |
|---|---|
| `pnpm dev` / `build` / `start` | Next.js |
| `pnpm lint` | ESLint |
| `pnpm typegen` | Regenerates `sanity.types.ts` from the schema and every `defineQuery` in `src/` – run after changing schema or queries |
| `pnpm migrate` | 2027 content migration (dry run by default, see below) |

## How content works

Everything is organised around **festivals**: one `festival` document per year (dates, location, ticket status and link). **Innstillinger → Årets festival** decides which one is current. That choice drives the home page, the program, the ticket buttons and which artists count as "this year". Artists and events belong to a festival, so older years are archived automatically.

**Getting ready for a new year:**

1. Festivaler → create "GRL PWR FSTVL 2027" with dates (ticket status "Kommer snart").
2. Innstillinger → Årets festival → choose 2027 → Publish.
3. Add artists and events under *Artister/Events → Per festival → 2027*. The festival field is filled in automatically.
4. Once tickets are on sale, set the ticket status to "I salg" and add the link.

Other editor-controlled content: menu, footer credits, sponsor logos, social links, contact text, the announcement bar, SEO defaults and brand colours (all under Innstillinger), plus pages built from sections (text, image, button, FAQ, lineup, gallery, video).

## Caching and live updates

Pages are static and cached until content changes:

- `<SanityLive />` revalidates affected pages when content changes, as long as someone has the site open.
- **Required in production:** a Sanity webhook so updates also land when nobody is on the site. In sanity.io/manage → API → Webhooks, add a POST to `https://www.grlpwrfstvl.no/api/revalidate` on create/update/delete, with a secret matching `SANITY_REVALIDATE_SECRET`.

## Preview (Presentation tool)

The **Forhåndsvisning** tab in the Studio shows the site with drafts and click-to-edit. It needs `SANITY_API_READ_TOKEN` (a Viewer token). Every origin the Studio runs on (localhost:3000, the production domain) must be listed as a CORS origin with credentials in sanity.io/manage.

## 2027 migration (one-off)

The content model changed in the overhaul branch. Existing content has to be migrated **at the same time as the new code is deployed**, because the old site can't read the new structure.

```bash
pnpm sanity dataset export production backup-before-2027.tar.gz   # backup first
pnpm migrate                         # dry run: lists every change
pnpm migrate --out=mutations.json    # optional: save mutations for review
pnpm migrate --apply                 # needs SANITY_WRITE_TOKEN (Editor) in .env
```

What it does: creates festivals 2022–2026 from artist dates, creates stages from the old stage names, links artists, events and galleries to festivals, turns the old `home` document into `siteSettings` (seeding the menu, credits, sponsor logos and social links that used to be hardcoded), converts news "slug paths" into proper links, and converts page content into sections. It's idempotent and never overwrites existing values. `--delete-legacy` also removes the old `home` document.

The safest approach is to copy the dataset (`pnpm sanity dataset copy production staging`), run the migration against `staging` with `NEXT_PUBLIC_SANITY_DATASET=staging`, and check the site before doing production.
