import { GA_MEASUREMENT_ID } from "@/lib/ga";

/**
 * Google tag (GA4) loader with advanced Consent Mode - storage permanently
 * denied (cookieless). Rendered once in the root layout so it ships in every
 * statically exported page.
 *
 * Order is load-bearing:
 *  1. dataLayer + gtag stub are defined.
 *  2. `consent default` sets EVERY storage type to `denied` BEFORE gtag.js runs,
 *     and stays denied - there is no consent UI and no `consent update`. gtag
 *     therefore sends cookieless measurement pings (no _ga/_gid, no ad signals).
 *  3. `config` sends the initial page_view; Enhanced Measurement (enabled on the
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
  analytics_storage: 'denied'
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
