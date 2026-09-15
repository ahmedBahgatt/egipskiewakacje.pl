import { test, expect, type Page } from "./fixtures";

/**
 * Cross-platform WhatsApp handoff guard.
 *
 * Every first-party WhatsApp anchor rendered anywhere on the exported site must:
 *  - use the canonical universal link https://wa.me/<number> (never
 *    api.whatsapp.com/send, web.whatsapp.com, or a whatsapp:// scheme, which
 *    are the device-specific / intermediary forms we must not emit ourselves);
 *  - point at the single configured business number;
 *  - carry at most one `?text=` query param, correctly URL-encoded;
 *  - open in a NEW tab (target="_blank"), so the WhatsApp handoff never replaces
 *    the visitor's current page. Returning from the WhatsApp app then lands them
 *    back on the tour page instead of stranded on wa.me / the api.whatsapp.com
 *    interstitial. This matches the sekretyegiptu.pl reference (Joinchat's
 *    window.open(...,"joinchat") + target="_blank" tour CTAs).
 *
 * This runs against the static export, so it covers the real rendered anchors on
 * every page shape (home, listing, category, destination, tour, contact, FAQ,
 * about). Playwright emulation cannot prove the native WhatsApp app launches - it
 * only proves the URL/handoff shape the OS then acts on.
 */

const NUMBER = "201055850536";

// One page per shape that hosts WhatsApp CTAs (FAB + footer are on all; tour
// cards on listing/category/destination; inline CTAs on the content pages).
const PAGES = [
  "/",
  "/wycieczki/",
  "/wycieczki/kair-i-piramidy/",
  "/wycieczki-z-hurghady/",
  "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/",
  "/kontakt/",
  "/faq/",
  "/o-nas/",
];

interface WaAnchor {
  href: string;
  target: string | null;
}

async function whatsappAnchors(page: Page): Promise<WaAnchor[]> {
  return page.$$eval("a[href]", (as) =>
    as
      .map((a) => ({ href: a.getAttribute("href") ?? "", target: a.getAttribute("target") }))
      // Any anchor that is a WhatsApp handoff in ANY form (so a stray
      // api.whatsapp.com / web.whatsapp.com / whatsapp:// would be caught too).
      .filter((a) => /wa\.me|whatsapp/i.test(a.href)),
  );
}

test.describe("WhatsApp links are canonical and open in a new tab on every page", () => {
  for (const path of PAGES) {
    test(`canonical wa.me handoff on ${path}`, async ({ page }) => {
      await page.goto(path);
      const anchors = await whatsappAnchors(page);
      expect(anchors.length, `${path} has no WhatsApp anchors`).toBeGreaterThan(0);

      for (const { href, target } of anchors) {
        // Canonical universal link, correct number, never an intermediary host.
        expect(href.startsWith(`https://wa.me/${NUMBER}`), `bad WhatsApp href: ${href}`).toBe(true);
        expect(href, href).not.toContain("api.whatsapp.com");
        expect(href, href).not.toContain("web.whatsapp.com");
        expect(href, href).not.toContain("whatsapp://");
        // New-tab handoff so the current page is preserved on app return.
        expect(target, `WhatsApp anchor must open a new tab (target=${target}): ${href}`).toBe(
          "_blank",
        );
        // At most one query string, and it is only `text`, cleanly encoded.
        const qs = href.split("?").slice(1);
        expect(qs.length, `multiple query strings: ${href}`).toBeLessThanOrEqual(1);
        if (qs.length === 1) {
          const params = new URLSearchParams(qs[0]);
          expect([...params.keys()], `unexpected params: ${href}`).toEqual(["text"]);
          // A single decode must restore clean text (double-encoding would leave %).
          const decoded = decodeURIComponent(qs[0].slice("text=".length));
          expect(decoded, `double-encoded text: ${href}`).not.toContain("%");
        }
      }
    });
  }

  test("zero api.whatsapp.com anchors exist site-wide across the sampled pages", async ({
    page,
  }) => {
    let apiLinks = 0;
    for (const path of PAGES) {
      await page.goto(path);
      apiLinks += await page.$$eval(
        "a[href]",
        (as) => as.filter((a) => (a.getAttribute("href") ?? "").includes("api.whatsapp.com")).length,
      );
    }
    expect(apiLinks).toBe(0);
  });
});
