# Egipskie Wakacje

Static marketing website for **Egipskie Wakacje** - day trips to Cairo for Polish tourists staying in Hurghada, Marsa Alam and Sharm el Sheikh.

- Production: <https://egipskiewakacje.pl>
- Repository: <https://github.com/ahmedBahgatt/egipskiewakacje.pl>
- Site language: Polish. Documentation language: English.
- Primary conversion: a WhatsApp reservation request (no online payment, no checkout).

The site is fully static. There is no server, no database at runtime, no API routes and no cookies by default.

---

## Table of contents

- [Stack](#stack)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Local development](#local-development)
- [Build](#build)
- [Tests](#tests)
- [Lint and typecheck](#lint-and-typecheck)
- [Media regeneration](#media-regeneration)
- [Content modes](#content-modes)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Routes](#routes)
- [How to add or change a tour](#how-to-add-or-change-a-tour)
- [Conventions and hard rules](#conventions-and-hard-rules)
- [Deployment](#deployment)
- [Related documents](#related-documents)

---

## Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | `output: "export"` - static HTML, no server runtime |
| UI | React 19 | Server Components by default, client components only where interaction requires it |
| Language | TypeScript (strict) | `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitAny` |
| Styling | CSS Modules + CSS custom properties | No CSS framework, no runtime CSS-in-JS |
| Fonts | `next/font` - Fraunces (display) + Manrope (text) | Self-hosted at build time, `latin-ext` subset for Polish diacritics |
| Motion | `motion` (`motion/react`) | `LazyMotion` for a small bundle, `MotionConfig reducedMotion="user"` |
| Images | Pre-generated AVIF / WebP / JPG served through `<picture>` | `images.unoptimized: true` - GitHub Pages cannot run the Next optimizer |
| Unit tests | Vitest | `tests/unit/**/*.test.ts`, node environment |
| E2E tests | Playwright | Runs against the real static export, not the dev server |
| Media pipeline | `sharp` (images) + `ffmpeg` (hero video) | Build-time only, output committed under `public/` |
| CI/CD | GitHub Actions -> GitHub Pages | Custom domain `egipskiewakacje.pl`, HTTPS enforced |

Runtime dependencies are deliberately minimal: `next`, `react`, `react-dom`, `motion`. Everything else is a dev dependency.

---

## Prerequisites

- **Node.js 20.11.0 or newer** (`engines.node: ">=20.11.0"`, `.nvmrc` pins `20`).
- npm (the repository ships `package-lock.json`).
- `ffmpeg` on `PATH` - only if you need to regenerate the hero video (`npm run media:video`). Not required for a normal build.

```bash
nvm use          # picks up .nvmrc
node -v          # must be >= 20.11.0
```

---

## Install

```bash
npm ci
```

Use `npm ci` rather than `npm install` so the lockfile stays authoritative. Do not modify `package-lock.json` by hand.

---

## Local development

```bash
npm run dev
```

Serves the site at <http://localhost:3000>. Note that `trailingSlash: true` is enabled, so `/cennik` redirects to `/cennik/`; always link with the trailing slash.

No environment file is required for local development. The site builds and runs completely in local content mode with **no secrets**.

---

## Build

```bash
npm run build
```

Produces a static export in `out/`. `next.config.ts` intentionally does **not** ignore type or lint errors, so a build fails on a TypeScript or ESLint violation rather than shipping broken output.

To preview the exact artifact that ships to GitHub Pages:

```bash
npm run build
node tests/serve-out.mjs 4321      # zero-dependency static server used by Playwright
# open http://localhost:4321
```

---

## Tests

### Unit (Vitest)

```bash
npm test          # single run
npm run test:watch
```

Covers the pure logic that must never regress:

- `tests/unit/whatsapp.test.ts` - booking message construction and `wa.me` link encoding.
- `tests/unit/validation.test.ts` - booking form validation rules.
- `tests/unit/analytics.test.ts` - proof that the analytics sanitiser drops every non-allow-listed key (PII cannot leak).

### End-to-end (Playwright)

```bash
npm run build          # required first - e2e runs against out/
npx playwright install # once, to fetch browsers
npm run test:e2e
```

Playwright builds nothing itself. It starts `node tests/serve-out.mjs 4321` and drives the real static export in two projects: `desktop-chromium` and `mobile-safari` (iPhone 13 viewport).

---

## Lint and typecheck

```bash
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
npm run verify     # typecheck + lint + unit tests, in that order
```

`npm run verify` is the gate to run before pushing.

---

## Media regeneration

All imagery is generated from code. There are no photographs, no stock assets and no hotlinked files - see [ASSET_SOURCES.md](./ASSET_SOURCES.md).

```bash
npm run media        # scripts/generate-media.mjs  - SVG scenes -> AVIF/WebP/JPG via sharp
npm run media:video  # scripts/generate-hero-video.mjs - Ken Burns hero video via ffmpeg
```

- `npm run media` is safe to re-run; it is deterministic and overwrites the generated files under `public/media/`.
- `npm run media:video` requires `ffmpeg` on `PATH` and is slower. Run it only when the hero artwork changes.
- The generated output under `public/media/` **is committed**, because GitHub Pages serves it directly and CI does not run the media pipeline.

---

## Content modes

Content is read exclusively through the typed adapter at `src/content/index.ts`. Pages never import a data file directly. The adapter has two modes, selected by `NEXT_PUBLIC_CONTENT_SOURCE`:

| Mode | Value | Behaviour |
| --- | --- | --- |
| Local (default, current) | `local` | Reads typed source files in `src/content/local/`. No network, no secrets. |
| Sanity (prepared, not active) | `sanity` | Reads the public read-only Sanity CDN with GROQ. Falls back to local content for any collection the dataset does not yet return, so a partially seeded dataset still produces a complete site. |

Both modes resolve to the exact same TypeScript shapes defined in `src/content/types.ts`, so the frontend never knows which source is active. Every accessor is `async` in both modes.

The site currently **ships in local mode**. The Sanity project (`ej04dib0`, dataset `production`) is prepared via the `studio/` package and a seed script, but has not been seeded (no write token available). Do not switch `NEXT_PUBLIC_CONTENT_SOURCE=sanity` until the dataset is seeded and verified.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in only what you need. **The public site builds with no variables set at all.**

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_CONTENT_SOURCE` | no | `local` (default) or `sanity`. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | no | Public. Defaults to `ej04dib0`. |
| `NEXT_PUBLIC_SANITY_DATASET` | no | Public. Defaults to `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | no | Public. Defaults to `2024-01-01`. |
| `SANITY_WRITE_TOKEN` | scripts only | Needed **only** to deploy the schema and run the seed script. Must never be prefixed with `NEXT_PUBLIC_` and never reaches the browser. |
| `NEXT_PUBLIC_GA4_ID` | no | Empty by default. Leaving it empty keeps analytics a true no-op. See [ANALYTICS.md](./ANALYTICS.md). |
| `NEXT_PUBLIC_GTM_ID` | no | Same as above. |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical origin. Safe default `https://egipskiewakacje.pl`. |

No secrets are committed. `.env`, `.env*.local` and `studio/.env*` are git-ignored.

---

## Project structure

```
.
├── src/
│   ├── app/                    # App Router: layout, global CSS, fonts, all routes
│   │   ├── layout.tsx          # <html lang="pl">, metadata, Organization + WebSite JSON-LD,
│   │   │                       # skip link, Header/Footer/WhatsAppFloat, MotionProvider
│   │   ├── fonts.ts            # Fraunces + Manrope via next/font
│   │   └── globals.css         # design tokens as CSS custom properties
│   ├── components/
│   │   ├── booking/            # WhatsAppFloat (floating contact button)
│   │   ├── brand/              # Logo
│   │   ├── home/               # Hero (poster image + optional Ken Burns video)
│   │   ├── layout/             # Header, MobileMenu, Footer, nav.ts (single nav model)
│   │   ├── motion/             # MotionProvider (LazyMotion), Reveal, Tilt
│   │   ├── seo/                # JsonLd
│   │   ├── tour/               # TourCard
│   │   └── ui/                 # Button, Breadcrumbs, Faq, OptimizedImage, icons
│   ├── content/
│   │   ├── config.ts           # siteConfig - brand constants, WhatsApp number, helpers
│   │   ├── types.ts            # the content model both adapters resolve to
│   │   ├── index.ts            # content adapter (local | sanity) - the ONLY import for pages
│   │   ├── local/              # destinations.ts, tours.ts, posts.ts, legal.ts, site.ts
│   │   └── sanity/             # adapter.ts, queries.ts (GROQ)
│   └── lib/
│       ├── analytics.ts        # privacy-first event abstraction with a PII allow-list
│       ├── format.ts           # price / label formatting
│       ├── seo.ts              # buildMetadata + JSON-LD builders
│       ├── validation.ts       # booking form validation (pure, deterministic)
│       └── whatsapp.ts         # booking message + wa.me deep link construction
├── tests/
│   ├── unit/                   # Vitest
│   ├── e2e/                    # Playwright specs
│   └── serve-out.mjs           # static server for the exported site
├── scripts/
│   ├── generate-media.mjs      # SVG scenes -> AVIF/WebP/JPG (sharp)
│   └── generate-hero-video.mjs # Ken Burns hero video (ffmpeg)
├── public/                     # generated media, icons, CNAME, robots.txt
├── studio/                     # Sanity Studio package + seed (not yet seeded)
├── .github/workflows/          # GitHub Pages deployment
├── next.config.ts              # output: export, trailingSlash, unoptimized images
├── .env.example
└── docs: README.md, DEPLOYMENT.md, CONTENT_SOURCES.md, ASSET_SOURCES.md,
      SEO_PLAN.md, ANALYTICS.md, CONTENT_REQUIRED.md
```

---

## Routes

Every route has a trailing slash (`trailingSlash: true`).

| Route | Page |
| --- | --- |
| `/` | Home |
| `/wycieczki/` | All tours |
| `/wycieczki-z-hurghady/` | Hurghada overview |
| `/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/` | Hurghada -> Cairo tour |
| `/wycieczki-z-marsa-alam/` | Marsa Alam overview |
| `/wycieczki-z-marsa-alam/kair-stary-kair-piramidy/` | Marsa Alam -> Cairo tour |
| `/wycieczki-z-sharm-el-sheikh/` | Sharm el Sheikh overview |
| `/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy/` | Sharm el Sheikh -> Cairo tour |
| `/cennik/` | Pricing |
| `/poradnik/` | Guide index |
| `/poradnik/co-zabrac-na-wycieczke-do-kairu/` | Guide article |
| `/o-nas/` | About |
| `/faq/` | FAQ |
| `/kontakt/` | Contact |
| `/rezerwacja/` | Booking form |
| `/polityka-prywatnosci/` | Privacy policy |
| `/polityka-cookies/` | Cookie policy |
| `/regulamin/` | Terms |
| `404` | Static not-found page |
| `/sitemap.xml`, `/robots.txt` | Generated at build time |

---

## How to add or change a tour

Tours live in `src/content/local/tours.ts` as typed `Tour` objects (`src/content/types.ts`). Adding a tour is a content edit, not a code change - the destination page, the tours listing, the pricing page, the sitemap and the JSON-LD all read from the same array.

1. **Verify the operational facts first.** Price, availability days, pickup window, transport, guide language, transfer supplements and inclusions must come from the operator, not from memory. Record the verification date.
2. **Add the object** to the `tours` array:
   - `slug` - kebab-case, unique.
   - `route` - `"/wycieczki-z-<destination>/<slug>"`, no trailing slash here (the router adds it); the trailing slash belongs in `seo.canonicalPath`.
   - `destination` - one of `hurghada` | `marsa-alam` | `sharm-el-sheikh`.
   - `price` - set `lastVerifiedAt` to the date you verified, and `variable: true` when transfers or extras can change the final amount (this is what renders "Cena od").
   - `guide` - set `polishConfirmed: true` **only** when a Polish-speaking guide is unambiguously confirmed. If the source is ambiguous, use an honest label such as `"Potwierdzamy przed rezerwacją"` and `polishConfirmed: false`.
   - `seo.canonicalPath` - must end with `/`.
   - `heroImage` / `gallery` - `src` is the **extensionless** base path under `public/` (e.g. `/media/tours/hurghada-kair`); `OptimizedImage` appends `.avif`, `.webp` and `.jpg`. Alt text must be accurate Polish.
3. **Generate the media** for any new base path: add the scene to `scripts/generate-media.mjs`, then `npm run media`.
4. **Add the route page** under `src/app/wycieczki-z-<destination>/<slug>/page.tsx` if the destination does not already render tours dynamically.
5. **Verify**: `npm run verify && npm run build && npm run test:e2e`.

Changing a price is the same flow minus steps 3 and 4: update `price` **and** `lastVerifiedAt` **and** `updatedAt`, plus any price repeated in `faqs` or `seo.description` for that tour.

---

## Conventions and hard rules

- The WhatsApp number exists in exactly one place: `siteConfig.whatsappNumber` in `src/content/config.ts`. Never hardcode it in a component; build links with `whatsappLink()` or the helpers in `src/lib/whatsapp.ts`.
- Prices are USD. There is no PLN conversion in v1.
- No fake discounts, no "was/now" pricing, no countdown timers, no invented ratings, no invented review counts, no fabricated awards.
- No `aggregateRating`, `review`, `priceValidUntil`, postal address or registration number in structured data until the owner supplies verified data - see [CONTENT_REQUIRED.md](./CONTENT_REQUIRED.md).
- No cookies and no cookie banner while analytics is unconfigured. Adding any non-essential tracking requires consent first - see [ANALYTICS.md](./ANALYTICS.md).
- Analytics calls may only carry allow-listed, non-PII keys. The sanitiser in `src/lib/analytics.ts` enforces this even against a careless caller.
- Blog and legal bodies are structured `PostBlock` values, not raw HTML. There is no `dangerouslySetInnerHTML` for content.
- Content is read only through `src/content/index.ts`.

---

## Deployment

Push to `main` triggers the GitHub Actions -> GitHub Pages pipeline. Full details, manual triggers, Sanity-triggered rebuilds, rollback and the custom-domain rules are in **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

Do **not** change the GoDaddy DNS records.

---

## Related documents

| Document | Contents |
| --- | --- |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | GitHub Pages pipeline, domain, rollback, moving hosts |
| [CONTENT_SOURCES.md](./CONTENT_SOURCES.md) | Which operational facts came from where, and when they were verified |
| [ASSET_SOURCES.md](./ASSET_SOURCES.md) | Provenance of every image and the hero video |
| [SEO_PLAN.md](./SEO_PLAN.md) | Query mapping, cannibalization rules, internal linking, structured data |
| [ANALYTICS.md](./ANALYTICS.md) | Event model, PII allow-list, how to enable GA4/GTM later |
| [CONTENT_REQUIRED.md](./CONTENT_REQUIRED.md) | Open items the owner must confirm before and after launch |
