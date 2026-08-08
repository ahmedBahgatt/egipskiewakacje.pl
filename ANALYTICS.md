# Analytics

Analytics on egipskiewakacje.pl is a thin, privacy-first abstraction in `src/lib/analytics.ts`. It is a **true no-op by default**: with no platform configured, nothing is loaded, nothing is stored, no cookie is set and no request leaves the browser.

That is why the site currently ships **without a cookie banner**. The absence of the banner is a consequence of the absence of tracking, not an omission.

---

## Table of contents

- [Design principles](#design-principles)
- [Event model](#event-model)
- [Critical distinctions](#critical-distinctions)
- [The PII allow-list](#the-pii-allow-list)
- [No-op behaviour by default](#no-op-behaviour-by-default)
- [Enabling GA4 or GTM later](#enabling-ga4-or-gtm-later)
- [Consent and the cookie banner](#consent-and-the-cookie-banner)
- [Tests](#tests)
- [Adding a new event](#adding-a-new-event)

---

## Design principles

1. **Off by default.** No platform ID, no tracking, no cookies, no banner.
2. **PII cannot leak, even by mistake.** A strict allow-list of parameter keys is applied to every call. A careless caller passing a phone number or a hotel name simply has it dropped before dispatch.
3. **One conversion definition.** Only one event represents a booking intent, and it can only fire after validation has passed.
4. **No behaviour depends on analytics.** The tracker is fire-and-forget. Nothing in the UI waits on it, and disabling it changes nothing a visitor can see.
5. **Vendor-agnostic call sites.** Components call `track()`. Whether that reaches GA4, GTM or nothing at all is a single decision made in one file.

---

## Event model

Eight events, defined as a closed TypeScript union (`AnalyticsEvent`). A typo is a compile error, not a silently lost event.

| Event | Fires when | Allowed parameters | Conversion? |
| --- | --- | --- | --- |
| `destination_select` | A visitor picks a departure city - hero selector, destination card or navigation | `destination`, `source`, `position` | No |
| `tour_card_view` | A tour card becomes visible in the viewport | `tour_slug`, `destination`, `position`, `source` | No |
| `tour_details_click` | A visitor opens a tour detail page from a card or listing | `tour_slug`, `destination`, `source`, `position` | No |
| `whatsapp_floating_click` | The floating WhatsApp button is clicked | `source`, `tour_slug` (when on a tour page) | **No - contact, not booking** |
| `booking_form_start` | The visitor interacts with the booking form for the first time | `tour_slug`, `source` | No |
| `booking_form_validation_error` | Submit is attempted and validation fails | `error_field` (the field **name** only), `tour_slug` | **No - a failure, not a conversion** |
| `booking_form_valid` | Validation passes | `tour_slug`, `value` (public list price) | Micro-conversion at most |
| `booking_whatsapp_open` | The WhatsApp deep link is actually opened after a valid submit | `tour_slug`, `destination`, `value`, `source` | **Yes - the single conversion** |

Every parameter above is drawn from the allow-list. No event carries anything else, whatever the caller passes.

---

## Critical distinctions

These three rules are the reason the event model is worth having. Getting them wrong produces numbers that look good and are worthless.

**1. `whatsapp_floating_click` is not a booking.**
The floating button is a general contact affordance. It opens WhatsApp with no booking payload. People click it to ask about a hotel transfer, a date or a price. Counting it as a conversion would inflate the conversion rate with pure curiosity traffic and would make every optimization decision downstream wrong. If it is ever imported into an ad platform, it must be imported as a **secondary** action, never as the primary conversion.

**2. `booking_form_validation_error` is not a conversion.**
It is a usability signal - a page where one field fails repeatedly is a page with a form problem. Only the field **name** is sent (`error_field: "hotel"`), never the value the visitor typed. A spike in a single `error_field` is an instruction to fix the field, not a marketing metric.

**3. `booking_whatsapp_open` fires only after validation passes.**
It is emitted at the moment the `wa.me` link is opened, and only on the path where `validateBooking()` returned `valid: true`. It cannot fire on a failed submit, on a page view, or on a click that did not result in the deep link opening. This is the one event to configure as the conversion in GA4 or an ad platform.

The ordering that a healthy funnel produces:

```
destination_select -> tour_card_view -> tour_details_click
   -> booking_form_start -> [booking_form_validation_error]*
   -> booking_form_valid -> booking_whatsapp_open   <- conversion
```

`whatsapp_floating_click` sits outside this funnel entirely.

---

## The PII allow-list

`src/lib/analytics.ts` defines exactly six permitted parameter keys:

| Key | Type | Meaning |
| --- | --- | --- |
| `tour_slug` | string | Public tour identifier, e.g. `kair-piramidy-muzeum-egipskie` |
| `destination` | string | `hurghada` / `marsa-alam` / `sharm-el-sheikh` |
| `source` | string | Where the interaction happened, e.g. `hero`, `card`, `footer`, `sticky` |
| `position` | number | Index within a list, for ordering analysis |
| `value` | number | Non-PII numeric context, e.g. a public list price |
| `error_field` | string | The **name** of the field that failed validation |

`sanitize()` iterates the allow-list, not the caller's object. Anything not on the list never reaches the output, and values that are not a `string` or `number` are rejected outright - so an object or array cannot be smuggled through a permitted key.

**Never sent, under any circumstance:**

| Category | Examples |
| --- | --- |
| Identity | name, surname |
| Contact | phone number, email, WhatsApp handle |
| Location | hotel name, room number, pickup address |
| Free text | booking notes, message body |
| Trip specifics | travel date, number of adults, number of children, children's ages |
| Anything derived | full booking message, prefilled `wa.me` URL with its `text` payload |

Two of these deserve emphasis:

- **Children's ages are collected by the booking form and are never tracked.** They are personal data about minors. They exist only in the WhatsApp message the visitor sends themselves.
- **The prefilled WhatsApp URL must never be used as an event parameter or a page path.** It contains the entire booking message, including the name and hotel.

The booking message is assembled in `src/lib/whatsapp.ts` and handed straight to `wa.me`. It never passes through `track()`.

---

## No-op behaviour by default

```ts
function platformConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GA4_ID || process.env.NEXT_PUBLIC_GTM_ID);
}
```

With both variables empty - the shipped state - `track()`:

- returns immediately on the server (`typeof window === "undefined"`),
- in the browser, sanitises the parameters and then returns without dispatching,
- in development only, writes a `console.debug("[analytics:noop]", …)` line so a developer can see the event flow. Nothing is logged in a production build.

Consequences of the default state:

- No analytics script is downloaded.
- No cookie or `localStorage` entry is created.
- No request is made to any third party.
- No cookie banner is required, and none is shown.
- The cookie policy page can honestly state that the site sets no analytics cookies.

Because the site is a static export with no server, there are also no server-side access logs under our control and no server-side tracking of any kind.

---

## Enabling GA4 or GTM later

Setting an ID is **not** sufficient and must not be done as a quick change. The order below is mandatory; step 2 must be complete before step 1 takes effect in production.

### Step 1 - configure the platform ID

Set exactly one of these (in `.env.local` for a local test, or in the deployment workflow env for production):

```bash
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
# or
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Both are `NEXT_PUBLIC_*` and are therefore inlined into the published static files. They are public identifiers, not secrets - which is exactly why nothing sensitive may ever use that prefix.

### Step 2 - implement consent first

Non-essential tracking requires prior, informed, freely given consent under GDPR and the Polish implementation of the ePrivacy rules, and Google Consent Mode v2 is required for EEA traffic in GA4 and Google Ads. Therefore:

1. Add a consent state module: default `denied` for `analytics_storage` and `ad_storage`, persisted only after a choice is made.
2. Push the default consent state **before** any tag loads.
3. Only load the GA4 or GTM script after consent is granted.
4. Provide an equally prominent "Reject" control. A banner with only "Accept" is not valid consent.
5. Provide a way to withdraw consent later, linked from `/polityka-cookies/`.

### Step 3 - add the loader

Add the script through `next/script` with `strategy="afterInteractive"`, rendered only when consent has been granted and an ID is present. Initialise `window.dataLayer` before the script runs. `track()` already dispatches to `window.dataLayer` when it exists and falls back to `window.gtag`, so no call site changes.

### Step 4 - add the cookie banner and update the policies

The banner is added **with** the tracking, in the same change. Update `/polityka-cookies/` to list the actual cookies (name, purpose, duration, controller) and `/polityka-prywatnosci/` to name the processor and the legal basis. Neither page may describe cookies the site does not set - which is why they currently do not.

### Step 5 - configure the conversion, once

In GA4, mark **`booking_whatsapp_open`** as the key event. Do not mark `whatsapp_floating_click`, `booking_form_valid` or `booking_form_validation_error`. If the events are later imported into Google Ads, import `booking_whatsapp_open` as the primary conversion and, at most, `whatsapp_floating_click` as a secondary one.

### Step 6 - verify no PII is transmitted

Before considering the rollout done, open DevTools -> Network, complete a full booking with a realistic name, hotel and children's ages, and inspect every outgoing analytics request. The payloads must contain only allow-listed keys. If any personal value appears, stop and fix the caller - the sanitiser is the safety net, not the design.

Also enable the platform's own protections: IP anonymisation, disabled Google Signals unless separately justified, and the shortest workable data-retention window.

---

## Consent and the cookie banner

| State | Cookies set | Banner shown |
| --- | --- | --- |
| **Today** - no `NEXT_PUBLIC_GA4_ID`, no `NEXT_PUBLIC_GTM_ID` | None | No - and none is required |
| After enabling a platform without consent | Would be set on load | **Not permitted.** Do not ship this state |
| After enabling a platform with consent implemented | Only after the visitor accepts | Yes, with an equally prominent reject option |

Do not add a cookie banner while the site sets no cookies. A banner that asks for consent to nothing trains visitors to click through consent dialogs and adds a conversion-killing interstitial for zero benefit.

---

## Tests

`tests/unit/analytics.test.ts` covers the sanitiser directly through `__analyticsInternals`, which is exported for exactly this purpose. It asserts that:

- allow-listed keys survive,
- every other key is dropped,
- non-primitive values (objects, arrays) are rejected even under an allow-listed key,
- `undefined` and `null` are omitted rather than forwarded.

Any change to `ALLOWED_KEYS` must be accompanied by a test change. Treat the allow-list as a security boundary, because that is what it is.

---

## Adding a new event

1. Add the name to the `AnalyticsEvent` union in `src/lib/analytics.ts`. The union is closed on purpose - this is the review gate.
2. Reuse existing allow-listed keys. Adding a key requires justifying that it can never carry personal data, in this document and in the test.
3. Decide explicitly whether the event is a conversion. Default: no. Only `booking_whatsapp_open` is.
4. Add or extend the unit test.
5. Add the event to the [Event model](#event-model) table above, including its firing condition.
6. If the event could ever be triggered by content a visitor typed, stop and redesign it.
