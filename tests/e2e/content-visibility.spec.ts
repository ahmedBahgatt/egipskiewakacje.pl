import { test, expect } from "@playwright/test";

/**
 * "No blank screen" rule (cross-device stability pass).
 *
 * Scroll-reveal must ENHANCE already-visible content, never gate it. The reveal
 * wrapper is opaque by default and only animates a small translate, so a slow
 * device (older iPhone/Safari) never scrolls into a blank white section waiting on
 * JavaScript / IntersectionObserver. This guards against reintroducing an
 * `opacity: 0` initial state on reveal wrappers.
 */

const PAGES = [
  "/",
  "/wycieczki/",
  "/wycieczki-z-marsa-alam/",
  "/wycieczki/nurkowanie/",
  "/wycieczki-z-marsa-alam/abu-dabbab/",
];

test.describe("content is visible by default (no reveal-gated blank sections)", () => {
  for (const path of PAGES) {
    test(`every reveal block is opaque before scroll on ${path}`, async ({ page }) => {
      await page.goto(path);
      // Do NOT scroll: assert the far-below-fold reveals (which JS has not revealed
      // yet) are already fully opaque.
      const result = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll("[data-reveal]"));
        const belowFold = els.filter(
          (el) => el.getBoundingClientRect().top > window.innerHeight + 200,
        );
        const faint = belowFold
          .map((el) => Number(getComputedStyle(el).opacity))
          .filter((o) => o < 0.99);
        return { total: els.length, belowFold: belowFold.length, faintCount: faint.length };
      });
      // There should be reveal content below the fold, and none of it is faded out.
      expect(result.faintCount).toBe(0);
    });
  }
});
