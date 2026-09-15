import { GA_MEASUREMENT_ID } from "@/lib/ga";

/**
 * Google tag (GA4) loader with REGION-SCOPED advanced Consent Mode. Rendered
 * once in the root layout so it ships in every statically exported page.
 *
 * Consent model (matches the audited Sekrety Egiptu behaviour, single GA4):
 *  - The `consent default` denies every storage type ONLY for the EEA + UK +
 *    related European region below (via the Consent Mode `region` field). There
 *    is no consent UI and no `consent update`, so in-region visitors stay denied
 *    and GA4 sends cookieless pings (no _ga/_gid, no ad signals).
 *  - Visitors OUTSIDE that region are not covered by the denied default, so
 *    consent is unset - Google tags treat that as granted, and GA4 runs normally
 *    with analytics cookies (_ga/_ga_*) and full client-side measurement.
 *
 * Order is load-bearing:
 *  1. dataLayer + gtag stub are defined.
 *  2. the region-scoped `consent default` is registered BEFORE gtag.js runs.
 *  3. `config` sends the initial page_view; Enhanced Measurement owns client-side
 *     History navigations - no custom route tracker, so exactly one logical
 *     page_view fires per page state.
 *
 * The inline script runs synchronously in document order (before the async
 * gtag.js executes), which guarantees the consent default is registered first.
 * gtag.js is `async` so it never blocks rendering.
 */

/**
 * ISO-3166-1 alpha-2 regions where storage is denied by default: the EEA, the
 * United Kingdom, and the related European states (Switzerland, Norway, Iceland,
 * Liechtenstein). This is the exact list verified live on Sekrety Egiptu.
 */
const DENIED_REGION = [
  "AT", "BE", "BG", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB",
  "GR", "HR", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MT", "NL", "NO",
  "PL", "PT", "RO", "SE", "SI", "SK",
];

const BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  region: ${JSON.stringify(DENIED_REGION)}
});
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`.trim();

export function GoogleAnalytics() {
  return (
    <>
      <script id="ga-consent-bootstrap" dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
    </>
  );
}
