# CMS Candidates

Values currently hardcoded in source that should become Sanity-driven
in the CMS-customization follow-up pass. **Do not change these during
the refactor** — they are flagged here only for reference.

---

## Festival dates & schedule logic

| File | Line(s) | Hardcoded value | Notes |
|---|---|---|---|
| `src/app/(site)/program/page.tsx` | `festivalYear` | `new Date().getFullYear()` | Derived from system clock — works for annual events, but fragile if the festival ever moves year |
| `src/app/(site)/program/page.tsx` | `FESTIVAL_DAYS` | `'Fredag'`, `'8. mai'`, day `8` and `'Lørdag'`, `'9. mai'`, day `9` | Should come from a `festivalConfig` Sanity document |
| `src/app/(site)/artists/page.tsx` | `twoMonthsAgo` | 2-month cutoff for "recent vs former artists" | Should be a configurable threshold, or driven by a festival end-date field |
| `src/app/(site)/page.tsx` | — | `"Fredrikstad 2026"` and `"8. - 9. mai"` hardcoded in JSX | Should come from the `home` Sanity document (title/dates fields) |

## Brand colors

| File | Value | Token name | Notes |
|---|---|---|---|
| `src/app/(site)/globals.css` | `#e82265` | `grlPink` | Primary brand color — should be a Sanity theme field |
| `src/app/(site)/globals.css` | `#039645` | `grlGreen` | Secondary brand color |
| `src/app/(site)/globals.css` | `#f8b9ce` | `lightPink` | Background/accent color |
| Multiple pages & components | `fill="#e82265"` | — | Pink used as literal hex in SVG `fill` attributes — will need updating alongside CSS token |

## Ticket link

| File | Hardcoded value | Notes |
|---|---|---|
| `src/app/(site)/page.tsx` | `https://checkout.ebillett.no/178/events/151120/purchase/setup` | Repeated in multiple pages — should be a field on the `home` Sanity document |
| `src/app/(site)/[slug]/page.tsx` | Same URL | — |

## Contact form

| File | Hardcoded value | Notes |
|---|---|---|
| `src/app/(site)/contact/_components/ContactForm.tsx` | Formspree ID `xayrnklv` | Should be an environment variable or a Sanity config field |

## Stage names

| File | Hardcoded value | Notes |
|---|---|---|
| `sanity/schemas/artist.ts` | `'Tæps Scene'`, `'St. Croix Scene'`, `'Klubbscenen'`, `'Kafescenen'` | Hardcoded as radio options — should be a separate `stage` document type or a `festivalConfig` list field |

## Date/time formatting locale

| File | Hardcoded value | Notes |
|---|---|---|
| `src/app/(site)/artists/[artist]/page.tsx` | `"no"` locale for `toLocaleDateString` / `toLocaleTimeString` | Correct for Norwegian, but should follow a site-wide locale setting |
| `src/lib/utils/date.ts` | `'en-GB'` locale in `getOsloDateParts` | Uses en-GB to get parseable output then formats manually — correct behavior, but locale handling is fragile |

## ISR revalidation

| File | Value | Notes |
|---|---|---|
| All `page.tsx` files | `revalidate = 36000` (10 h) | Same on every route — could be per-content-type, or driven by a `publishedAt` field for on-demand revalidation |
