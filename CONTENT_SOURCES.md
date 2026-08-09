# Content sources and fact verification

This document records where the **operational facts** on egipskiewakacje.pl came from, when each price was verified, and how ambiguities were resolved.

**Verification date for every price and operational fact below: 2026-08-08.**

---

## Summary

- The source of truth is **sekretyegiptu.pl**, operated by the same owner as Egipskie Wakacje. Reuse was authorized by the owner.
- Only **operational facts** (prices, availability, durations, pickup windows, transport, inclusions/exclusions, transfer supplements) and **owned assets** were authorized for reuse.
- **All public copy on egipskiewakacje.pl was written from scratch.** No paragraph was copied, and no paragraph was paraphrased sentence-by-sentence from the source. Page titles, meta descriptions, headings, layout and CSS are original.
- **Sekrety Egiptu is not mentioned anywhere on the new site.** The two sites are presented independently.
- Facts are mirrored in the typed content files under `src/content/local/`, each carrying a `lastVerifiedAt` field so staleness is visible in the data itself.

---

## Source URLs

| Ref | Tour | Source page |
| --- | --- | --- |
| A | Hurghada -> Cairo | `https://sekretyegiptu.pl` - Hurghada to Cairo day-trip page |
| B | Marsa Alam -> Cairo + Old Cairo | `https://sekretyegiptu.pl` - Marsa Alam to Cairo day-trip page |
| C | Sharm el Sheikh -> Cairo + GEM | `https://sekretyegiptu.pl` - Sharm el Sheikh to Cairo day-trip page |

All three were read live on **2026-08-08**. Prices below are the exact values published on that date.

---

## Facts reused per tour

### A. Hurghada -> Cairo (Egyptian Museum, Pyramids, Sphinx)

Site route: `/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/`
Content file: `src/content/local/tours.ts`, slug `kair-piramidy-muzeum-egipskie`

| Fact | Value used on the site | Verified |
| --- | --- | --- |
| Adult price | 60 USD | 2026-08-08 |
| Child price (5-11) | 30 USD | 2026-08-08 |
| Infants (under 5) | Free | 2026-08-08 |
| Availability | Daily | 2026-08-08 |
| Duration | approx. 20-22 hours | 2026-08-08 |
| Pickup window | approx. 00:00-02:00 | 2026-08-08 |
| Transport | Air-conditioned coach, hotel pickup and drop-off | 2026-08-08 |
| Guide language | Polish - **confirmed** by the source | 2026-08-08 |
| Transfer supplement | Safaga, Soma Bay, Abu Soma, El Gouna: +10 USD | 2026-08-08 |
| Transfer supplement | Makadi Bay: +5 USD | 2026-08-08 |
| Transfer supplement | Sahl Hasheesh: +5 USD | 2026-08-08 |
| Included / excluded items | Reused as a factual list (own wording) | 2026-08-08 |
| Optional extras | Nile cruise, pyramid interior ticket - paid on site | 2026-08-08 |

`price.variable` is `true`, so the site renders "Cena od 60 USD": the final amount depends on the transfer zone and any optional extras. This is an accuracy measure, not a marketing device.

### B. Marsa Alam -> Cairo + Old Cairo

Site route: `/wycieczki-z-marsa-alam/kair-stary-kair-piramidy/`
Content file: `src/content/local/tours.ts`, slug `kair-stary-kair-piramidy`

| Fact | Value used on the site | Verified |
| --- | --- | --- |
| Adult price | 80 USD | 2026-08-08 |
| Child price (5-11) | 40 USD | 2026-08-08 |
| Infants (under 5) | Free | 2026-08-08 |
| Availability | Tuesdays | 2026-08-08 |
| Transport | Minibus/car transfer from Marsa Alam to Hurghada, then air-conditioned coach to Cairo | 2026-08-08 |
| Guide language | Polish - **confirmed** by the source | 2026-08-08 |
| Programme | Old Cairo (Hanging Church, St Sergius, Amr ibn al-As Mosque, Ben Ezra Synagogue) + Giza plateau and Sphinx | 2026-08-08 |
| Time at Giza | approx. 1.5 hours | 2026-08-08 |
| Transfer supplement | +10 USD for a listed set of distant hotels (Wadi Lahmy Azur, Lahami Bay, Shams Alam, Gorgonia, Fantazia, Sirena Beach, Reef Oasis, Sunrise Anjum, Gemma Resort, Blue Lagoon, Dream Lagoon, Emerald Lagoon, True Beach, Aurora Bay) | 2026-08-08 |
| Included / excluded items | Reused as a factual list (own wording) | 2026-08-08 |
| Optional extras | Nile cruise - paid on site | 2026-08-08 |

The hotel list is reproduced verbatim because it is a factual enumeration of proper nouns; there is no expressive content in a list of hotel names.

### C. Sharm el Sheikh -> Cairo + Grand Egyptian Museum (GEM)

Site route: `/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy/`
Content file: `src/content/local/tours.ts`, slug `kair-gem-piramidy`

| Fact | Value used on the site | Verified |
| --- | --- | --- |
| Adult price | 93 USD | 2026-08-08 |
| Child price (5-11) | 60 USD | 2026-08-08 |
| Infants (under 5) | Free | 2026-08-08 |
| Availability | Daily, subject to availability | 2026-08-08 |
| Pickup window | approx. 00:00-02:00 | 2026-08-08 |
| Return | approx. 22:00-23:00 | 2026-08-08 |
| Transport | Air-conditioned coach, Sharm el Sheikh to Cairo and back | 2026-08-08 |
| Guide language | **Conflicting on the source** - see below | 2026-08-08 |
| Programme | Grand Egyptian Museum (GEM) + Giza plateau and Sphinx | 2026-08-08 |
| Transfer supplements | None listed | 2026-08-08 |
| Included / excluded items | Reused as a factual list (own wording) | 2026-08-08 |
| Optional extras | Nile cruise - paid on site | 2026-08-08 |

---

## The Sharm el Sheikh guide-language conflict

**The problem.** The source page for tour C is internally inconsistent about the guide's language: one section states the guide speaks Polish, another states the guide speaks English. Both statements appear on the same page. There is no way to tell from the page which is current.

**Why it matters.** "Polish-speaking guide" is the single most decision-relevant claim for a Polish tourist choosing a day trip. Publishing it wrongly would be a misleading commercial claim, would generate complaints on arrival, and would damage trust in the whole site.

**How it was handled.** The site does not guess and does not average the two statements. It states honestly that the guide's language is confirmed before booking:

- Content model: `guide: { label: "Potwierdzamy przed rezerwacją", polishConfirmed: false }` in `src/content/local/tours.ts`.
- On-page FAQ answer: the guide's language for this route is confirmed before booking, while the entire reservation conversation is handled in Polish.
- Cancellation/booking note for this tour explicitly lists guide language among the things confirmed on WhatsApp.

**What the site never does.** It never claims that all guides are Polish-speaking. The `polishConfirmed` flag is `true` only for tours A and B, where the source is unambiguous, and any UI that renders a "Polish guide" badge is driven by that flag rather than by free text.

**Resolution owner.** This is an open item for the owner - see [CONTENT_REQUIRED.md](./CONTENT_REQUIRED.md). Once the operator confirms the actual arrangement, set `polishConfirmed` accordingly and update the tour FAQ.

---

## What was and was not reused

### Reused (authorized)

- Numeric and operational facts: prices, child age brackets, infant policy, operating days, duration, pickup and return windows, transport type, time on site, transfer supplements and their amounts.
- Factual enumerations: which monuments are on the itinerary, which hotels carry a supplement, what is included and excluded.
- Owned assets belonging to the same owner, where any were used. In practice the launch site uses **none** of them: every image and the hero video are original code-generated artwork produced for this project - see [ASSET_SOURCES.md](./ASSET_SOURCES.md).

### Not reused

- No paragraph, sentence or headline was copied.
- No text was paraphrased line-by-line from the source. Descriptions, itinerary step text, FAQ answers, "what to bring" lists and all long-form copy were written from scratch for this site.
- No page titles, meta descriptions or OG copy were copied.
- No layout, component structure, class names or CSS were copied. The design system, components and styles are original.
- No third-party review text, rating or testimonial was carried over.

---

## Accuracy rules that follow from these sources

1. **Every price carries a verification date.** `PriceTier.lastVerifiedAt` is part of the type, so a stale price is visible in the data rather than hidden in prose.
2. **Variable pricing is labelled.** Where transfers or extras can change the total, the tour is marked `variable: true` and rendered as "Cena od".
3. **No invented urgency or social proof.** No fake discounts, no crossed-out "old" prices, no countdown timers, no invented ratings, no invented review counts, no "bestseller" badges.
4. **Ambiguity is disclosed, not resolved by guessing.** The Sharm guide-language conflict is the worked example of this rule.
5. **Nothing is claimed that cannot be evidenced.** No awards, no years in business, no insurance or licence claims appear anywhere on the site - see [CONTENT_REQUIRED.md](./CONTENT_REQUIRED.md).

---

## Re-verification procedure

Prices and schedules change. To re-verify:

1. Open the three source pages and read the current adult price, child price, operating days and transfer supplements.
2. For each changed value, update `src/content/local/tours.ts`:
   - the `price` field,
   - `price.lastVerifiedAt` and the tour's `updatedAt` (both use the `VERIFIED` constant at the top of the file when the whole set is re-checked on one day),
   - any price repeated inside that tour's `faqs` or `seo.description`,
   - `transferSupplements` if the zones or amounts moved.
3. Re-check the guide-language flag for each tour.
4. Run `npm run verify`, then `npm run build`.
5. Merge to `main` - the deployment is automatic. See [DEPLOYMENT.md](./DEPLOYMENT.md).

Even when nothing changed, bump `lastVerifiedAt` so the record reflects the date the check actually happened.

---

## Full-inventory build (2026-08-09)

A complete READ-ONLY crawl of the operator's own site (sekretyegiptu.pl) was run
via its Rank Math `tour-sitemap.xml` (107 tour pages). For every page the current
operational facts were extracted: current selling price, availability, duration,
pickup/transfer, transport, included/excluded, programme and guide language.

- 81 unique active tours implemented (Hurghada 41, Marsa Alam 23, Sharm 17).
- 26 source pages excluded: 16 duplicate/consolidated, 2 generic doorway
  (`/tour/kair-samolotem/`, `/tour/kair-autokarem/`), 8 wellness/shopping
  (spa/hammam/massage/shopping) excluded per owner instruction. See TOUR_INVENTORY.md.
- Prices are the CURRENT selling price. Where the source shows a struck
  "Cena promocyjna A B", the active price B was used and A was NOT reproduced
  (no fabricated reference price). Diving-course prices kept in EUR.
- Guide language: "Polski" (polishConfirmed) only for the operator's Cairo/Luxor
  coach product line from Hurghada & Marsa Alam; all other tours (sea/safari/
  diving/Sinai/Sharm Cairo) use the cautious "Potwierdzamy przed rezerwacją".
- Public copy was written fresh from factual notes. An automated 6-gram overlap
  check against each source page found 0 tours above 10% overlap (only proper
  nouns and unavoidable operational terms overlap). No source paragraphs, headings,
  metadata, FAQs, countdowns, voucher codes or reviews were reproduced.
