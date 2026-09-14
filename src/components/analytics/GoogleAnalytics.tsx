import { GA_MEASUREMENT_ID, CONSENT_STORAGE_KEY } from "@/lib/ga";

/**
 * Google tag (GA4) loader with Consent Mode v2. Rendered once in the root
 * layout so it ships in every statically exported page.
 *
 * Order is load-bearing:
 *  1. dataLayer + gtag stub are defined.
 *  2. `consent default` sets EVERY storage type to `denied` BEFORE gtag.js runs.
 *  3. A previously stored `granted` choice is restored via `consent update`
 *     (analytics_storage only) so returning visitors are not re-prompted and
 *     analytics resumes without a page reload.
 *  4. `config` sends the initial page_view; Enhanced Measurement (enabled on the
 *     stream) owns client-side History navigations - no custom route tracker,
 *     so exactly one logical page_view fires per page state.
 *
 * The inline script runs synchronously in document order (before the async
 * gtag.js executes), which is what guarantees the consent default is registered
 * first. gtag.js is `async` so it never blocks rendering.
 */

const BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
try {
  if (localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
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
