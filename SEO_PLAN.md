# SEO plan

Search strategy for egipskiewakacje.pl. The site targets Polish-language queries from tourists who are either planning a trip to Egypt or already staying in a Red Sea or Sinai resort.

Market: Poland, Polish language, `pl-PL`. Every page declares `<html lang="pl">` and `openGraph.locale = pl_PL`.

---

## Table of contents

- [Page to primary query mapping](#page-to-primary-query-mapping)
- [Cannibalization rules](#cannibalization-rules)
- [Internal linking rules](#internal-linking-rules)
- [Technical foundations](#technical-foundations)
- [Structured data plan](#structured-data-plan)
- [What we never mark up](#what-we-never-mark-up)
- [Titles and descriptions](#titles-and-descriptions)
- [Measurement](#measurement)

---

## Page to primary query mapping

One page owns one primary query. Everything else on that page is secondary.

| Page | Route | Primary query | Secondary intent | Search intent |
| --- | --- | --- | --- | --- |
| Home | `/` | `wycieczki fakultatywne w Egipcie` | brand, "wycieczki w Egipcie dla Polaków" | Broad / navigational |
| All tours | `/wycieczki/` | `wycieczki w Egipcie` (catalogue) | comparison between departure points | Commercial investigation |
| Hurghada overview | `/wycieczki-z-hurghady/` | `wycieczki z Hurghady` | "wycieczki fakultatywne Hurghada" | Commercial investigation |
| Marsa Alam overview | `/wycieczki-z-marsa-alam/` | `wycieczki z Marsa Alam` | "wycieczki fakultatywne Marsa Alam" | Commercial investigation |
| Sharm el Sheikh overview | `/wycieczki-z-sharm-el-sheikh/` | `wycieczki z Sharm el Sheikh` | "wycieczki fakultatywne Sharm" | Commercial investigation |
| Hurghada -> Cairo tour | `/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/` | `wycieczka z Hurghady do Kairu` | "Hurghada Kair piramidy cena", "Muzeum Egipskie" | Transactional |
| Marsa Alam -> Cairo tour | `/wycieczki-z-marsa-alam/kair-stary-kair-piramidy/` | `wycieczka z Marsa Alam do Kairu` | "Stary Kair", "Marsa Alam piramidy cena" | Transactional |
| Sharm -> Cairo tour | `/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy/` | `wycieczka z Sharm el Sheikh do Kairu` | "GEM", "Wielkie Muzeum Egipskie wycieczka" | Transactional |
| Pricing | `/cennik/` | `wycieczki w Egipcie ceny` | "ile kosztuje wycieczka do Kairu" | Commercial investigation |
| Guide index | `/poradnik/` | `poradnik - wycieczki w Egipcie` | topical hub | Informational |
| Guide article | `/poradnik/co-zabrac-na-wycieczke-do-kairu/` | `co zabrać na wycieczkę do Kairu` | "co spakować Kair", "paszport na wycieczkę do Kairu" | Informational |
| About | `/o-nas/` | brand + trust | "kto organizuje wycieczki" | Navigational / trust |
| FAQ | `/faq/` | long-tail questions | operational questions | Informational |
| Contact | `/kontakt/` | brand + contact | "kontakt WhatsApp" | Navigational |
| Booking | `/rezerwacja/` | conversion page | none | Transactional |
| Legal pages | `/polityka-prywatnosci/`, `/polityka-cookies/`, `/regulamin/` | none | none | Compliance |

The primary query for each destination is stored in the content model (`Destination.primaryQuery`) rather than only in this document, so it stays attached to the page it belongs to.

The booking page and the legal pages are not SEO targets. They exist for conversion and compliance.

---

## Cannibalization rules

Four page types cover overlapping vocabulary. These rules keep them from competing for the same result.

| Layer | Owns | Must not do |
| --- | --- | --- |
| **Home** - broad | The brand and the broadest category term. Positions the offer, links to all three destinations. | Must not target a single destination query, and must not reproduce a tour's full itinerary, price table or booking detail. |
| **Destination** - overview | One departure city. Lists the tours that leave from it, explains local pickup and transfer logic, answers city-specific questions. | Must not become a second copy of the tour page. Programme detail, hour-by-hour itinerary and inclusion/exclusion lists belong on the tour page. |
| **Tour** - commercial | The exact "wycieczka z [city] do Kairu" query. Owns price, availability, itinerary, inclusions, exclusions, transfer supplements, requirements and the booking call to action. | Must not chase informational queries ("co zabrać", "czy potrzebny paszport") with long explanatory sections - link to the guide instead. |
| **Guide (blog)** - informational | Question queries with no commercial intent. Answers first, then links to the relevant tours. | Must not duplicate the tour price table or present itself as an offer page. |

Operating rules:

1. **One H1 per page**, matching that page's primary query in natural Polish.
2. **No duplicated H1 or title across pages.** The three tour pages differ by departure city; the three destination pages differ by city. Never ship two pages whose titles differ only by a stop word.
3. **Shared facts live in one place.** A price appears in full on the tour page and the pricing page; the destination page shows a "from" price on the card and links through. The pricing page is a comparison table, not three copies of the tour pages.
4. **New content must be assigned an owner before it is written.** If a new article would answer a query already owned by a tour page, extend the tour page instead of creating the article.
5. **A tour will only ever have one URL.** Tours are never duplicated under a second destination; a tour belongs to exactly one `destination` in the content model, which makes a duplicate route structurally impossible.

---

## Internal linking rules

Links are the main ranking signal we control, and the main way a visitor moves from an informational query to a booking.

**Hierarchy**

```
Home
 ├─ /wycieczki/ ─────────── all three tours
 ├─ /wycieczki-z-hurghady/ ─────────── its tour
 ├─ /wycieczki-z-marsa-alam/ ───────── its tour
 ├─ /wycieczki-z-sharm-el-sheikh/ ──── its tour
 ├─ /cennik/ ─────────────── all three tours
 └─ /poradnik/ ───────────── the guide article ── the relevant tours
```

**Rules**

1. **Home links to all three destination pages and to the tours listing.** These are the strongest internal links on the site.
2. **Every destination page links to its own tour(s) and back to `/wycieczki/`.** It also links laterally to the other two destinations, so a visitor who picked the wrong city can correct in one click.
3. **Every tour page links up to its destination page** (through breadcrumbs, which are rendered visually and marked up as `BreadcrumbList`), **sideways to the other tours**, and **out to the related guide article** via `Tour.relatedPostSlug`.
4. **The guide article links to the tours it supports** via `BlogPost.relatedTourSlugs`, using descriptive anchors, never "kliknij tutaj".
5. **The pricing page links to each tour page** from its row. It is a routing page, not a dead end.
6. **Breadcrumbs on every non-home page.** They are the site's most consistent internal link and they are what `BreadcrumbList` describes.
7. **Anchor text is descriptive and varied.** Prefer "Wycieczka z Hurghady do Kairu" over "więcej" or "zobacz". Do not use the identical anchor for every link to the same page.
8. **The footer carries the full destination and offer navigation**, so every page is at most two clicks from every other page.
9. **No orphan pages.** Anything in the sitemap must be reachable by a link from at least one other page. The nav model in `src/components/layout/nav.ts` is the single source for header, mobile menu and footer, which makes an orphan hard to create by accident.
10. **No links to sekretyegiptu.pl.** The two sites are presented independently - see [CONTENT_SOURCES.md](./CONTENT_SOURCES.md).

---

## Technical foundations

Already implemented:

- **Static HTML for every route.** No client-side rendering barrier, no hydration requirement for content to be readable.
- **`trailingSlash: true`.** One canonical URL shape for every page. Always link with the trailing slash - a link without it costs a redirect hop.
- **Self-referencing canonicals** on every page, built from `SeoMeta.canonicalPath` through `buildMetadata()` in `src/lib/seo.ts`. `absoluteUrl()` enforces the trailing slash so a canonical can never disagree with the real URL.
- **`metadataBase`** set to the production origin in `src/app/layout.tsx`, so relative OG and Twitter image paths resolve to absolute URLs.
- **Open Graph and Twitter tags** on every page, `summary_large_image`, 1200 x 630 JPG.
- **`robots` metadata** allows indexing and sets `max-image-preview: large` for Googlebot.
- **`sitemap.xml` and `robots.txt`** generated at build time.
- **Static 404 page** so a bad URL returns a branded page rather than the GitHub Pages default.
- **Core Web Vitals discipline**: pre-optimized AVIF/WebP/JPG through `<picture>`, explicit `width`/`height` plus `aspect-ratio` on every image (no CLS), a single `priority` LCP image per page, lazy loading below the fold, `next/font` self-hosting with `display: swap` (no render-blocking font request, no FOIT), `LazyMotion` so animation code is code-split, and a hero video that is not fetched at all under reduced-motion or `Save-Data`.
- **Accessibility as an SEO input**: skip link, one H1 per page, semantic landmarks, keyboard-operable menus, visible focus, and a `<noscript>` rule that forces reveal-animated content visible without JavaScript.

To do at launch: submit `sitemap.xml` in Google Search Console, verify the property, and confirm the custom domain resolves with HTTPS before requesting indexing.

---

## Structured data plan

All JSON-LD is produced by typed builders in `src/lib/seo.ts` and injected through `src/components/seo/JsonLd.tsx`. Nothing is hand-written per page, so a page cannot ship malformed or invented markup.

| Page type | Schema types | Source builder |
| --- | --- | --- |
| Home (site-wide, in root layout) | `WebSite`, `Organization` | `websiteJsonLd()`, `organizationJsonLd()` |
| Destination pages | `BreadcrumbList`, `ItemList`, `TouristDestination` | `breadcrumbJsonLd()`, `itemListJsonLd()`, `touristDestinationJsonLd()` |
| Tour pages | `BreadcrumbList`, `TouristTrip` with a nested `Offer` | `breadcrumbJsonLd()`, `tourJsonLd()` |
| Guide article | `BlogPosting`, `BreadcrumbList` | `blogPostingJsonLd()`, `breadcrumbJsonLd()` |
| Any page with visibly rendered FAQs | `FAQPage` | `faqJsonLd()` |
| Other pages (contact, about, legal, booking) | `BreadcrumbList` only | `breadcrumbJsonLd()` |

Details:

- **`Organization`** carries the name, URL, description and a `ContactPoint` of type `reservations` with `availableLanguage: ["pl"]` pointing at the WhatsApp link. It deliberately carries **no** postal address and **no** registration number, because neither has been confirmed - see [CONTENT_REQUIRED.md](./CONTENT_REQUIRED.md).
- **`TouristTrip`** includes the name, description, canonical URL, hero image, the itinerary as an `ItemList` of `TouristAttraction` entries, the provider, and a single `Offer` carrying the adult "from" price in USD with `availability: InStock`.
- **`FAQPage` is only emitted where the same FAQs are visibly rendered on the page.** Marking up invisible FAQs is a guideline violation. The FAQ content and the markup come from the same `faqs` array, so they cannot drift.
- **`BreadcrumbList` matches the visible breadcrumb trail** on the page, in the same order.

Validate with the Rich Results Test and the Schema.org validator after any change to `src/lib/seo.ts`.

---

## What we never mark up

These are deliberate omissions, not oversights. Each would be a fabrication.

| Never emitted | Why |
| --- | --- |
| `aggregateRating` | No verified rating data exists. Inventing one is a manipulative-markup violation and a consumer-law problem. |
| `review` | No verified reviews exist yet. Reviews will only be marked up once real, attributable reviews are collected and visibly rendered. |
| `priceValidUntil` | We do not commit to a price expiry date. Prices are verified periodically, not guaranteed to a date. |
| Fake `availability` quantities or `inventoryLevel` | Availability is confirmed per booking on WhatsApp. |
| `PostalAddress` on `Organization` | No confirmed registered address. |
| Registration, licence, VAT or `taxID` values | Not confirmed by the owner. |
| `Event` markup for tours | Tours are recurring products, not dated events. `TouristTrip` is the correct type. |
| Discount, `priceSpecification` with a struck-through original, or countdown-style urgency | There are no discounts. The site shows the real price only. |

The same rule applies to visible copy: no invented ratings, review counts, awards, insurance claims or "X years in business" statements appear anywhere on the site.

---

## Titles and descriptions

Rules used by `SeoMeta.title` / `SeoMeta.description` in the content files:

- Title: primary query first, brand or qualifier after a pipe. Aim for roughly 50-60 characters so it is not truncated.
- Description: roughly 140-160 characters. State the concrete differentiators - price, hotel pickup, guide language where confirmed, and WhatsApp booking. No filler adjectives, no exclamation marks.
- Every title is unique across the site.
- The root layout uses `title.template: "%s"`, so page titles are used exactly as written in the content files. Any brand suffix must be written into the title itself; nothing is appended automatically.
- Prices in a description must match the price in the content model. When a price changes, the description changes in the same commit - see the re-verification procedure in [CONTENT_SOURCES.md](./CONTENT_SOURCES.md).

---

## Measurement

Because the site has no analytics platform configured by default (see [ANALYTICS.md](./ANALYTICS.md)), SEO measurement starts with Google Search Console, which needs no on-site script and sets no cookies.

Track per page:

- Impressions, clicks and average position for the primary query.
- Coverage and indexing status for all 18 routes.
- Core Web Vitals field data once traffic is sufficient.
- Rich-result eligibility for `TouristTrip`, `BreadcrumbList`, `FAQPage`.

Review cadence: monthly. Two signals justify a content change - a page ranking for a query owned by another page (cannibalization; fix the linking and the copy), and a tour page with impressions but no clicks (fix the title and description before touching the page body).
