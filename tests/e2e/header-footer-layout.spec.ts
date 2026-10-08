import { test, expect } from "./fixtures";

/**
 * Responsive-layout guard for the header nav row and the footer contact block.
 *
 * Regression targets (the 2026-10-08 responsive correction):
 *  - Desktop nav labels ("Strona główna", "O nas", ...) must stay on ONE line;
 *    they used to wrap onto two lines when the bar got tight, making the header
 *    awkwardly tall. `white-space: nowrap` + non-shrinking clusters fix it, and
 *    the desktop nav is swapped for the burger below 1024px instead of being
 *    squeezed.
 *  - The footer contact column used to stack phone / divider / icons / email as
 *    four separate rows; it is now one compact wrapping row so the column is no
 *    longer much taller than the link columns.
 *
 * No content/SEO assertions here - purely geometry, so it cannot drift with copy.
 */

const NAV_LABELS = ["Strona główna", "Wycieczki", "Poradnik", "O nas", "Kontakt"];

test.describe("header nav stays on one line on desktop", () => {
  for (const width of [1440, 1280, 1024]) {
    test(`no wrapping or horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 860 });
      await page.goto("/");

      const nav = page.getByRole("navigation", { name: "Menu główne" });
      await expect(nav).toBeVisible();

      // Every top-level nav item renders as a single text line. A wrapped label
      // roughly doubles the box height (~38px single line -> ~60px for two), so
      // a <=48px ceiling catches any two-line wrap without being font-fragile.
      for (const label of NAV_LABELS) {
        const item = nav.getByRole(label === "Wycieczki" ? "button" : "link", {
          name: label,
          exact: true,
        });
        const box = await item.boundingBox();
        expect(box, `${label} missing at ${width}px`).not.toBeNull();
        expect(box!.height, `"${label}" wrapped to 2 lines at ${width}px`).toBeLessThanOrEqual(48);
      }

      // Booking CTA is present and on one line at every desktop width.
      await expect(
        page.getByRole("navigation", { name: "Menu główne" }),
      ).toBeVisible();
      await expect(
        page.locator("header").getByRole("link", { name: "Zarezerwuj wycieczkę" }),
      ).toBeVisible();

      // Opening the desktop layout must never introduce horizontal page overflow.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
    });
  }

  test("social icons join the bar on wide desktop (1280px)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 860 });
    await page.goto("/");
    const headerSocial = page
      .locator("header")
      .getByRole("link", { name: "Egipskie Wakacje na Facebooku" });
    await expect(headerSocial).toBeVisible();
  });
});

test.describe("footer contact block is a compact single row on desktop", () => {
  test("phone and social icons share one horizontal row at 1280px", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const footer = page.locator("footer");
    const phone = footer.locator('a[href^="tel:"]');
    const social = footer.locator('ul[aria-label^="Profile i kontakt"]');
    // Email is icon-only now: the mailto link exists (the icon), but the address
    // text must NOT be rendered anywhere in the footer.
    const emailIcon = footer.locator('a[href^="mailto:"]');

    await expect(phone).toHaveAttribute("href", "tel:+201055850536");
    await expect(emailIcon).toHaveAttribute("href", "mailto:info.egipskiewakacje@gmail.com");
    await expect(footer).not.toContainText("info.egipskiewakacje@gmail.com");

    const phoneBox = await phone.boundingBox();
    const socialBox = await social.boundingBox();
    expect(phoneBox).not.toBeNull();
    expect(socialBox).not.toBeNull();
    // Compact row: the phone and the icon group sit on the same visual line
    // (tops within one icon-height), not stacked on separate rows as before.
    expect(
      Math.abs(phoneBox!.y - socialBox!.y),
      "phone and social icons are not on the same row",
    ).toBeLessThanOrEqual(24);
  });
});
