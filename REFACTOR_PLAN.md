# GRL PWR FSTVL — Refactor Plan (Phase 0)

> **Status:** All four phases complete. Zero content or visual changes intended.

---

## 1. Project Structure Overview

### Tech stack

| Concern | Library | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| UI library | React | 19.2.4 |
| CMS | Sanity (headless + Studio) | 5.13.0 |
| Styling | Tailwind CSS v4 | 4.2.1 |
| Language | TypeScript (strict) | 5.9.3 |
| Rich text | `@portabletext/react` | 6.0.3 |
| Contact form | Formspree (`@formspree/react`) | 3.0.0 |
| Image URLs | `@sanity/image-url` | 2.0.3 |

### Routing / directory map (current)

```
src/app/
  (site)/
    layout.tsx               ← root layout: header (Menu) + footer
    page.tsx                 ← home
    artists/
      page.tsx
      [artist]/page.tsx
    events/
      page.tsx
      [slug]/page.tsx
    workshop/
      [slug]/page.tsx
    program/page.tsx
    gallery/page.tsx
    contact/page.tsx
    [slug]/page.tsx          ← catch-all for custom CMS pages
    components/              ← ALL components live here, flat
      menu.tsx
      artistCard.tsx
      artistPortrait.tsx
      artistPortraitSmall.tsx
      blobpaths.tsx
      imageBlob.tsx
      carousel.tsx
      contactForm.tsx
      newsCard.tsx
    utils/
      formatTime.ts
      sanityImage.ts
      send-email.ts          ← dead file (fully commented-out)
    globals.css
  (studio)/
    layout.tsx
    admin/[[...index]]/page.tsx

sanity/
  config/
    client-config.ts
  schemas/
    index.ts
    artist.ts
    eventer.ts
    workshop.ts
    page.ts
    news.ts
    home.ts
    gallery.ts
    blockContent.ts
  sanity-utils.ts            ← all GROQ query functions (257 lines)
  sanity.config.ts           ← Sanity Studio config

types/                       ← one file per content type
  Artist.ts
  Eventer.ts
  Workshop.ts
  Gallery.ts
  Home.ts
  News.ts
  Page.ts

restdata.ts                  ← dead file in repo root (commented-out markup)
```

### Data-flow summary

All data fetching is server-side. Every `page.tsx` imports from `sanity/sanity-utils.ts`, which creates a Sanity client and executes GROQ queries. Results are typed via `types/`. ISR revalidation is `36000` seconds (10 h) on every route. No client-side fetching except Formspree form submission.

---

## 2. Pain-Point Inventory

### 2-A. `any` types (7 occurrences)

| File | Location | What it is |
|---|---|---|
| `src/app/(site)/utils/sanityImage.ts` | `source: any` | Sanity image source object |
| `artists/[artist]/page.tsx:13` | `params: any` | Next.js dynamic route params |
| `events/[slug]/page.tsx:12` | `params: any` | Next.js dynamic route params |
| `workshop/[slug]/page.tsx:14` | `params: any` | Next.js dynamic route params |
| `[slug]/page.tsx:9` | `params: any` | Next.js dynamic route params |
| `gallery/page.tsx:13` | `urlFor(source: any)` | Local inline image builder |
| `events/[slug]/page.tsx:21` | `urlFor(source: any)` | Local inline image builder |

All four dynamic-route `params` should be typed as `Promise<{ slug: string }>` (Next.js 15+ App Router convention). The image-source `any` should be `SanityImageSource` from `@sanity/image-url`.

### 2-B. Duplicated / inconsistent logic

| Issue | Where |
|---|---|
| `createImageUrlBuilder` instantiated locally instead of using `sanityImage.ts` | `events/[slug]/page.tsx`, `gallery/page.tsx` |
| Blob path selection logic repeated across components | `artistCard.tsx`, `imageBlob.tsx`, `blobpaths.tsx` |
| `getOsloDateParts()` utility defined inside `program/page.tsx` — not reusable | `program/page.tsx` |
| `buildArtistProgramItem()` and `buildEventProgramItem()` are large inline helpers | `program/page.tsx` |

### 2-C. Unnecessary `"use client"` directive

`artistPortrait.tsx` is marked `"use client"` but uses no hooks, no browser APIs, and no event handlers — it is a pure render of a Sanity image inside an SVG clip-path. It can be a Server Component.

### 2-D. Unused / dead code

| File | Status |
|---|---|
| `src/app/(site)/utils/send-email.ts` | Fully commented-out; delete |
| `restdata.ts` (repo root) | Commented-out JSX markup and old clip-paths; delete |
| `react-hook-form` in `package.json` | Installed but never imported anywhere in the codebase |

### 2-E. Anti-patterns

**Dynamic Tailwind class interpolation** (`artists/[artist]/page.tsx`)

```tsx
// RISKY — Tailwind v4 purges classes not found as literal strings
className={`text-${nameSize}`}   // nameSize = "lg" | "xl"
```

If these class strings do not appear literally elsewhere, the CSS will be purged in production and the text sizing silently breaks. This is the highest-priority fix in Phase 1 — it is a latent production bug, not a style preference.

**Mutable counter as JSX key** (`[slug]/page.tsx`)

```tsx
let counter = 0;
{page.content.map((block) => (
  <PortableText key={counter++} ... />
))}
```

Every Portable Text block already has a `_key` field. Use that.

**Hard-coded festival dates** (`program/page.tsx`)

```tsx
const MAY_8 = new Date("2026-05-08T00:00:00+02:00");
const MAY_9 = new Date("2026-05-09T00:00:00+02:00");
```

Fine for now; out of scope to CMS-drive in this pass. Flagged as a CMS candidate.

### 2-F. Type–schema mismatches

| Type file | Issue |
|---|---|
| `types/Home.ts` | Missing `video` field that exists in the `home` Sanity schema |
| All image fields typed as `string` | Correct — the GROQ projection resolves `image.asset->url` to a string. The raw Sanity image reference object is never typed, which is what forces `source: any` in `sanityImage.ts`. Fix by importing `SanityImageSource` from `@sanity/image-url`. |

### 2-G. Naming inconsistencies

| Current | Issue |
|---|---|
| `getAllEventer()` | Mix of English and Norwegian (*eventer* = events in Norwegian) |
| `blobpaths.tsx` | All-lowercase filename; every other component file is PascalCase |
| `send-email.ts` | Kebab-case in a folder of camelCase files (moot once deleted) |

### 2-H. Configuration inconsistencies

**Mismatched Sanity API versions:**

| File | API version |
|---|---|
| `sanity.config.ts` (Studio) | `2021-08-31` |
| `sanity/config/client-config.ts` (queries) | `2024-02-20` |

Low-risk but worth aligning in Phase 4.

**Duplicate Tailwind color token definitions:**

- `tailwind.config.js` → `theme.extend.colors` (Tailwind v3 style)
- `globals.css` → `@theme { --color-grlPink: ... }` (Tailwind v4 canonical)

Both coexist harmlessly today. In v4, `@theme` is the right place. The `tailwind.config.js` entries can be removed in Phase 3 after confirming they are redundant.

---

## 3. Tailwind Usage Audit

### Repeated class combinations

| Pattern | Found in |
|---|---|
| `absolute inset-0 w-full h-full` (full-cover overlay) | Multiple pages, `imageBlob.tsx`, carousel |
| `flex flex-col items-center` (centered stack) | layout, several pages |
| `text-grlPink` + hover variant | `menu.tsx`, several heading elements |
| SVG clip-path + `overflow-hidden` wrapper | 5+ components |

None of these rise to the level requiring extraction today. The blob/clip-path wrapper is the most-repeated pattern (5+ uses); see Phase 2 for the `BlobImage` extraction.

### Inline styles

No `style={{ ... }}` usage is purely cosmetic. All inline styles pass computed SVG `clipPath` path strings — you cannot do this with Tailwind classes. They are correct as-is.

### CSS conflicts / globals

`globals.css` defines only:
1. Custom color tokens via `@theme`
2. Float animation keyframes (`float1`–`float4`) and utility classes (`.moving-object`, `.moving-object2`, `.moving-object3`, `.moving-object4`, `.still-object`)

These custom animation classes are assigned in `artistCard.tsx` based on `index % 3`. There is no conflict with Tailwind.

### `@tailwindcss/typography` plugin

Installed and configured, but no `prose` class appears anywhere in the codebase. Likely a leftover dependency. Confirm with a grep and remove in Phase 4.

---

## 4. Sanity Layer Audit

### GROQ queries

All 11 query functions live in `sanity/sanity-utils.ts` (257 lines). They are centralized in one file but embed query strings inline alongside the fetch call:

```ts
export async function getArtist(slug: string): Promise<Artist> {
  const query = groq`*[_type == "artist" && slug.current == $slug][0]{ ... }`;
  return client.fetch(query, { slug });
}
```

The target pattern separates the query string (a named constant) from the fetch function, making queries independently readable:

```ts
// lib/sanity/queries.ts
export const ARTIST_BY_SLUG_QUERY = groq`*[_type == "artist" && slug.current == $slug][0]{ ... }`;

// lib/sanity/fetch.ts (or keep in queries.ts)
export async function getArtist(slug: string): Promise<Artist> {
  return client.fetch(ARTIST_BY_SLUG_QUERY, { slug });
}
```

There are no shared GROQ fragments. Every entity repeats `"image": image.asset->url` inline. In this pass, leave fragments out — only extract the strings; DRY fragments are a premature abstraction for 11 queries.

### Image handling

Two patterns currently in use:

1. **`transformedSanityUrl(url, width, quality?)`** in `sanityImage.ts` — correct utility, used in most components.
2. **Local `createImageUrlBuilder`** instantiated inline in `events/[slug]/page.tsx` and `gallery/page.tsx` — duplicates the utility, should be replaced.

`next/image` is used correctly in `carousel.tsx` and `artistPortraitSmall.tsx`. Components that use `<image>` inside SVG (for blob clip-paths) are correct — `next/image` cannot be used inside SVGs.

### Preview / draft mode

Not present. Out of scope.

---

## 5. Proposed Target Folder Structure

Key decisions:
- Components stay under `src/app/(site)/` — they are route-specific, not app-wide.
- Feature components move co-located with their route, using `_components/` (the `_` prefix marks them as private/non-routable in Next.js App Router).
- Truly shared components (Menu, NewsCard, BlobImage) stay in a top-level `_components/` under `(site)/`.
- Sanity client, queries, and image utilities move into `src/lib/sanity/`.
- Date utilities move into `src/lib/utils/`.
- Blob path data moves into `src/lib/utils/blob.ts`.

```
src/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                              (home)
│   │   ├── _components/                          ← shared site-wide
│   │   │   ├── Menu.tsx                          ← was components/menu.tsx
│   │   │   ├── NewsCard.tsx                      ← was components/newsCard.tsx
│   │   │   └── BlobImage.tsx                     ← extracted blob+image SVG primitive
│   │   ├── artists/
│   │   │   ├── page.tsx
│   │   │   ├── [artist]/page.tsx
│   │   │   └── _components/
│   │   │       ├── ArtistCard.tsx                ← was components/artistCard.tsx
│   │   │       ├── ArtistPortrait.tsx            ← was components/artistPortrait.tsx
│   │   │       └── ArtistPortraitSmall.tsx       ← was components/artistPortraitSmall.tsx
│   │   ├── events/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── workshop/
│   │   │   └── [slug]/page.tsx
│   │   ├── program/
│   │   │   └── page.tsx
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   ├── page.tsx
│   │   │   └── _components/
│   │   │       └── ContactForm.tsx               ← was components/contactForm.tsx
│   │   ├── [slug]/page.tsx
│   │   └── globals.css
│   └── (studio)/
│       ├── layout.tsx
│       └── admin/[[...index]]/page.tsx
└── lib/
    ├── sanity/
    │   ├── client.ts                             ← merged from sanity/config/client-config.ts
    │   └── queries.ts                            ← GROQ strings + fetch fns from sanity-utils.ts
    └── utils/
        ├── date.ts                               ← formatTime.ts + getOsloDateParts() from program/page.tsx
        └── blob.ts                               ← blobpaths.tsx data + selection helper

types/
    Artist.ts
    Eventer.ts
    Workshop.ts
    Gallery.ts
    Home.ts                                       ← fix: add video field
    News.ts
    Page.ts

sanity/
    config/client-config.ts                       ← superseded by lib/sanity/client.ts; delete Phase 4
    sanity-utils.ts                               ← superseded by lib/sanity/queries.ts; delete Phase 4
    schemas/                                      ← untouched in this pass
    sanity.config.ts                              ← untouched in this pass
```

---

## 6. File-by-File Migration List

### Phase 1 — Types and data layer (no component moves)

| Action | From | To | Notes |
|---|---|---|---|
| Create | — | `src/lib/sanity/client.ts` | Consolidate the two client configs |
| Create | — | `src/lib/sanity/queries.ts` | Extract GROQ strings + fetch functions from `sanity-utils.ts` |
| Move + rename | `src/app/(site)/utils/sanityImage.ts` | `src/lib/sanity/image.ts` | |
| Move + extend | `src/app/(site)/utils/formatTime.ts` | `src/lib/utils/date.ts` | Also house `getOsloDateParts()` once extracted in Phase 2 |
| Fix | `types/Home.ts` | — | Add `video?: string` |
| Fix | `artists/[artist]/page.tsx` | — | `params: Promise<{ slug: string }>` + fix `text-${nameSize}` |
| Fix | `events/[slug]/page.tsx` | — | `params: Promise<{ slug: string }>` + replace local `urlFor` |
| Fix | `workshop/[slug]/page.tsx` | — | `params: Promise<{ slug: string }>` |
| Fix | `[slug]/page.tsx` | — | `params: Promise<{ slug: string }>` + use `block._key` |
| Fix | `gallery/page.tsx` | — | Replace local `urlFor` with `lib/sanity/image.ts` |
| Fix | `sanityImage.ts` → `lib/sanity/image.ts` | — | `source: any` → `SanityImageSource` |
| Update imports | All consumers of `sanity-utils.ts` | point to `lib/sanity/queries.ts` | |
| Delete | `src/app/(site)/utils/send-email.ts` | — | Dead code |
| Delete | `restdata.ts` (root) | — | Dead code |
| Remove dep | `react-hook-form` from `package.json` | — | Never imported |

### Phase 2 — Component and structure refactor

| Action | From | To |
|---|---|---|
| Move | `components/menu.tsx` | `_components/Menu.tsx` |
| Move | `components/newsCard.tsx` | `_components/NewsCard.tsx` |
| Move | `components/artistCard.tsx` | `artists/_components/ArtistCard.tsx` |
| Move | `components/artistPortrait.tsx` | `artists/_components/ArtistPortrait.tsx` |
| Move | `components/artistPortraitSmall.tsx` | `artists/_components/ArtistPortraitSmall.tsx` |
| Move | `components/contactForm.tsx` | `contact/_components/ContactForm.tsx` |
| Move + rename | `components/blobpaths.tsx` | `src/lib/utils/blob.ts` |
| Extract + create | inline blob SVG across pages/components | `_components/BlobImage.tsx` |
| Remove `"use client"` | `components/artistPortrait.tsx` | convert to Server Component |
| Extract helpers | `program/page.tsx`: `getOsloDateParts`, `buildArtistProgramItem`, `buildEventProgramItem` | `src/lib/utils/date.ts` + possibly `program/_components/` |
| Move | `components/carousel.tsx` | `gallery/_components/Carousel.tsx` (only used in gallery) |
| Move | `components/imageBlob.tsx` | absorbed into `_components/BlobImage.tsx` |

### Phase 3 — Styling cleanup

| Action | Detail |
|---|---|
| Remove duplicate color tokens | Remove `theme.extend.colors` from `tailwind.config.js`; keep `@theme` in `globals.css` |
| Create `CMS_CANDIDATES.md` | Collect all hardcoded values that should eventually be CMS-driven |

### Phase 4 — Final pass

| Action | Detail |
|---|---|
| Delete | `sanity/config/client-config.ts` (superseded) |
| Delete | `sanity/sanity-utils.ts` (superseded) |
| Remove dep | `@tailwindcss/typography` if grep confirms no `prose` usage |
| Align API versions | `sanity.config.ts` studio version → `2024-02-20` |
| Rename | `getAllEventer()` → `getEvents()` throughout |

---

## 7. Risk Register

| Risk | Severity | Mitigation |
|---|---|---|
| **`text-${nameSize}` Tailwind purging** (`artists/[artist]/page.tsx`) | **High** | Fix in Phase 1, not Phase 3. Replace with an explicit ternary before any build. |
| **Blob SVG clip-path pixel fidelity** | High | Blob path strings in `blobpaths.tsx` must move verbatim — no reformatting, no whitespace changes. Verify with side-by-side browser comparison after Phase 2. |
| **Animation CSS class names** (`.moving-object2/3/4`) | Medium | Defined in `globals.css`, applied by string in `artistCard.tsx`. Renaming the component file is safe. Renaming the CSS class names is not — don't touch them. |
| **`params` typing in Next 15/16** | Medium | In Next.js 15+, `params` is a `Promise`. Pages likely already `await params` or handle it correctly; typing them properly should not change runtime behaviour. Verify each affected page compiles and renders after Phase 1. |
| **Import path changes** | Medium | After each move, run `npx tsc --noEmit` + `next build`. TypeScript strict mode catches broken imports at compile time. |
| **`getOsloDateParts()` extraction** | Low | Pure function, no side effects. Extract, re-import, verify `program` page renders identically. |
| **`formatTime.ts` locale** | **Do not change** | The locale is `en-US` but post-processing produces Norwegian-looking output. Changing the locale string risks altering rendered date text — that is a content change, out of scope. Flagged in `CMS_CANDIDATES.md`. |
| **Removing `tailwind.config.js` color tokens** | Low | `@theme` takes precedence in v4. Run `next build` and spot-check brand colors after removal. |
| **`react-hook-form` removal** | Low | Confirmed never imported. Safe. |
| **`@tailwindcss/typography` removal** | Low | Grep for `prose` before removing. If found, leave it. |

### Verification checklist (run after each phase)

1. `npx tsc --noEmit` — zero type errors
2. `next build` — zero compile/lint errors
3. Visual spot-check: home, `/artists`, `/artists/[slug]`, `/events`, `/events/[slug]`, `/program`, `/gallery`, `/contact`, one custom `[slug]` page
4. For moves that affect rendered output risk: open old build and new build side-by-side in browser, toggle rapidly to catch pixel drift

---

## 8. CMS Candidates

Collected here for the follow-up CMS-customization pass. **Nothing in this list should be changed during the refactor.**

- Festival dates (May 8–9, 2026) hardcoded in `program/page.tsx`
- "Within 2 months" cutoff separating recent vs former artists in `artists/page.tsx`
- Brand colors (`#e82265` grlPink, `#039645` grlGreen, `#f8b9ce` lightPink)
- ISR `revalidate: 36000` — currently the same on every route, could be per-type
- Formspree form ID `xayrnklv` hardcoded in `contactForm.tsx`
- Stage names hardcoded as radio options in `sanity/schemas/artist.ts`
- `formatTime.ts` locale and date format (should eventually match Norwegian language preference)

---

## 9. Explicitly out of scope

- `sanity/schemas/` — no schema changes
- New Sanity fields of any kind
- Any change to rendered text, images, dates, or lineup content
- Pixel-level visual changes
- Preview / draft mode
- Authentication or access control
- Deployment configuration
- The `(studio)` route

---

*End of Phase 0. Awaiting approval to begin Phase 1.*
