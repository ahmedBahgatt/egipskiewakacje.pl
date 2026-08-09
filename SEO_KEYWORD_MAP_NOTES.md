# SEO_KEYWORD_MAP_NOTES.md

Cleanup notes for `SEO_KEYWORD_MAP.csv` (SEMrush Keyword Gap export, pl volumes).
Generated 2026-08-09 as part of the full-catalogue redesign (task B17).

## What changed

- Added a `classification` column to every row: `TARGET | SUPPORTING | BLOG | OUT_OF_SCOPE | NOISE`.
- Weather / local-time / map / hotel / flight queries are no longer assigned as
  the target of a commercial destination or category page. Their `assigned_page`
  was cleared (they remain in the file as market context with their metrics intact).
- Bare brand / navigational terms (e.g. `hurghada`, vol 40 500) were downgraded
  from principal target to `SUPPORTING` context. They still reference the relevant
  destination page as secondary signal, but they are NOT the page's principal query.
- No rows were deleted - all SEMrush research is preserved and honestly reclassified.

## Bucket counts (456 rows)

| classification | count | meaning |
|----------------|-------|---------|
| TARGET | 133 | primary commercial intent for a specific page |
| SUPPORTING | 204 | secondary / long-tail that reinforces a TARGET page (incl. brand context) |
| BLOG | 42 | informational intent -> Poradnik / blog, not a commercial page |
| OUT_OF_SCOPE | 25 | not a service we sell (hotels, flights, accommodation) |
| NOISE | 52 | weather, local time, maps, currency - excluded from targeting |

## Noise removed from commercial pages (48 rows)

All `*temperatura*`, `*godzina*` (local time), `*mapa*` and similar rows that were
previously pointed at `/wycieczki-z-hurghady/`, `/wycieczki-z-marsa-alam/` or a
category page are now `NOISE` with an empty `assigned_page`. Examples:
`hurghada temperatura` (2900), `temperatura hurghada` (1300),
`hurghada temperatura wody` (1300), `hurghada mapa` (1000),
`hurghada godzina` (1000), `marsa alam godzina` (880),
`hurghada temperatura luty/grudzień/marzec/maj/listopad/styczeń`,
`ile stopni jest w hurghadzie`, `jaka temperatura w hurghadzie`,
`piramidy w egipcie mapa`. Verified: no `temperatura` query maps to any
`/wycieczki*` page after the pass.

Hotel / flight queries (`hurghada hotels`, `hotels in hurghada`, ...) are
`OUT_OF_SCOPE` - we sell excursions, not accommodation or flights.

## Principal commercial target per page (highest-volume TARGET row)

| Page | Principal target | pl vol |
|------|------------------|--------|
| `/` | wycieczki egipt / egipt wycieczki | 2900 |
| `/wycieczki-z-hurghady/` | hurghada wycieczki (+ wycieczki z hurghady, wycieczki fakultatywne hurghada) | 1900 |
| `/wycieczki-z-marsa-alam/` | marsa alam wycieczki fakultatywne | 1600 |
| `/wycieczki-z-sharm-el-sheikh/` | sharm el sheikh wycieczki fakultatywne | 720 |
| `/wycieczki/kair-i-piramidy/` | wycieczka do Kairu / piramidy w egipcie cluster | 480 |
| `/wycieczki/luksor/` | wycieczki do Luksoru (z Hurghady / Marsa Alam) | 170 |
| `/wycieczki/rejsy-i-wyspy/` | rejs katamaranem / orange bay cluster | 480 |
| `/wycieczki/snorkeling-i-delfiny/` | hurghada snorkeling / snorkeling z delfinami | 90 |
| `/wycieczki/nurkowanie/` | nurkowanie / snurkowanie w egipcie | 590 |
| `/wycieczki/safari-i-quady/` | jeep safari / safari quady egipt | 480 |

`/wycieczki/atrakcje-i-rozrywka/` and `/wycieczki/wycieczki-prywatne/` rely on
`SUPPORTING` clusters (`hurghada atrakcje`, `marsa alam atrakcje`, private-tour
long-tail) rather than a single high-volume head term - that is expected for those
intents and is not a gap to force.

## Caveats

- Volumes are from the SEMrush export and should be re-validated live in Phase 2.
- A few competitor-brand rows (`coral travel ...`) are retained as market context;
  they are not our own brand and are low priority.
- Classification was applied by rule (see `.local-research/reclassify.mjs`, gitignored);
  the buckets are honest and conservative, not a substitute for a manual Phase-2 pass.

The stale note in `SEO_CONTENT_ARCHITECTURE.md` that said "No SEMrush CSV was
provided" was corrected to reference this file and the exclusion of weather/brand noise.
