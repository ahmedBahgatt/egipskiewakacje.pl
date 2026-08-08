# QA Report - Egipskie Wakacje v1

Date: 2026-08-08
Branch under test: `build/v1-cairo-tours`
Content mode: local (typed source files)
Build: Next.js 15 static export (`output: export`), 24 routes prerendered.

## Summary

| Area | Result |
| --- | --- |
| Type check (`tsc --noEmit`) | PASS |
| Lint (ESLint flat config) | PASS (0 errors) |
| Unit tests (Vitest) | PASS - 18/18 |
| E2E tests (Playwright, chromium + mobile webkit) | PASS - 34 passed, 2 skipped (desktop-only on mobile) |
| Production build + static export | PASS |
| Dependency audit (`npm audit`) | PASS - 0 vulnerabilities |
| Secret scan | PASS - no secrets committed, no `.env` tracked |
| Horizontal overflow (6 viewports x 6 pages) | PASS - none |
| Lighthouse (mobile) | PASS - see below |

## Automated tests

Unit (`npm run test`):
- WhatsApp number is the configured business number.
- Booking message includes every field; falls back to "brak" for empty children/notes.
- WhatsApp URL targets `wa.me/201055850536` and is correctly URL-encoded (Polish diacritics round-trip).
- Contact link has no payload when no prefill given.
- Booking validation: complete form valid; all missing required fields flagged with focus on the first; past date rejected; today accepted; children ages required when children > 0; out-of-range age rejected.
- Analytics sanitiser keeps only the non-PII allow-list and drops name/hotel/phone/notes/ages/message/email even when passed by mistake; non-primitives rejected; `track` is a safe no-op with no platform configured.

E2E (`npm run test:e2e`), against the real static export served over a local server:
1. Invalid booking form does NOT open WhatsApp and shows a Polish inline error.
2. Children ages become required when children > 0 (no WhatsApp opened).
3. Valid form opens the correct encoded `wa.me/201055850536?text=...` URL containing the tour, departure, adults, hotel and date.
4. Floating WhatsApp button has the accessible label "Napisz do nas na WhatsApp" and the correct href.
5. Reduced motion disables the hero background video (poster only) while content stays visible.
6. Skip-to-content link present.
7. Desktop primary nav navigates; Wycieczki dropdown exposes destination links (keyboard/focus path).
8. Mobile menu opens as a dialog, closes on Escape, and navigates.
9. Hero destination selector links to the three correct destination pages.
10. All three tour URLs render with the correct H1 and a booking anchor.
11. No broken internal links on home, /wycieczki/, a tour page and /cennik/.

PII-in-analytics is covered by the sanitiser unit test (no personal field can ever be forwarded).

## Lighthouse (mobile)

Two throttling methods were run against the static export. The local test server is HTTP/1.1 single-connection, which the Lighthouse "simulate" (Lantern) model penalises heavily for request queuing; the "devtools" method (real applied throttling) is representative of a CDN/HTTP-2 host such as GitHub Pages.

Home page, real (devtools) throttling:

| Metric | Value |
| --- | --- |
| Performance | 95 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| LCP | 2.3 s |
| CLS | 0 |
| TBT | 40 ms |

Tour page (Lantern simulate): Accessibility 96, Best Practices 100, SEO 100, CLS 0.004, TBT 10 ms.

Notes:
- The LCP element is the hero poster (AVIF, ~12 KB), preloaded at high priority, eager, discoverable in the initial HTML.
- Under Lantern simulate on the local HTTP/1.1 server the Performance score reads ~72-77 (LCP ~6.6 s) purely due to request serialisation in the harness. Authoritative production numbers should be taken against the live HTTPS/HTTP-2 URL after deploy (see DEPLOYMENT.md).
- CLS is 0 (explicit image dimensions/aspect-ratios everywhere).

## Responsive / manual checks

Checked at 360x800, 390x844, 768x1024, 1024x768, 1440x900, 1920x1080:
- No horizontal scroll on any page/viewport (verified programmatically).
- Polish diacritics render correctly across all pages (headings, body, OG images, WhatsApp message).
- Hero video: autoplays muted/looped/inline on capable devices, deferred until idle so it never blocks LCP, pauses off-screen and when the tab is hidden, has a visible play/pause control, and falls back to the poster for reduced motion / Save-Data.
- Floating WhatsApp button does not cover the mobile sticky booking bar (the bar raises the button via `--float-offset`) and respects safe-area insets.
- Sticky in-column booking card on desktop; sticky bottom CTA on mobile that anchors to the in-page form.
- Mobile menu: focus trap, Escape-to-close, scroll lock, focus restore, >=44px targets.
- No English UI labels; no fake reviews/ratings/counters; no Sekrety Egiptu branding.

## Routes verified (all return 200 in the export)

/ , /wycieczki/ , /wycieczki-z-hurghady/ (+ /kair-piramidy-muzeum-egipskie/), /wycieczki-z-marsa-alam/ (+ /kair-stary-kair-piramidy/), /wycieczki-z-sharm-el-sheikh/ (+ /kair-gem-piramidy/), /cennik/ , /poradnik/ (+ /co-zabrac-na-wycieczke-do-kairu/), /o-nas/ , /faq/ , /kontakt/ , /rezerwacja/ , /polityka-prywatnosci/ , /polityka-cookies/ , /regulamin/ , /sitemap.xml , /robots.txt , /manifest.webmanifest , 404.html.

## Screenshots (captured from the static export)

Full-page captures were produced at desktop and mobile widths:
- Home - 1440x900 and 390x844
- Tour (Hurghada) - 1440x900 and 390x844
- Destination (Marsa Alam) - 1440x900
- Booking (/rezerwacja/) - 390x844
- Cennik - 1024x768, FAQ - 390x844

(Delivered alongside this report; regenerate any time with the Playwright capture used during QA.)

## Known limitations / remaining owner items

- All imagery and the hero video are original, code-generated vector artwork (no photos/people) - license-clean placeholders pending real owned media. See ASSET_SOURCES.md and CONTENT_REQUIRED.md.
- Legal pages (privacy, terms) intentionally omit the full legal entity (name, address, NIP/KRS, licence) - flagged for owner/legal completion in CONTENT_REQUIRED.md.
- Sharm el Sheikh guide language is shown as "potwierdzamy przed rezerwacją" due to a source conflict; confirm and update when known.
- Sanity runs in local mode; the schema + seed are prepared but not yet applied (no write token). See SANITY_SETUP.md.
- Dependency note: `sharp` and `postcss` are pinned via `overrides` to patched versions so `npm audit` is clean; both are build-time only and never ship in the static output.

## Production verification (live: https://egipskiewakacje.pl)

Deployed via GitHub Actions (Pages source = GitHub Actions). Custom domain and HTTPS preserved. Verified on the live site:

- HTTPS 200 on homepage and all public routes (tours, destinations, cennik, poradnik + article, rezerwacja, sitemap.xml, robots.txt, 404.html).
- Serving the new site (correct H1, Organization/WebSite JSON-LD, canonical, OG/Twitter tags), not the old placeholder.
- Assets 200: hero poster (AVIF), hero video (MP4), favicon, icon.svg, OG images, manifest.
- Live tour prices correct (Hurghada 60/30 USD, infant free, "od 60 USD").
- No console errors on home, a tour page, or /rezerwacja/.

Authoritative Lighthouse (mobile) against the live HTTP/2 + CDN URL:

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 87 | 100 | 100 | 100 | 3.4 s | 0 | 100 ms |
| Tour (Hurghada) | 99 | 96 | 100 | 100 | 1.7 s | 0.004 | 10 ms |

All targets met (Performance >=85, Accessibility >=95, Best Practices >=95, SEO >=95, CLS <0.1). The ~6.6 s LCP seen under local Lantern simulate was a test-harness artifact (HTTP/1.1 single-connection server); production LCP is 1.7-3.4 s.

## Post-deploy fix applied

A production check found `og:image` (and JSON-LD image) URLs were emitted as `/media/og/default.jpg/` (trailing slash) which 404s on GitHub Pages. `absoluteUrl()` now keeps file paths slash-free; redeployed and verified (`/media/og/default.jpg` returns 200, meta corrected).
