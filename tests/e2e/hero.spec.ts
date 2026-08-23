import { test, expect } from "@playwright/test";

/**
 * The destination and category landing pages must all render the SAME shared
 * PageHero with one content-width system - no per-page narrow overrides. These
 * guard that (a) every hero is full-bleed (a background photo + scrim, not a small
 * image card), (b) the content/intro columns are identical and genuinely wide on
 * desktop, and (c) there is no horizontal overflow.
 */

const PAGES = [
  "/wycieczki-z-hurghady/",
  "/wycieczki-z-marsa-alam/",
  "/wycieczki-z-sharm-el-sheikh/",
  "/wycieczki/kair-i-piramidy/",
  "/wycieczki/safari-i-quady/",
];

test.describe("shared PageHero", () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(!!isMobile, "Desktop width-consistency check");
  });
  test.use({ viewport: { width: 1440, height: 900 } });

  test("all destination/category heroes share one wide content-width system", async ({ page }) => {
    const widths: number[] = [];
    const introWidths: number[] = [];

    for (const path of PAGES) {
      await page.goto(path);
      // full-bleed: the hero has a background media layer + scrim, exactly one H1.
      await expect(page.locator('[class*="PageHero_media"]')).toHaveCount(1);
      await expect(page.locator('[class*="PageHero_scrim"]')).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `horizontal overflow on ${path}`).toBeLessThanOrEqual(1);

      // Measure the actual rendered column widths (min()/% max-widths serialize as
      // a string in getComputedStyle, so read the real box instead).
      const cw = (await page.locator('[class*="PageHero_content"]').first().boundingBox())?.width ?? 0;
      const iw = (await page.locator('[class*="PageHero_intro"]').first().boundingBox())?.width ?? 0;
      widths.push(Math.round(cw));
      introWidths.push(Math.round(iw));
    }

    // Identical across every page (single shared rule, no per-page override).
    expect(new Set(widths).size, `content max-widths differ: ${widths}`).toBe(1);
    expect(new Set(introWidths).size, `intro max-widths differ: ${introWidths}`).toBe(1);

    // And genuinely wide on desktop (not a ~500px column).
    expect(widths[0], "hero content column should be wide on desktop").toBeGreaterThanOrEqual(700);
    expect(introWidths[0], "hero intro column should be wide on desktop").toBeGreaterThanOrEqual(640);
  });
});
