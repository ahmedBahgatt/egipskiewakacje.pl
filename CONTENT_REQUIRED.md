# Content required from the owner

Items that only the business owner can supply or confirm. Every item below is **OPEN**.

The site is deliberately built so that none of these blocks a launch: where a fact is unconfirmed, the site says nothing rather than guessing. That is the rule to preserve while these items are resolved - **do not fill any of them in from assumption, from a related site, or from a plausible-looking default.**

Status legend: **OPEN** - not yet supplied or confirmed.

---

## Summary

| # | Item | Blocks | Status |
| --- | --- | --- | --- |
| 1 | Legal entity identity | Privacy policy, terms, full legal compliance | **OPEN** |
| 2 | Business email address | Contact page, privacy policy contact route | **OPEN** |
| 3 | Sharm el Sheikh guide language | Tour page accuracy | **OPEN** |
| 4 | Real owned photographs and video | Replacing generated artwork | **OPEN** |
| 5 | Verified customer reviews | Any reviews section, any review markup | **OPEN** |
| 6 | Awards, insurance, years in business | Trust claims (none currently made) | **OPEN** |
| 7 | Payment and cancellation terms in writing | Terms page precision | **OPEN** |
| 8 | Analytics and consent decision | Whether to enable tracking at all | **OPEN** |

---

## 1. Full legal entity identity - **OPEN**

Needed for `/polityka-prywatnosci/` (the data controller must be identified) and `/regulamin/` (the contracting party must be identified).

Required:

- Registered legal name of the entity that sells and operates the tours.
- Registered address (street, city, postal code, country).
- Polish registration identifiers if a Polish entity is involved: **NIP**, and **KRS** or CEIDG entry as applicable.
- Egyptian tour operator **licence number** and the issuing authority, if the operating entity is Egyptian.
- Which entity is the **data controller** for booking data, and which entities receive it.
- Whether the business is registered in the Polish tourism register (Rejestr Organizatorów Turystyki i Przedsiębiorców Ułatwiających Nabywanie Powiązanych Usług Turystycznych) and, if so, the entry number and the guarantee/insurance details.

Current state: the privacy policy and terms are written generically and identify no registered entity, no address and no registration number. `Organization` structured data deliberately omits `PostalAddress` and any registration identifier - see [SEO_PLAN.md](./SEO_PLAN.md).

Risk while OPEN: a Polish consumer-facing site with no identified seller is exposed under Polish consumer-protection and e-commerce disclosure rules, and under GDPR Art. 13 the controller must be identified to the data subject. This is the highest-priority item on the list.

Action when supplied: update `src/content/local/legal.ts` (privacy policy and terms bodies), add the identity block to the footer and `/kontakt/`, and only then consider adding `PostalAddress` to the `Organization` JSON-LD in `src/lib/seo.ts`.

---

## 2. Real business email address - **OPEN**

Required: one working, monitored mailbox for reservations and one route for privacy or data-subject requests (they may be the same address).

Current state: **no email address is displayed anywhere on the site.** Contact runs entirely through WhatsApp on `+20 105 585 0536` (`wa.me/201055850536`).

Two things must not happen:

- **Do not publish an `@egipskiewakacje.pl` address that has not been configured.** An address on the site that bounces is worse than no address: it loses enquiries silently and reads as an abandoned business.
- **Do not publish `info@sekretyegiptu.pl` or any other Sekrety Egiptu address without the owner's explicit approval.** Sekrety Egiptu is not mentioned on this site, and surfacing its address would connect the two brands publicly - see [CONTENT_SOURCES.md](./CONTENT_SOURCES.md).

Action when supplied: confirm the mailbox receives mail, then add it to `/kontakt/`, the footer, and the privacy policy as the data-subject contact route.

---

## 3. Sharm el Sheikh guide language - **OPEN**

The source material for the Sharm el Sheikh -> Cairo tour is internally contradictory: one place states the guide speaks Polish, another states English. See [CONTENT_SOURCES.md](./CONTENT_SOURCES.md) for the full record.

Required: a definitive answer from the operator - is a Polish-speaking guide provided on this route, always, sometimes, or never?

Current state: the site does not claim a Polish guide for this tour. It states that the guide's language is confirmed before booking (`guide: { label: "Potwierdzamy przed rezerwacją", polishConfirmed: false }` in `src/content/local/tours.ts`), and the tour FAQ says the same. The site never claims that all guides are Polish-speaking.

Action when confirmed:

- If Polish is guaranteed: set `polishConfirmed: true` and `label: "Polski"`, and rewrite the tour FAQ answer.
- If English only: keep `polishConfirmed: false` and state the language plainly rather than deferring it.
- If it varies: keep the current honest wording and add the condition that determines it.

Risk while OPEN: none created by the site, because no claim is made. The risk would be created by guessing.

---

## 4. Real owned photographs and video - **OPEN**

Required: photographs and video the owner holds the rights to, showing the actual tours - the coach, the pickup, the Giza plateau, the Egyptian Museum, GEM, Old Cairo, the lunch stop, the Nile cruise option.

Current state: **every image on the site is original code-generated vector artwork**, and the hero video is an owned ffmpeg render of that artwork. No photographs, no stock, no people, no third-party footage, no hotlinking - see [ASSET_SOURCES.md](./ASSET_SOURCES.md). This is a license-clean placeholder, not a permanent design decision.

Requirements for any supplied media:

- The owner must hold the rights, or have a licence that permits commercial web use.
- Any recognisable person requires a signed model release. Do not publish photographs of customers without written permission.
- Minimum useful resolution: 2000 px on the long edge, so the generated 1600 px and 1200 px variants are downscales rather than upscales.
- Supply originals, not screenshots and not files already compressed for social media.

Action when supplied: process through the media pipeline so the same AVIF/WebP/JPG triples land at the same base paths, then **rewrite every `alt` string** in `src/content/local/*` - alt text describing an illustration is wrong once a photograph replaces it. Re-measure the media budget in [ASSET_SOURCES.md](./ASSET_SOURCES.md) and update the provenance statement there.

---

## 5. Verified customer reviews - **OPEN**

Required: real reviews with the reviewer's name (or an agreed initial form), the date, the tour, and permission to publish.

Current state: **no reviews section is rendered and no review data is published.** The content model has a `Review` type with a `verified` flag, and the content adapter filters to `verified: true` only, so an unverified entry cannot reach the page even if it is added to the data file. No `aggregateRating` and no `review` structured data is emitted anywhere - see [SEO_PLAN.md](./SEO_PLAN.md).

Rules that stay in force:

- No invented reviews, no invented ratings, no invented review counts, no "4.9/5 based on 200 opinii".
- No review markup without the review being visibly rendered on the same page.
- No importing reviews from another site or brand without the reviewer's consent.

Action when supplied: add to the reviews collection with `verified: true`, build the visible section, and only then add `review` / `aggregateRating` markup - in that order, never the reverse.

---

## 6. Awards, insurance and years-in-business claims - **OPEN**

Required, if any are to be claimed: the award name and year with evidence; the insurer, policy type and cover; the year the business started operating; any certification or membership.

Current state: **the site makes none of these claims.** There is no "since 20XX", no award badge, no "insured" statement and no membership logo. `/o-nas/` is written without them.

Rule: each claim is published only with evidence, and only in the form the evidence supports. "Ubezpieczenie" without a named insurer and cover is not a usable claim.

---

## 7. Payment and cancellation terms in writing - **OPEN**

Required: how payment is actually taken (cash on the day, currency accepted, whether a deposit is ever requested), the cancellation window and any fee, what happens if the operator cancels, and what happens if a visitor misses the pickup.

Current state: each tour states that the reservation is provisional until confirmed on WhatsApp, that availability, pickup time and final price are agreed there, and that **no payment is taken online**. The terms page is written to that same level of generality.

Action when supplied: tighten `cancellationPolicy` per tour in `src/content/local/tours.ts` and the corresponding section of `/regulamin/`. Do not add a cancellation deadline or a refund percentage that the owner has not stated.

---

## 8. Analytics and consent decision - **OPEN**

Required: a decision on whether to run analytics at all, and if so, which platform.

Current state: analytics is a **true no-op**. No GA4 or GTM ID is configured, so no script loads, no cookie is set, no data leaves the browser, and the site correctly shows **no cookie banner**. See [ANALYTICS.md](./ANALYTICS.md).

If the owner wants analytics, the sequence is fixed: implement consent first (default denied, equally prominent reject, withdrawal route), then load the tag, then add the banner, then update `/polityka-cookies/` and `/polityka-prywatnosci/` to describe the cookies that are actually set. Setting an environment variable alone is not a valid rollout.

---

## Working rules while items are open

1. **Silence beats a guess.** An unconfirmed fact is omitted, not approximated.
2. **No placeholder that looks real.** No `info@`, no `ul. Przykładowa 1`, no `NIP: 000-000-00-00`, no sample review. A convincing placeholder eventually ships.
3. **No claim without evidence** - awards, insurance, ratings, years in business, guide languages.
4. **Structured data never says more than the visible page.** If it is not on the page, it is not in the JSON-LD.
5. **Record the answer where the code reads it, not only here.** Prices carry `lastVerifiedAt`; the guide flag is `polishConfirmed`; reviews carry `verified`. Update the data, then update this file.

When an item is resolved, change its status here from **OPEN** to **CONFIRMED (date, source)** and update the linked documents in the same change.

---

## CMS activation - single owner action required (added 2026-08-09)

All code for a real Sanity-backed CMS is in place (full read adapter, native image
assets, richer blog blocks, build-time validation, CI wired to repo variables).
The remaining steps need a **Sanity Editor token**, which only the account owner can
create. They cannot be automated from here.

To go live on the CMS (steps detailed in SANITY_SETUP.md):

1. Create an **Editor token** at https://www.sanity.io/manage (project `ej04dib0`).
2. From `studio/`, run `SANITY_WRITE_TOKEN=<token> npm run seed` - deploys schema,
   uploads images as Sanity assets, and seeds the three destinations, three tours,
   the article, site FAQs, legal pages and author (deterministic IDs, idempotent).
3. Add CORS origins in Sanity manage: `https://egipskiewakacje.pl` and
   `http://localhost:3000`.
4. Create a fine-grained GitHub PAT (contents:read + metadata) and a Sanity webhook
   that POSTs `repository_dispatch` (event type `sanity-publish`) on publish.
5. Flip the GitHub repo **variable** `NEXT_PUBLIC_CONTENT_SOURCE` from `local` to
   `sanity` (Settings -> Secrets and variables -> Actions -> Variables). No code
   change is needed - the workflow already reads this variable.

Until step 5, production intentionally stays in local mode (identical content),
because a `sanity`-mode build against an unseeded dataset fails fast by design
rather than shipping stale data.

## Legal / business information still required from the owner

- Registered operator/legal entity name.
- Registered address.
- Registration numbers (NIP / KRS or local equivalent).
- Egyptian tour-operator licence details, if applicable.
- An official business email (currently none is shown; contact is WhatsApp only).
- Confirmation of the Sharm el Sheikh guide language (source is contradictory; the
  site honestly says "potwierdzamy przed rezerwacją").
- Real owned photos/video to replace the original generated artwork.
- Any verified customer reviews before an Opinie section is enabled.
