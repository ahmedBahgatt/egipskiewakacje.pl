import { test as base, expect } from "@playwright/test";

/**
 * TEST-ONLY safeguard against polluting the real analytics properties: the GA4
 * property (G-TH6P4SF2SN) and the Microsoft Clarity project (ywr4k7f4mn).
 *
 * The exported site bakes in the production Google tag AND the Clarity tag, and
 * CI/test browsers run OUTSIDE the EEA denied region, so every fresh Playwright
 * context would be counted as a real visitor in GA4 (first_visit / session_start
 * / page_view plus synthetic whatsapp_click / cta_click / tour_card_click /
 * generate_lead) and would spawn a real Clarity recording/heatmap session.
 *
 * This fixture aborts every outbound request to Google's tag loader + analytics
 * collection endpoints and to Clarity's tag loader + collection endpoints on the
 * browser CONTEXT, as an `auto` fixture - so it runs for EVERY test without any
 * per-spec opt-in and cannot be forgotten. It changes NOTHING about production:
 * the inline consent/gtag bootstrap and the Clarity stub still execute, so
 * `window.gtag` + `dataLayer` work and the app's analytics code runs and can be
 * asserted; only the network transmission to Google/Microsoft is blocked.
 *
 * Import `test`/`expect` from THIS file in every e2e spec (never straight from
 * `@playwright/test`) so the safeguard is always active.
 */
const GA_ENDPOINTS =
  /https?:\/\/([^/]*\.)?(google-analytics\.com|googletagmanager\.com|analytics\.google\.com|g\.doubleclick\.net|doubleclick\.net)\//i;

/** Microsoft Clarity tag loader + collection endpoints (clarity.ms, c.bing.com). */
const CLARITY_ENDPOINTS = /https?:\/\/([^/]*\.)?(clarity\.ms|c\.bing\.com)\//i;

/** True for a request that would transmit data to the real GA4 property. */
export function isGoogleAnalyticsRequest(url: string): boolean {
  return GA_ENDPOINTS.test(url);
}

/** True for a request that would transmit data to the real Clarity project. */
export function isClarityRequest(url: string): boolean {
  return CLARITY_ENDPOINTS.test(url);
}

export const test = base.extend<{ blockRealAnalytics: void }>({
  blockRealAnalytics: [
    async ({ context }, use) => {
      await context.route(GA_ENDPOINTS, (route) => route.abort());
      await context.route(CLARITY_ENDPOINTS, (route) => route.abort());
      await use();
    },
    { auto: true },
  ],
});

export { expect };
export type { Page, Locator } from "@playwright/test";
