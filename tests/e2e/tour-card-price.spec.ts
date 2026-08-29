import { test, expect, type Page } from "@playwright/test";

/**
 * Tour CARDS must show the stored base price plainly ("60 USD / os.") with NO
 * "od" (from) prefix. Covers every shared card renderer via its `data-testid=
 * "tour-price"` hook: homepage carousel (TourSlider), listing/destination/category
 * grids (TourCard) and blog related-tour cards (PostBody). The tour-detail booking
 * card (priceHeadline) and the hub Quick-Facts aggregate ("od X", lib/facts.ts)
 * are intentionally out of scope and unchanged.
 */

const CARD_PAGES = [
  { name: "home carousel", url: "/" },
  { name: "all tours", url: "/wycieczki/" },
  { name: "hurghada", url: "/wycieczki-z-hurghady/" },
  { name: "marsa-alam", url: "/wycieczki-z-marsa-alam/" },
  { name: "sharm", url: "/wycieczki-z-sharm-el-sheikh/" },
  { name: "category kair", url: "/wycieczki/kair-i-piramidy/" },
];

async function priceTexts(page: Page): Promise<string[]> {
  return page
    .locator('[data-testid="tour-price"]')
    .evaluateAll((els) => els.map((el) => (el.textContent || "").replace(/\s+/g, " ").trim()));
}

for (const p of CARD_PAGES) {
  test(`tour-card prices on ${p.name} have no "od" prefix`, async ({ page }) => {
    await page.goto(p.url);
    await page.waitForLoadState("load");

    const texts = await priceTexts(page);
    expect(texts.length, `${p.name}: expected at least one tour-card price`).toBeGreaterThan(0);

    for (const t of texts) {
      // No leading "od " and no " od " before a number anywhere in the price cell.
      expect(t.toLowerCase().startsWith("od "), `${p.name}: price "${t}" still starts with "od"`).toBe(false);
      expect(/\bod\s+\d/i.test(t), `${p.name}: price "${t}" contains "od <number>"`).toBe(false);
      // Sanity: the price cell still shows a real amount + currency (not blank/0).
      expect(/\d/.test(t), `${p.name}: price "${t}" has no digit`).toBe(true);
      expect(t).not.toMatch(/(^|\s)0\s*USD/);
    }
  });
}
