# Asset provenance

Every visual asset shipped on egipskiewakacje.pl is **original work produced for this project**. There are no photographs, no stock imagery, no third-party footage, no hotlinked files and no images of people.

---

## The rule

| Category | Status |
| --- | --- |
| Photographs | **None used.** |
| Stock images or stock video (free or paid) | **None used.** |
| Third-party or scraped imagery | **None used.** |
| Hotlinked remote images | **None.** Every asset is served from this site's own origin. |
| Images of people | **None.** No stock person is ever presented as a guide, a customer or a team member. |
| Illustrations, icons, OG images | Original, generated from code in this repository. |
| Hero video | Original, rendered with ffmpeg from artwork in this repository. |

This is a deliberate, license-clean choice for launch. It removes every attribution, licensing and model-release question at once. It is a placeholder in one sense only: it stays until the owner supplies real, owned photographs and video of the actual tours - see [CONTENT_REQUIRED.md](./CONTENT_REQUIRED.md).

---

## How the assets are produced

All artwork is authored as layered SVG scenes in code and rasterized at build time. Nothing is hand-exported from a design tool, so every asset is reproducible from the repository alone.

| Script | npm script | Produces |
| --- | --- | --- |
| `scripts/generate-media.mjs` | `npm run media` | All still imagery: destination scenes, tour scenes, Cairo landmark scenes, blog artwork, the hero poster and all Open Graph images. Composes layered SVG, then rasterizes and encodes with `sharp` to AVIF, WebP and JPG. |
| `scripts/generate-hero-video.mjs` | `npm run media:video` | The hero background video: a Ken Burns (slow pan and zoom) render over the original hero artwork, encoded with `ffmpeg` to WebM and MP4, plus the matching poster frame. |

Both scripts are deterministic and safe to re-run; they overwrite their outputs under `public/media/`. The generated output **is committed** to the repository, because CI does not run the media pipeline and GitHub Pages serves the files directly.

`ffmpeg` must be on `PATH` for `npm run media:video`. It is not needed for a normal build.

---

## Delivery

Still images are served through `src/components/ui/OptimizedImage.tsx`, which emits a `<picture>` element:

```
<source srcSet="{base}.avif" type="image/avif">
<source srcSet="{base}.webp" type="image/webp">
<img src="{base}.jpg" width=… height=… loading=… fetchPriority=…>
```

Consequences for content authors:

- A `MediaImage.src` in `src/content/local/*` is an **extensionless base path**, for example `/media/tours/hurghada-kair`. The component appends the extension. Never write `.jpg` into `MediaImage.src`.
- `width` and `height` are always set and an explicit `aspect-ratio` is applied, so images reserve their space and contribute no layout shift.
- Only the LCP image passes `priority`, which switches it to eager loading with `fetchPriority="high"`.
- `next.config.ts` sets `images.unoptimized: true`. GitHub Pages cannot run the Next image optimizer, so optimization happens at generation time instead.

Open Graph images are referenced with an explicit `.jpg`, because social crawlers do not perform content negotiation and several do not accept AVIF or WebP.

---

## Asset inventory

All paths are relative to `public/`. `{base}` means the file exists as `.avif`, `.webp` and `.jpg`.

### Hero

| File | Format | Purpose |
| --- | --- | --- |
| `media/hero/hero-poster.{avif,webp,jpg}` | AVIF / WebP / JPG | Hero poster and LCP image. Also the `poster` attribute of the video element. |
| `media/hero/hero.webm` | WebM | Hero Ken Burns video, preferred source. |
| `media/hero/hero.mp4` | MP4 (H.264) | Hero video fallback for browsers without WebM. |

The video is progressive enhancement only: the poster image renders first, and the video is skipped entirely when the visitor prefers reduced motion or signals `Save-Data`. The video is muted, has no audio track and carries no captions requirement.

### Destinations

| File | Used by |
| --- | --- |
| `media/destinations/hurghada.{avif,webp,jpg}` | `/wycieczki-z-hurghady/` |
| `media/destinations/marsa-alam.{avif,webp,jpg}` | `/wycieczki-z-marsa-alam/` |
| `media/destinations/sharm-el-sheikh.{avif,webp,jpg}` | `/wycieczki-z-sharm-el-sheikh/` |

### Tours

| File | Used by |
| --- | --- |
| `media/tours/hurghada-kair.{avif,webp,jpg}` | Hurghada -> Cairo tour hero and card |
| `media/tours/marsa-alam-kair.{avif,webp,jpg}` | Marsa Alam -> Cairo tour hero and card |
| `media/tours/sharm-kair.{avif,webp,jpg}` | Sharm el Sheikh -> Cairo tour hero and card |

### Cairo landmark scenes (shared galleries)

| File | Subject |
| --- | --- |
| `media/cairo/giza.{avif,webp,jpg}` | Giza plateau, three pyramids |
| `media/cairo/sphinx.{avif,webp,jpg}` | Great Sphinx with a pyramid behind |
| `media/cairo/museum.{avif,webp,jpg}` | Museum interior scene |
| `media/cairo/nile.{avif,webp,jpg}` | The Nile in Cairo at sunset |

### Blog

| File | Used by |
| --- | --- |
| `media/blog/co-zabrac-na-wycieczke-do-kairu.{avif,webp,jpg}` | `/poradnik/co-zabrac-na-wycieczke-do-kairu/` |

### Open Graph (1200 x 630)

| File | Used by |
| --- | --- |
| `media/og/default.jpg` | Fallback for every page without a specific OG image |
| `media/og/hurghada.jpg` | Hurghada destination and tour |
| `media/og/marsa-alam.jpg` | Marsa Alam destination and tour |
| `media/og/sharm-el-sheikh.jpg` | Sharm el Sheikh destination and tour |
| `media/og/poradnik.jpg` | Guide section and article |

### Icons and site chrome

| File | Purpose |
| --- | --- |
| `favicon.ico` | Classic favicon |
| `icon.svg` | Scalable icon (`image/svg+xml`) |
| `apple-touch-icon.png` | iOS home-screen icon |
| `manifest.webmanifest` | Web app manifest |

All UI icons (arrows, checks, WhatsApp glyph, list markers) are inline SVG defined in `src/components/ui/icons.tsx`. There is no icon font and no third-party icon package, so no icon library license applies.

---

## Optimization targets

| Asset class | Target dimensions | Encoding | Budget |
| --- | --- | --- | --- |
| Hero poster | 1600 x 1000 | AVIF primary, WebP fallback, JPG last | AVIF <= 120 KB |
| Tour and destination hero | 1600 x 1000 | AVIF / WebP / JPG | AVIF <= 100 KB each |
| Gallery and card images | 1200 x 800 | AVIF / WebP / JPG | AVIF <= 70 KB each |
| Blog featured image | 1200 x 800 | AVIF / WebP / JPG | AVIF <= 70 KB |
| Open Graph | 1200 x 630 | JPG only (crawler compatibility) | <= 300 KB each |
| Hero video | 1280 x 720, no audio | WebM (VP9) + MP4 (H.264) | WebM <= 2.5 MB, MP4 <= 3.5 MB |

Rationale for the budgets: the hero poster is the LCP element on the home page, and the video is only fetched after the poster has painted and only when motion is welcome. Everything below the fold is lazy-loaded.

---

## Media budget

Fill this in from the actual build output:

```bash
du -sh public/media
du -sh public/media/*
find public/media -type f -name '*.avif' -exec du -ch {} + | tail -n 1
find public/media -type f \( -name '*.mp4' -o -name '*.webm' \) -exec du -ch {} + | tail -n 1
```

| Group | Files | Size on disk | Notes |
| --- | --- | --- | --- |
| `public/media/hero` | | TODO | Poster + WebM + MP4 |
| `public/media/destinations` | | TODO | 3 scenes x 3 formats |
| `public/media/tours` | | TODO | 3 scenes x 3 formats |
| `public/media/cairo` | | TODO | 4 scenes x 3 formats |
| `public/media/blog` | | TODO | 1 scene x 3 formats |
| `public/media/og` | | TODO | 5 JPG files |
| **Total `public/media`** | | **TODO** | Run `du -sh public/media` |

TODO: paste the measured budget produced by the media generation pass. Until then, treat the table above as targets, not as measurements.

---

## Replacing the generated artwork with real photography

When the owner supplies real, owned photographs or video:

1. Confirm ownership and, for any recognisable person, a signed model release. Do not publish tourists' photographs without written permission.
2. Add the sources to `scripts/generate-media.mjs` as inputs (or add a sibling script for photo processing) so that resizing and encoding stay reproducible and the same AVIF/WebP/JPG triples are produced at the same base paths.
3. Keep the existing base paths. If the filenames stay the same, no content file needs to change.
4. Update every `alt` string in `src/content/local/*` to describe the new photograph accurately. Alt text that describes an illustration is wrong once a photograph replaces it.
5. Re-measure the media budget and update the table above.
6. Update this document to record the new provenance, replacing the "no photographs" statement with the actual source and license.

Until then, the "no photographs, no stock, no people" rule stands, and no page may imply otherwise - for example, no "our team" section may show a generated or stock person.

---

## Real tour photos (2026-08-09)

For the 81-tour build, one hero image per tour was reused from the owner's own
source site (sekretyegiptu.pl - same owner, rights clear) and re-encoded locally
to AVIF/WebP/JPG at 1600x1000 (`public/media/tours/<dep>-<slug>.*`). Files were
downloaded, not hotlinked. Accurate Polish alt text is set per tour.

OPEN - rights to confirm/replace (source images that look like third-party stock,
not owner photos):
- `hurghada-... luksor-dolina-krolow` - source file `pngtree-egypt-luxor-temple-*`
- `sharm-... jordania-petra-morze-martwe` - source file `shutterstock_*`
These were on the owner's site but a stock licence may not extend to this domain;
replace with owner-licensed media before relying on them long-term.

Gallery is currently the single hero per tour; richer per-tour galleries and
real category/atmosphere media remain an owner-media task.

---

## Inventory correction media (2026-08-09)

- Removed 15 PADI-course media files (`h-kurs-padi-*`, `ma-kurs-padi-*`) - the 5 PADI tours were
  removed by the owner and the media were referenced nowhere else.
- New tour `kair-samolotem-muzeum-egipskie-piramidy` reuses existing Muzeum-Egipskie/pyramids
  placeholder artwork (`/media/tours/h-kair-piramidy-muzeum-egipskie`).
- New tour `klasztor-sw-katarzyny-synaj` reuses neutral Sinai destination artwork
  (`/media/destinations/sharm-el-sheikh`) as a placeholder. A summit/sunrise image was
  deliberately AVOIDED so the hero never implies a Mount Moses ascent. Real St Catherine's
  Monastery / Sinai imagery remains an owner-media task.
