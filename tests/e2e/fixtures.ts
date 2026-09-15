import { test as base, expect } from "@playwright/test";

/**
 * TEST-ONLY safeguard against polluting the real GA4 property (G-TH6P4SF2SN).
 *
 * The exported site bakes in the production Google tag, and CI/test browsers run
 * OUTSIDE the EEA denied region, so every fresh Playwright context would be
 * counted as a real visitor in GA4 (first_visit / session_start / page_view plus
 * synthetic whatsapp_click / cta_click / tour_card_click / generate_lead).
 *
 * This fixture aborts every outbound request to Google's tag loader and analytics
 * collection endpoints on the browser CONTEXT, as an `auto` fixture - so it runs
 * for EVERY test without any per-spec opt-in and cannot be forgotten. It changes
 * NOTHING about production: the inline consent/gtag bootstrap still executes, so
 * `window.gtag` + `dataLayer` work and the app's analytics code runs and can be
 * asserted; only the network transmission to Google is blocked.
 *
 * Import `test`/`expect` from THIS file in every e2e spec (never straight from
 * `@playwright/test`) so the safeguard is always active.
 */
const GA_ENDPOINTS =
  /https?:\/\/([^/]*\.)?(google-analytics\.com|googletagmanager\.com|analytics\.google\.com|g\.doubleclick\.net|doubleclick\.net)\//i;

/** True for a request that would transmit data to the real GA4 property. */
export function isGoogleAnalyticsRequest(url: string): boolean {
  return GA_ENDPOINTS.test(url);
}

export const test = base.extend<{ blockRealAnalytics: void }>({
  blockRealAnalytics: [
    async ({ context }, use) => {
      await context.route(GA_ENDPOINTS, (route) => route.abort());
      await use();
    },
    { auto: true },
  ],
});

export { expect };
export type { Page, Locator } from "@playwright/test";
