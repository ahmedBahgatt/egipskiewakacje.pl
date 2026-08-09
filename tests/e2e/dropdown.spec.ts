import { test, expect } from "@playwright/test";

/**
 * Regression guard for the "Wycieczki dropdown stays open after navigation" bug.
 *
 * Root cause (fixed): desktop dropdown visibility relied on CSS
 * `:hover / :focus-within`, so after clicking a child the menu stayed visible over
 * the newly loaded page because the pointer was still resting on the header. It is
 * now driven by React state that closes on navigation and stays closed until the
 * pointer genuinely leaves and re-enters.
 */

const CHILDREN = [
  { label: "Wycieczki z Hurghady", url: /\/wycieczki-z-hurghady\/$/ },
  { label: "Wycieczki z Marsa Alam", url: /\/wycieczki-z-marsa-alam\/$/ },
  { label: "Wycieczki z Sharm el Sheikh", url: /\/wycieczki-z-sharm-el-sheikh\/$/ },
  { label: "Kair i piramidy", url: /\/wycieczki\/kair-i-piramidy\/$/ },
  { label: "Nurkowanie", url: /\/wycieczki\/nurkowanie\/$/ },
];

test.describe("desktop Wycieczki dropdown", () => {
  // Desktop-only: the hover dropdown does not exist below 900px (mobile menu).
  test.beforeEach(({ isMobile }) => {
    test.skip(!!isMobile, "Desktop dropdown is not shown on mobile");
  });
  test.use({ viewport: { width: 1280, height: 900 } });

  for (const c of CHILDREN) {
    test(`closes after navigating to "${c.label}" without moving the pointer`, async ({
      page,
    }) => {
      await page.goto("/");
      const nav = page.getByRole("navigation", { name: "Menu główne" });
      const trigger = nav.getByRole("link", { name: "Wycieczki", exact: true });

      await trigger.hover();
      const child = nav.getByRole("link", { name: c.label, exact: true });
      await expect(child).toBeVisible();

      // Click the child. Playwright does NOT move the mouse afterwards.
      await child.click();
      await expect(page).toHaveURL(c.url);

      // The dropdown must be closed on the new page even though the pointer has
      // not moved away from the header.
      await expect(child).toBeHidden();
    });
  }

  test("opens on hover and the parent /wycieczki/ link still navigates", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Menu główne" });
    const trigger = nav.getByRole("link", { name: "Wycieczki", exact: true });

    await trigger.hover();
    await expect(nav.getByRole("link", { name: "Wycieczki z Hurghady", exact: true })).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await trigger.click();
    await expect(page).toHaveURL(/\/wycieczki\/$/);
    await expect(
      nav.getByRole("link", { name: "Wycieczki z Hurghady", exact: true }),
    ).toBeHidden();
  });

  test("keyboard: focus opens the menu, Escape closes it and restores focus", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Menu główne" });
    const trigger = nav.getByRole("link", { name: "Wycieczki", exact: true });
    const child = nav.getByRole("link", { name: "Wycieczki z Hurghady", exact: true });

    await trigger.focus();
    await expect(child).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(child).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("click outside closes the menu", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Menu główne" });
    const trigger = nav.getByRole("link", { name: "Wycieczki", exact: true });
    const child = nav.getByRole("link", { name: "Wycieczki z Hurghady", exact: true });

    await trigger.hover();
    await expect(child).toBeVisible();

    // Find a non-interactive point below the header that the open dropdown does
    // not cover, then click it. (The dropdown overlays the top-left of the hero,
    // so we deliberately probe lower/right.)
    const safe = await page.evaluate(() => {
      const header = document.querySelector("header")!;
      const hb = header.getBoundingClientRect();
      const W = window.innerWidth;
      const H = window.innerHeight;
      for (let y = Math.floor(H * 0.92); y > hb.bottom + 8; y -= 20) {
        for (let x = Math.floor(W * 0.5); x < W - 12; x += 40) {
          const el = document.elementFromPoint(x, y);
          if (!el || header.contains(el)) continue;
          if (el.closest("a, button, [role=button], input, select, textarea, label, summary")) {
            continue;
          }
          return { x, y };
        }
      }
      return null;
    });
    expect(safe, "no non-interactive outside point found").not.toBeNull();
    await page.mouse.click(safe!.x, safe!.y);
    await expect(child).toBeHidden();
  });
});

test.describe("mobile menu still works", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens and navigates", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Otwórz menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("link", { name: "Cennik" }).click();
    await expect(page).toHaveURL(/\/cennik\/$/);
  });
});
