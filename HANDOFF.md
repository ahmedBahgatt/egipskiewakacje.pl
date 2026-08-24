# Egipskie Wakacje — Project Handoff (current state)

Single source of truth for a fresh session. Describes CURRENT production, not
history. Last update: **"Brama opieki" brand integration** on branch `main`
(new approved logo system across header/footer/drawer/favicons/schema/OG — see §5).

> Language note: the site is **Polish**. Browser screenshots may render English
> because Chrome auto-translate is on — the real content is and must stay Polish.

---

## 1. Overview
- **Project:** Egipskie Wakacje — optional excursions/day-trips in Egypt.
- **Production:** https://egipskiewakacje.pl/ (GitHub Pages, static export).
- **Audience:** Polish tourists in Egypt. **Departure resorts:** Hurghada, Marsa Alam, Sharm el Sheikh.
- **Primary conversion:** WhatsApp booking (no online payment). Number centralised in `src/content/config.ts` (`whatsappNumber` / `whatsappDisplay`) — public, never hardcode elsewhere.

## 2. Stack & architecture
- **Next.js ^15.5** (App Router) · **React ^19** · **TypeScript ^5.7** · **motion ^12** (Framer Motion `motion/react`).
- **Static export:** `next.config.ts` → `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`. No server runtime; hosting-portable.
- **Styling:** CSS Modules per component + global tokens in `src/app/globals.css`. No utility-class framework.
- **Fonts** (`src/app/fonts.ts`, next/font, self-hosted): display serif **Fraunces** (`--font-display`), body sans **Manrope** (`--font-body`).
- **Content data layer** (`src/content/`): a single `ContentApi` (`content/api.ts`) read by all pages via `content` (`content/index.ts`). Two adapters selected by `NEXT_PUBLIC_CONTENT_SOURCE` (default `local`): typed source files in `content/local/*` (tours, destinations, categories, posts, site FAQs, testimonials, legal), or a read-only Sanity adapter (`content/sanity/*`, build-time GROQ). **Pages/components must NEVER import `@/content/local/*` directly** — a unit test enforces this; the category taxonomy + category images live in `src/lib/categories.ts` and testimonials go through `content.getTestimonials()`.
- **Routes** (App Router, all trailing-slash): `/`, `/wycieczki/` (+ `/wycieczki/[category]/`), `/wycieczki-z-hurghady/` `/wycieczki-z-marsa-alam/` `/wycieczki-z-sharm-el-sheikh/` (+ `/[tour]/`), `/poradnik/` (+ `/[slug]/`), `/o-nas/`, `/kontakt/`, `/rezerwacja/`, `/faq/`, `/cennik/` (redirect stub — see §12), legal pages. Static params via `generateStaticParams`.
- **SEO/schema:** helpers in `src/lib/seo.ts` (`buildMetadata`, JSON-LD builders) + `src/components/seo/JsonLd.tsx`. Sitemap `src/app/sitemap.ts`, robots `src/app/robots.ts`, manifest `src/app/manifest.ts`.
- **Key shared components:** `components/ui/{Button,PageHero,PageHeader,OptimizedImage,SectionHeading,Faq,Breadcrumbs,icons}`, `components/layout/{Header,MobileMenu,Footer,nav}`, `components/home/*`, `components/destination/DestinationPage`, `components/booking/WhatsAppFloat`.
- **Tests:** Vitest (unit) + Playwright (e2e).

## 3. Deployment
- **Production branch:** `main`. Push to `main` → GitHub Actions `.github/workflows/deploy.yml`.
- **Verify job** runs: `npm run typecheck`, `npm run lint`, `npm run test` (unit), `npm run build`, then **e2e `--project=desktop-chromium --project=mobile-chromium`** (only Chromium installed in CI). **Deploy job** publishes to GitHub Pages. Node 20 in CI (deprecation warnings are harmless).
- **Local commands:** `npm run typecheck` · `npm run lint` · `npm run build` (static export → `out/`) · `npm run test` (unit) · `npm run test:e2e` (Playwright; local config also has a `mobile-safari`/iPhone-13 project not run in CI) · `npm run verify` (typecheck+lint+unit).
- **Preview the export locally:** `npx serve out -l 3111` (there is no `next start` — export mode).
- **After any deploy, visually verify production** (heroes, carousel, dropdown, mobile nav). Note: automated Chrome may auto-translate to English — check layout, not language.

## 4. Design system (approved — preserve unless a task explicitly asks to redesign)
Premium, cinematic, image-led Egyptian travel identity — not generic SaaS, restrained on gradients/glassmorphism, strong real photography, consistent rounded cards, subtle shadows/interactions. Tokens in `globals.css`:
- Deep royal **navy** `--navy-900 #081a35`; warm **gold** `--gold-400 #d4af37` / `--grad-gold`; **cream** bg `--sand-100/--bg`, paper `--sand-50`; **teal** accents `--teal-500/600`; **WhatsApp green** `#25d366` only as an icon/accent.
- Radii `--radius/-lg/-xl`; shadows `--shadow/-sm/-lg`; type scale `--step--1..--step-5`; ease `--ease-out`.

## 5. Logo / brand — "Brama opieki" (approved final identity)
Concept: a golden gateway framing the pyramids, sun and Red Sea over a supportive hand ("Twoje wakacje są w dobrych rękach"). Two approved source PNGs (transparent) live in `~/Downloads` (`logo.png` full lockup 1672×941, `logo2.png` square crest 1254×1254) — sources, not shipped. Production variants were derived with sharp (trimmed, optimised) into `public/media/brand/`.
- **Production assets** (`public/media/brand/`): full lockup `egipskie-wakacje-logo.{png,webp}` (1200w, transparent — schema/share master) + `logo-header.{png,webp}` (small, reserved); square crest `egipskie-wakacje-mark.{png,webp}` + `logo-mark.{png,webp}` (small — the one the header/footer/drawer load).
- **Site lockup = crest raster + LIVE-TEXT wordmark**, NOT the full raster lockup. `components/brand/Logo.tsx` takes `context="header"|"footer"|"drawer"`: it renders `logo-mark` + `<span>Egipskie Wakacje</span>` (serif `--font-display`) + `<span>Wycieczki po polsku</span>` (gold uppercase tag). The wordmark colour is `currentColor` so ONE lockup works on every surface; the tagline is always gold (`--gold-400`). "Egipskie Wakacje" is forced one line (`white-space:nowrap`).
- **Header** (`Header.tsx` → `<Logo context="header"/>`, wrapped in the `/`-link): mark ~46px + one-line name + slogan beneath at ALL widths; ultra-narrow (<360px) shows mark only. Homepage over-hero + navy-scrolled bar = white text (via `.overHero .brand` colour + `text-shadow` for hero contrast); inner cream bar = navy text. Header stays 72px.
- **Footer** (`Footer.tsx` → `<Logo context="footer"/>`, `/`-link `.brandLink` sets `color:#fff`): larger mark (56px) + cream name + gold slogan on navy. No white box.
- **Mobile drawer** (`MobileMenu.tsx` head → `<Logo context="drawer"/>`, `/`-link): mark + white name, no tagline. Drawer still portaled to `document.body` (unchanged).
- **Favicons / app icons** = the square crest on an opaque cream (`#faf4e9`) tile, generated from `logo2.png`: `public/favicon.ico` (16/32/48), `icon-48/96/192/512.png`, `icon-512-maskable.png` (extra safe padding), `apple-touch-icon.png` (180, full-bleed cream for iOS masking). Referenced in `layout.tsx` `metadata.icons` (favicon.ico + 48/96/192 png + apple 180) and `manifest.ts` (192/512 any + 512 maskable). The old `icon.svg` was removed.
- **Organization schema** `logo` → `/media/brand/egipskie-wakacje-logo.png` (same `@id`, no new entity). **Default OG card** `public/media/og/default.jpg` regenerated = full lockup on cream (content-page OG photography untouched). Old `public/media/brand/logo.png` deleted; zero active old-logo references.

## 6. Homepage structure (current DOM order — `src/app/page.tsx`)
Header → **Hero** (video) → **Marquee** → **ResortTiles** (3 destinations) → **TrustStrip** (payment-first USPs) → **Bestsellers** ("Polecane wycieczki" + `TourSlider`) → **CategoryBrowse** (8) → **ThreeFacesStory** (Morze/Historia/Pustynia editorial) → **HelpMeChoose** ("Powiedz, czego szukasz") → **Testimonials** → **BookingSteps** (3 steps, no-prepayment) → **WhyUs** → **GuidePreview** (1 real article) → **AboutPreview** → **FAQ** (first 8 site FAQs) → **FinalCta** (WhatsApp) → Footer. Data via `content.getFeaturedTours/getSiteFaqs/getPost/getDestinations/getTours/getCategories/getTestimonials`; counts derived from real tours. Homepage is largely complete — improve, don't redesign.

## 7. Hero (`components/home/Hero.tsx` + `.module.css`)
Full-bleed background: AVIF/JPG/WebP **poster** (LCP, preloaded) with the video layered over once loaded. Video: `muted loop playsInline autoplay preload="none"`, `aria-hidden`, paused off-screen/hidden-tab; **skipped for reduced-motion and Save-Data**. Left-aligned content: 2-line serif H1, lead, compact CTAs (`gold` "Zobacz wycieczki" + `whatsappOutline` "Napisz na WhatsApp"), trust stats (tours count, 3 resorts, **"Bez przedpłaty — płatność przy odbiorze"**).
- Video asset: `public/media/hero/egipskie-wakacje-hero.mp4` — **1280×720**, H.264, ~**19.94s**, 23.976fps (24000/1001), **no audio**, faststart (re-encoded to 720p in commit `428281e`; the earlier 1080p note is stale). Poster: `public/media/hero/hero-poster.{avif,webp,jpg}`. This is the unique Egipskie Wakacje asset — do not swap for a reference site's video.

## 8. Marquee (`components/home/Marquee.tsx`)
Dark navy/gold continuous ticker of real categories + destinations, each linking its real route, with **custom gold SVG pictograms** (`components/ui/icons.tsx`, mapped in `page.tsx`). Respects reduced-motion. Do NOT replace the SVG icon set with Unicode emoji.

## 9. Destination cards (`components/home/ResortTiles.tsx`)
Three whole-card links (Hurghada / Marsa Alam / Sharm el Sheikh) with real dynamic trip counts, premium photo + localized bottom scrim, gold arrow disc, hover zoom. `auto-fit` responsive → 1/2/3 up. Section heading names the three departure resorts. Images `public/media/destinations/{hurghada,marsa-alam,sharm-el-sheikh}.{avif,webp,jpg}` (1586×992). Keep the visual identity: Hurghada = marina/yachts; Marsa Alam = reef/turquoise nature; Sharm = Sinai mountains + coastline. Do not swap for generic sea shots.

## 10. Category cards (`components/home/CategoryBrowse.tsx`)
Eight image-on-top / content-below cards (Kair i piramidy, Luksor, Rejsy i wyspy, Snorkeling i delfiny, Nurkowanie, Safari i quady, Atrakcje i rozrywka, Wycieczki prywatne) → each category landing page, with real tour counts. Grid 1→2→3→4 at 560/900/1140px. Images `public/media/categories/<slug>.{avif,webp,jpg}` (1200×800, 3:2) — the slug→image map + SEO alt live in `src/lib/categories.ts` (`categoryImage`), shared with the category page hero. These are important internal-link / semantic hubs.

## 11. Tours carousel — FINAL behaviour (`components/home/TourSlider.tsx`)
ONE architecture, do not replace with scroll-snap-only or `setInterval(nextCard)`:
- **3× clone track** `[cloneA][real][cloneB]` moved by a single `translate3d` on the element (animation runs outside React state — no per-frame rerender). Pixel offset `pos` is the source of truth, wrapped every frame by `wrapPos(pos, blockW)` (`src/lib/carousel.ts`).
- **Idle = continuous belt:** a `requestAnimationFrame` loop drifts at **`SPEED = 62` px/s** — smooth, never stepped, infinite (last flows into first, no visible rewind/reset).
- **Manual:** pointer drag pauses the belt and settles on **exactly one card** per swipe (nearest, clamped ±1; vertical page scroll preserved via axis-lock + `touch-action: pan-y`). Arrows step one card. All wrap infinitely both directions (no dead end / disabled edge).
- **Resume:** belt restarts from the CURRENT card after `RESUME_MS = 4000`; hover/focus/hidden-tab pause it. `STEP_MS = 600` snap; boundary normalisation on `transitionend` (silent, pixel-identical).
- **Reduced motion** disables the belt but keeps drag/arrows. Clones are `aria-hidden` + `tabIndex=-1` (no duplicate IDs/JSON-LD/focus). Unit tests: `tests/unit/carousel.test.ts` (`wrapPos`, `normalizeIndex`, `realIndex`).

## 12. Navigation (`components/layout/nav.ts`, `Header.tsx`)
Desktop top-level: **Strona główna** (`/`) · **Wycieczki** (dropdown, NOT a direct link) · **Poradnik** · **O nas** · **Kontakt** · booking CTA "Zarezerwuj wycieczkę" (`/rezerwacja/`). Cennik was removed from nav and internal links; **`/cennik/` is now an SEO-safe redirect stub** (`app/cennik/page.tsx`: canonical → `/wycieczki/`, `robots: index:false`, a React-19-hoisted `<meta http-equiv="refresh">`; static export can't 301) and is out of the sitemap. The **Wycieczki dropdown's first child `Wszystkie wycieczki`** is the explicit all-tours link.

## 13. Desktop Wycieczki dropdown (`Header.tsx`)
Trigger is a real **`<button>`** (aria-haspopup/expanded/controls) that OPENS the menu and **never navigates**. Opens on hover (only `(hover:hover) and (pointer:fine)` — checked per interaction), click, or Enter/Space; closes on pointer-leave of the shared trigger+panel `li` (140 ms bridge timer), Escape (restores focus to trigger), or outside click; route change closes it. Panel touches the trigger (`top:100%`, no dead gap); children are `tabIndex=-1` while closed. **Root cause of the old intermittent first-hover bug was a `suppressHoverOpen` flag — it is removed; do not reintroduce any hover-suppression/`focus-within`-only mechanism.**

## 14. Mobile navigation (`Header.tsx`, `MobileMenu.tsx`)
Header burger + drawer close are **explicit inline SVG** (`IconMenu`/`IconX`) with pixel-sized `.burger svg`/`.close svg` + `currentColor` (fixes the iOS empty-box; no icon fonts/glyphs). Drawer: `role=dialog` focus trap, Escape closes, body scroll-lock, `100dvh`, `env(safe-area-inset-*)` top/bottom, scrollable list, Wycieczki shown as a submenu/accordion list, compact CTAs (`gold` "Zarezerwuj wycieczkę" + `whatsappOutline` "Napisz na WhatsApp"). **While the drawer is open, `body[data-menu-open]` hides the global floating WhatsApp FAB** (`WhatsAppFloat.module.css`) so it never overlaps the drawer CTAs (shared state, not z-index war).
- **The drawer is rendered through a React portal into `document.body`** (`createPortal`, gated by a `mounted` flag for SSR/hydration safety) — **NEVER move it back inside `<header>`**. The header carries `backdrop-filter`, which makes it the containing block for any `position: fixed` descendant; a header-nested drawer therefore had `inset:0` resolve to the **72px header box**, so the backdrop covered only the header strip and the panel was clipped/mis-painted (the real-device Android inner-page bug: navy strip + white blank + clipped drawer). It only *looked* fine on the homepage because the leaked area there is the dark hero, not white/cream. Portaling to `<body>` makes the viewport the containing block. Guarded by `tests/e2e/mobile-drawer.spec.ts` (home + every inner page type: root/backdrop must fill the viewport, `rootParent === BODY`, panel inside the viewport, no horizontal overflow) — runs on Chromium **and** WebKit.

## 15. Inner-page hero (`components/ui/PageHero.tsx` + `.module.css`)
Shared by **all destination pages** (`DestinationPage.tsx`) and **all category pages** (`app/wycieczki/[category]/page.tsx`). **Full-bleed background photo** (object-fit cover, per-destination crop) + left-to-right navy scrim (strong left → bright right) + left-aligned content (breadcrumb, gold eyebrow, serif H1, intro, compact CTAs `gold` + `whatsappOutline`). No small right-side image-card layout. Min-height `clamp(420px,42vw,660px)`.
- **One shared width system, no per-page overrides:** content `max-width: min(760px,100%)`, desktop `min(780px,66%)` (≈739px used width); intro `max-width: min(720px,100%)`; H1 `font-size: clamp(2rem, 1.15rem + 2.6vw, 3.9rem)`, no width cap. Short titles (Wycieczki z Hurghady / Marsa Alam) sit on one line and the intro reads as a wide editorial paragraph.

## 16. Destination hero images / focal points
`content/local/destinations.ts` `heroImage` = the same `/media/destinations/*` assets, with per-destination `objectPosition` to keep focal subjects in the full-bleed crop: **Hurghada `center 42%`** (marina/yachts), **Marsa Alam `center 40%`** (reef/turquoise), **Sharm el Sheikh `center 40%`** (Sinai mountains/coastline). Category heroes use `categoryImage` (default centre crop). Never revert to the rejected small image-card hero.

## 17. Inner-page typography rules
Inner H1 < homepage hero H1; premium serif; wide editorial column (never a narrow/tall block); CTAs compact — **primary gold (navy text) + WhatsApp outlined/subtle (green only on the icon)**. Never the old giant blue + bright-green blocks. `whatsappOutline` (light text, gold border, green icon) for dark heroes/drawer; `whatsappSubtle` exists for light backgrounds.

## 18. Business rules (CRITICAL — permanent)
- **Payment: NO PREPAYMENT.** Customer does not pay at booking; pays only when the excursion starts / at pickup. Approved wording concept: **"Bez przedpłaty — płacisz dopiero przy rozpoczęciu wycieczki."** Never imply online/card prepayment. Surfaced in hero stat, trust strip, booking step 3, Why-us, two FAQ entries, footer.
- **Booking:** primarily via WhatsApp (form pre-fills a WhatsApp message; no online payment).
- **Pickup:** claim hotel pickup only per real tour data; no universal pickup guarantee.
- **Language:** Polish audience; do not invent universal Polish-guide guarantees where individual tour data differs (e.g. Sharm guide language is confirmed per booking).

## 19. Testimonials (CRITICAL honesty — `components/home/Testimonials.tsx`, `content/local/testimonials.ts`)
Section **"Opinie uczestników naszych wycieczek"** — 5 genuine participant experiences from excursions run by the same team. Treatment: **reviewer identities anonymised** (no real names shown, none invented), attribution **"Uczestnik wycieczki"** + factual trip/category pill; **★★★★★ shown per card only because each of the 5 source reviews was individually verified 5/5**. Do NOT: name another brand/site in the visible section, show Google logo / "Google Reviews", show a global/average rating or customer count, or emit Review/AggregateRating JSON-LD. It is visible trust content only (served via `content.getTestimonials()`; `reviews` array stays empty by design so no rating schema is generated).

## 20. SEO — homepage strategy
Primary intent: **wycieczki fakultatywne w Egipcie po polsku**. Supporting entities: Hurghada, Marsa Alam, Sharm el Sheikh, Kair, Luksor, Morze Czerwone, snorkeling, nurkowanie, safari, rejsy, wycieczki prywatne. Principles: one primary H1, natural Polish, no keyword stuffing, descriptive internal links, strong destination/category hubs, useful FAQ, crawlable answer-first HTML, meaningful image ALT, correct canonical/meta/OG (`buildMetadata`), logical headings. No hidden text, no fake freshness dates, no giant homepage SEO articles.

## 21. AI visibility (AEO/GEO)
Achieved through clean factual HTML, clear entity relationships (brand ↔ resorts ↔ categories ↔ tours), answer-first passages, structured headings, useful internal links, original first-party trip/service data, consistent brand identity. No gimmicks: no hidden AI content, no `llms.txt` requirement for Google, no pages built solely to manipulate AI citations.

## 22. Structured data (`src/lib/seo.ts`)
Homepage JSON-LD: **Organization** + **WebSite** (in `layout.tsx`) and **FAQPage** (visible home FAQs) + **ItemList** (featured tours) (in `page.tsx`). Organization: `@id`, `name`, `url`, `logo`, `slogan`, `knowsLanguage:["pl"]`, `areaServed` (Hurghada/Marsa Alam/Sharm/Egipt), `contactPoint` (WhatsApp) — **no invented address, no fake `sameAs`, no LocalBusiness/TravelAgency**. WebSite: `@id`, `inLanguage:"pl-PL"`, `publisher`→Organization. Other pages add `BreadcrumbList`, `TouristDestination`, `TouristTrip` (tour Offer = from-price only), `BlogPosting`, `FAQPage` as appropriate. **Never** AggregateRating/Review/fake Offers/fake availability; don't duplicate schema across pages.

## 23. Image pipeline (`components/ui/OptimizedImage.tsx`)
`<picture>` serving **AVIF → WebP → JPG** (local base path `src` → `${src}.avif|.webp|.jpg`, or Sanity CDN URLs). `priority` → `loading=eager` + `fetchPriority=high` (LCP only); else lazy. Inline `aspect-ratio` (prevents CLS) + optional `object-position`. Pre-generated variants via `scripts/generate-media.mjs` (`npm run media`); hero video via `scripts/generate-hero-video.mjs`. Production assets live under `public/media/{hero,destinations,categories,blog,brand,og}`. The old `~/Downloads` import folders were temporary — not production dependencies.

## 24. Performance / CWV + cross-device stability rules
Optimized AVIF/WebP; lazy-load below the fold; explicit aspect-ratio to avoid CLS; hero poster is the LCP, video deferred (faststart, off for reduced-motion/Save-Data); no heavy carousel/icon deps (carousel is CSS transform + rAF, animates outside React rerenders); don't preload every image; reduced-motion respected; avoid layout thrashing. Interior heroes pass `imagePriority` (eager + `fetchPriority=high`) — the only LCP prioritised per page.
- **Reveal is NEVER content-gating (`components/motion/Reveal.tsx`).** Scroll-reveal content is **fully opaque by default** — only a small `translateY` animates as enhancement, gated by `@media (prefers-reduced-motion: no-preference)`. A slow device (older iPhone/Safari) must never scroll into a blank white section waiting on JS. **Do NOT reintroduce an `opacity:0` initial state** (the old Framer `whileInView initial={{opacity:0}}` shipped `opacity:0` in the SSR HTML → blank-scroll on iPhone X). Reveal now uses **one shared IntersectionObserver** for all instances (not one per element/card). Guarded by `tests/e2e/content-visibility.spec.ts` (every below-fold `[data-reveal]` must be opaque before scroll).
- **Continuous animations pause when offscreen.** The bestseller carousel (`TourSlider.tsx`) pauses its rAF belt via an IntersectionObserver on its viewport (in addition to hover/focus/drag/hidden-tab); it also never starts while `document.hidden` or offscreen. The marquee is pure CSS (paused on hover, disabled for reduced-motion).
- **No blanket `will-change`.** `will-change: transform` was removed from `Button` (was on every button site-wide → a permanent compositor layer per button) and from the marquee track — both animate fine without it and this cuts always-on GPU layers on older iPhones. Keep `will-change`/3D-transform layers only where an element genuinely animates continuously (Hero parallax, carousel track's `translate3d`).
- **iOS/Safari notes:** AVIF is supported from iOS 16 but software-decoded (slower) on older devices — the `.img` placeholder is `--sand-200` so a decoding image shows a warm surface, not harsh white. No `background-attachment: fixed`, no `content-visibility` anywhere (both are Safari-sensitive). Drawer uses `100dvh` + safe-area insets.

## 25. Accessibility
Semantic nav/landmarks, visible focus-visible, proper button-vs-link semantics, dropdown `aria-haspopup/expanded/controls` + keyboard (Enter/Space open, Escape close, Tab through submenu), accessible mobile dialog with focus trap + Escape + body scroll-lock, meaningful ALT, sufficient contrast, reduced-motion support, carousel does not trap keyboard/touch, skip link to `#main`.

## 26. Responsive targets
Representative widths tested (emulated): ~390, 430, 768, 1024, 1280, 1440+, 1920. Verification is **automated/emulated** (Playwright Chromium/WebKit + CI); **no physical-device testing has been done** — do not claim real hardware. Aim to support macOS/Windows Chrome/Safari/Edge and iOS/Android/iPad.

## 27. Test suite (current)
- **Unit (Vitest): 85 passing**, 10 files (`tests/unit/*`) — incl. `carousel` (infinite wrap maths), `no-local-imports` (content-adapter boundary), `no-stretched-link`, tour inventory/schema, polish, whatsapp, sanity-content, validation, analytics.
- **e2e (Playwright): 11 spec files** (`tests/e2e/*`), run across desktop-chromium + mobile-chromium (Pixel 5) in CI (+ a local **mobile-safari/iPhone-13 WebKit** project for real Safari-engine coverage). **129 passed / 13 desktop-only skipped** on Chromium. Coverage incl. hero shared width (`hero.spec`), dropdown first-hover + trigger-no-navigation + `Wszystkie wycieczki` navigates (`dropdown.spec`), mobile menu + FAB-hidden-while-open + Cennik-removed + Strona-główna (`navigation.spec`), **cross-page mobile-drawer geometry (`mobile-drawer.spec` — the Android inner-page regression guard, Chromium + WebKit), content-visibility / no-blank-scroll (`content-visibility.spec`)**, ghost-clicks, broken-links, inventory, content-polish, booking, motion-a11y.
- **Cross-browser strategy:** CI stays Chromium-only (desktop + mobile) to keep it fast/stable; run the WebKit project locally for Safari-engine checks: `npx playwright test --project=mobile-safari`. Physical-device confirmation (real Android + iPhone X) is the owner's final step — automated runs are Chromium/WebKit **emulation**, never claimed as real hardware.
- **Before deploy run:** `npm run typecheck && npm run lint && npm run test && npm run build && npm run test:e2e` (CI runs the same minus WebKit).

## 28. Do NOT regress
Do not: restore a huge centred inner-page hero; replace the full-bleed destination hero with a small right-side image card; make hero intro paragraphs narrow/tall or add per-page width overrides; use giant blue + bright-green hero CTAs; make the carousel finite or use `setInterval(nextCard)`; create a visible carousel rewind/reset; break one-card mobile swipe; make **Wycieczki** navigate directly instead of opening the dropdown; reintroduce `suppressHoverOpen`/unreliable hover suppression; use blank/glyph/icon-font hamburger or close icons; let the floating WhatsApp FAB overlap the open mobile drawer; re-add Cennik to the navbar; invent reviews/ratings/business claims; name another site's brand in the visible testimonials; add Review/AggregateRating schema; or translate source content to English. **Cross-device pass (do not undo):** do not move the mobile drawer back inside `<header>` (keep it portaled to `<body>` — §14); do not give Reveal an `opacity:0` initial state or otherwise gate content visibility on JS (§24); do not blanket-add `will-change`; do not remove the carousel's offscreen-pause IntersectionObserver.

## 29. Production status (completed)
On `main` @ **46f18c1**, live at https://egipskiewakacje.pl/. Completed: homepage premium redesign; unique 720p hero video; premium marquee; real destination + category photography; anonymised testimonials; homepage SEO/schema pass (Organization/WebSite/FAQPage/ItemList); mobile nav + icon fixes + FAB overlap fix; Cennik removal + `/cennik/` redirect; Strona główna nav; shared **full-bleed** destination/category hero with one wide content-width system; **continuous infinite belt** carousel with one-card mobile swipe; reliable desktop **Wycieczki** hover/dropdown. All verified on live production.

## 30. Next work / roadmap
Homepage/global UI is largely complete — **do not keep redesigning it**. Next: improve INNER PAGES for SEO/content/conversion, building on the approved shared components (PageHero, cards, carousel, nav) — do not redesign them.
1. Destination pages — Hurghada, then Marsa Alam, then Sharm el Sheikh.
2. The 8 category pages (Kair i piramidy, Luksor, Rejsy i wyspy, Snorkeling i delfiny, Nurkowanie, Safari i quady, Atrakcje i rozrywka, Wycieczki prywatne).
3. Key tour-detail pages; guide/content clusters (`/poradnik/` — only 1 real article today, no fabricated URLs); internal linking; broader SEO/AEO/GEO; entity/backlink work.

### 30a. Inner-page SEO/AEO phase — DONE + DEPLOYED (production commit `43d41e5`)
Final QA pass applied on top of the initial upgrade: all-tours primary ownership set to `wycieczki fakultatywne egipt` (KD5, Egypt-specific) with the 2900-vol heads secondary; **Nurkowanie** H1/title/meta/first-paragraph made explicitly "Nurkowanie w Egipcie"; **Atrakcje** owns broad `atrakcje i rozrywka w Egipcie` (NOT `hurghada atrakcje` — reserved for Hurghada hub/future guide); box-fatigue reduced via `RelatedLinks` `tone` background alternation. Schema QA: every hub has exactly one H1/CollectionPage/ItemList/BreadcrumbList/FAQPage, self-canonical, unique titles, sitemap once, no Product/Review/AggregateRating. Full CI green (typecheck/lint/85 unit/build/e2e desktop+mobile) and deployed to GitHub Pages. Next phase (NOT started): individual tour-detail pages (Orange Bay, Abu Dabbab, Sataya, Parasailing, Grand Aquarium, Cairo/Luxor products) + informational guides (Dolina Królów, piramidy w Egipcie).

Initial upgrade details:
All 12 hub pages upgraded on top of the approved shared components (no redesign):
- **Keyword map:** `SEO_KEYWORD_MAP.md` created from the SEMrush gap CSV (`.local-research/gap.csv`) — per-page primary/secondary/reserved keywords + volume/KD + cannibalisation notes. Source of truth for hub keyword ownership.
- **New shared components** (design-token consistent): `components/ui/PageIntro` (answer-first lead + Quick Facts card), `components/ui/RelatedLinks` (hub-and-spoke internal links, whole-card `<a>`, no stretched-link), `components/ui/CtaBanner` (reusable WhatsApp CTA). Facts derived live from real inventory via `lib/facts.ts` (count, from-price per-person, resorts) — never hardcoded.
- **All-tours `/wycieczki/`** rebuilt: was a thin PageHeader+filter → now full-bleed PageHero (reuses `hero-poster`), PageIntro (78 tours / od 12 USD / 3 resorts), destination hub + category hub `RelatedLinks`, filter, site-FAQ subset, CtaBanner. H1 "Wycieczki fakultatywne w Egipcie".
- **Category pages** (`wycieczki/[category]`): + PageIntro, + reserved-entity `RelatedLinks` (Orange Bay/Abu Dabbab/Sataya/Grand Aquarium/Parasailing/Seascope → their TOUR pages, via `CATEGORY_HIGHLIGHT_SLUGS` in `lib/experiences.ts`), + resort cross-links, + CtaBanner. Luksor renamed "Wycieczki do Luksoru i Doliny Królów".
- **Destination pages** (shared `DestinationPage`): + PageIntro, + `heroTitle` field (Marsa Alam H1 = "Wycieczki fakultatywne z Marsa Alam", KD3), + category-hub links + other-resort links. Titles now carry "po polsku".
- **Schema:** listing pages emit `CollectionPage` (nested ItemList, `collectionPageJsonLd`) instead of a bare ItemList — one ItemList per page, tied to WebSite. No fake Product/Review/AggregateRating/Offer. FAQPage only where FAQs are visible.
- **Cannibalisation model:** hubs mention+link entities, tour pages own them. Wycieczki prywatne kept (no gap-CSV cluster; no invented volume).
- **QA:** typecheck + lint clean; 85 unit tests pass; static build clean; e2e desktop+mobile-chromium 103 passed / 13 desktop-only skipped. Sitemap = 12 hubs once + 78 tours; cennik still excluded. Visual review OK (browser auto-translate shows gray skeleton bars mid-translation — layout is correct).
- **NOT deployed** — awaiting owner visual review before commit/push.

## Known constraints / notes
- Only **one** real `/poradnik/` article exists; the homepage guide shows it (do not fabricate more URLs).
- Hero video rights item was flagged in memory — treat the current `egipskie-wakacje-hero.mp4` as the approved asset unless told otherwise.
- No secrets in this repo/handoff; Sanity mode (if ever enabled) uses `NEXT_PUBLIC_SANITY_*` env vars — names only, never commit values.
