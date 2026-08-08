import { test, expect } from "@playwright/test";

/**
 * Guards Polish-language correctness in the RENDERED output (catches strings that
 * are composed at runtime, e.g. genitive built from a place name). Fails if any
 * grammatically incorrect / stripped-diacritic string appears anywhere in the
 * served HTML of the key pages.
 */
const FORBIDDEN = [
  "z Hurghada",
  "Wycieczka z Hurghada",
  "Wycieczki z Hurghada",
  "turystow",
  "odbior z hotelu",
];

const PAGES = [
  "/",
  "/wycieczki/",
  "/wycieczki-z-hurghady/",
  "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/",
  "/wycieczki-z-marsa-alam/",
  "/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy/",
  "/cennik/",
  "/o-nas/",
  "/faq/",
  "/kontakt/",
];

test.describe("Polish correctness", () => {
  for (const path of PAGES) {
    test(`no incorrect Polish on ${path}`, async ({ page }) => {
      await page.goto(path);
      const html = await page.content();
      for (const bad of FORBIDDEN) {
        expect(html, `"${bad}" must not appear on ${path}`).not.toContain(bad);
      }
    });
  }

  test("correct genitive forms are present on the homepage", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();
    expect(html).toContain("Wycieczki z Hurghady");
  });
});
