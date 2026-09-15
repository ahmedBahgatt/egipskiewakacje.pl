import { test, expect, isGoogleAnalyticsRequest, type Page } from "./fixtures";

/**
 * Proves the test-only safeguard: the app's analytics code still runs and can be
 * asserted from `dataLayer`, while ZERO requests reach the real GA4 property.
 */

const TOUR = "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/";
const SUBMIT = /Wyślij rezerwację przez WhatsApp/;

const dlLen = (page: Page) =>
  page.evaluate(() => ((window as unknown as { dataLayer?: unknown[] }).dataLayer || []).length);

async function eventNamesSince(page: Page, before: number): Promise<string[]> {
  return page.evaluate((b) => {
    const dl = (window as unknown as { dataLayer?: ArrayLike<unknown>[] }).dataLayer || [];
    return Array.from(dl)
      .slice(b)
      .map((a) => {
        try {
          return Array.from(a as ArrayLike<unknown>);
        } catch {
          return a as unknown[];
        }
      })
      .filter((e) => Array.isArray(e) && e[0] === "event")
      .map((e) => (e as unknown[])[1] as string);
  }, before);
}

test.describe("analytics events fire locally but never reach the real GA4 property", () => {
  test("dataLayer receives the events; zero requests complete to Google Analytics", async ({
    page,
  }) => {
    const gaCompleted: string[] = [];
    const gaAborted: string[] = [];
    page.on("requestfinished", (r) => {
      if (isGoogleAnalyticsRequest(r.url())) gaCompleted.push(r.url());
    });
    page.on("requestfailed", (r) => {
      if (isGoogleAnalyticsRequest(r.url())) gaAborted.push(r.url());
    });

    // The booking form opens WhatsApp via window.open - stub it so nothing navigates.
    await page.addInitScript(() => {
      (window as unknown as { open: () => null }).open = () => null;
    });

    await page.goto(TOUR);
    await page.waitForTimeout(800); // let the inline bootstrap + React mount

    // The gtag stub + dataLayer exist (analytics code runs) even though the real tag was blocked.
    expect(await page.evaluate(() => typeof (window as unknown as { gtag?: unknown }).gtag)).toBe(
      "function",
    );

    // --- Floating WhatsApp FAB: one click => exactly one whatsapp_click + one cta_click ---
    let before = await dlLen(page);
    await page.evaluate(() => {
      const stop = (e: Event) => e.preventDefault();
      document.addEventListener("click", stop, false); // runs AFTER the app's delegated listener
      document
        .querySelector('[data-cta-id="floating_whatsapp"]')!
        .dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
      document.removeEventListener("click", stop, false);
    });
    let names = await eventNamesSince(page, before);
    expect(names.filter((n) => n === "whatsapp_click")).toHaveLength(1);
    expect(names.filter((n) => n === "cta_click")).toHaveLength(1);
    expect(names.filter((n) => n === "generate_lead")).toHaveLength(0);

    // --- Invalid booking submit => zero generate_lead ---
    await page.locator("#rezerwacja").scrollIntoViewIfNeeded();
    before = await dlLen(page);
    await page.getByRole("button", { name: SUBMIT }).click();
    names = await eventNamesSince(page, before);
    expect(names.filter((n) => n === "generate_lead")).toHaveLength(0);

    // --- Valid booking submit => exactly one generate_lead (+ one whatsapp_click, one cta_click) ---
    await page.fill("#bf-date", "2027-06-15");
    await page.fill("#bf-hotel", "Steigenberger Al Dau");
    before = await dlLen(page);
    await page.getByRole("button", { name: SUBMIT }).click();
    names = await eventNamesSince(page, before);
    expect(names.filter((n) => n === "generate_lead")).toHaveLength(1);
    expect(names.filter((n) => n === "whatsapp_click")).toHaveLength(1);
    expect(names.filter((n) => n === "cta_click")).toHaveLength(1);

    // --- The safeguard held: nothing reached Google Analytics, and the block actually fired ---
    expect(gaCompleted, `GA requests that completed: ${gaCompleted.join(", ")}`).toHaveLength(0);
    expect(gaAborted.length, "expected the GA tag/collect request to be aborted").toBeGreaterThan(0);
  });
});
