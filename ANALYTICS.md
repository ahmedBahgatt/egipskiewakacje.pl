# Analytics

egipskiewakacje.pl runs **one** GA4 installation (`G-TH6P4SF2SN`) under
**advanced Google Consent Mode with storage permanently denied** (cookieless).
The whole layer is small, vendor-owned in a few files, and cannot forward PII.

There is **no consent banner and no visitor decision**: the tag loads, consent
defaults are set to `denied` for every storage type and never change, so GA4
receives cookieless measurement pings only - no `_ga`/`_gid` and no advertising
cookies. The Measurement ID is public configuration, not a secret.

## Files

| File | Role |
| --- | --- |
| `src/lib/ga.ts` | Measurement ID |
| `src/components/analytics/GoogleAnalytics.tsx` | Server component: consent-default (all denied) bootstrap + async `gtag.js`, rendered once in the root layout |
| `src/components/analytics/AnalyticsRuntime.tsx` | Client runtime: the delegated click listener that fires all business events (no UI) |
| `src/lib/analytics.ts` | `track()` + `pageContext()` + the PII allow-list |

## Consent Mode (permanently denied, cookieless)

The bootstrap runs before `gtag.js` and sets **every** storage type to `denied`,
and nothing ever updates it:

```
ad_storage, ad_user_data, ad_personalization, analytics_storage = denied
```

This is advanced Consent Mode: the tag still loads and sends cookieless pings,
but sets no analytics/ad cookies and stores no identifiers. Cookieless
measurement is **not** identical to full-consent cookie tracking - attribution
and audience features are limited by design. WhatsApp, booking and navigation
work identically regardless; tracking is never required to book.

## Page views

GA4 config (`send_page_view` default) fires the initial page view; **Enhanced
Measurement** (enabled on the stream) owns client-side History navigations.
There is **no custom Next.js route tracker**, so exactly one logical `page_view`
fires per page state and there is nothing to double-count.

## Event model

`track()` auto-injects safe route context (`page_path` = pathname only,
`page_type`, and on tour/destination routes `tour_slug` + `destination`);
explicit params win. Events:

| Event | Fires when | Conversion role |
| --- | --- | --- |
| `cta_click` | Any annotated business CTA is clicked | No |
| `whatsapp_click` | Any handoff toward WhatsApp (`whatsapp_intent`: enquiry \| booking) | Secondary (micro) |
| `tour_card_click` | A tour card is selected | No |
| `booking_open` | The mobile booking sheet opens | Funnel |
| `generate_lead` | The booking form passes validation and opens the WhatsApp booking enquiry | **Primary lead (Key Event)** |
| `phone_click` / `email_click` | `tel:` / `mailto:` clicked | No (no such links today) |

`generate_lead` fires **once**, only on the valid final handoff - never on form
open, validation failure, or close. It records that the visitor completed the
website booking enquiry flow; it does **not** prove the WhatsApp message was
sent. Do not assign it revenue (a booking enquiry is not a paid sale).

### Ownership (no duplicates)

A single delegated document click listener (`AnalyticsRuntime`) owns
`cta_click`, `whatsapp_click`, `tour_card_click`, `phone_click`, `email_click`
for every annotated anchor/button site-wide. It reads **only** `data-*`
attributes - never the `href` - so a prefilled WhatsApp message or booking URL
can never reach GA4. Annotate CTAs with `<Button analytics={{…}}>` or raw
`data-cta-id` / `data-card` attributes. Programmatic handoffs (the booking form's
`window.open`) call `track()` directly, so nothing double-fires.

## The PII allow-list

`sanitize()` in `src/lib/analytics.ts` keeps only these primitive keys and drops
everything else: `page_path, page_type, tour_slug, destination, placement,
cta_id, cta_type, whatsapp_intent, lead_source`.

Never sent, under any circumstance: name, phone, email, hotel, notes, travel
date, adults/children counts, the booking message, any `wa.me` URL with a `text`
payload, `link_url`, or any query string. `page_path` is the pathname only.

## GA4 account

`generate_lead` is the Key Event. Optionally add `whatsapp_click` as a secondary
Key Event. Do not mark ordinary `cta_click` as a conversion.

## Tests

`tests/unit/analytics.test.ts` asserts the allow-list drops PII (including
`link_url`) and that `pageContext()` classifies routes correctly.
