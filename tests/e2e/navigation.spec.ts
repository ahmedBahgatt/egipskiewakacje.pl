import { test, expect } from "@playwright/test";

test.describe("desktop navigation", () => {
  // Desktop-only: the primary nav and hover dropdown are hidden below 900px.
  test.beforeEach(({ isMobile }) => {
    test.skip(!!isMobile, "Desktop navigation is not shown on mobile");
  });
  test.use({ viewport: { width: 1280, height: 800 } });

  test("primary nav links navigate", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Menu główne" }).getByRole("link", { name: "Poradnik" }).click();
    await expect(page).toHaveURL(/\/poradnik\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Cennik is removed and Strona główna is present in the primary nav", async ({ page }) => {
    await page.goto("/wycieczki/");
    const nav = page.getByRole("navigation", { name: "Menu główne" });
    await expect(nav.getByRole("link", { name: "Cennik" })).toHaveCount(0);
    const home = nav.getByRole("link", { name: "Strona główna" });
    await expect(home).toBeVisible();
    await expect(home).toHaveAttribute("href", "/");
  });

  test("Wycieczki dropdown exposes destination links", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Menu główne" });
    // Focusing the parent triggers :focus-within, revealing the dropdown - a
    // deterministic reveal (keyboard path) rather than relying on :hover.
    await nav.getByRole("link", { name: "Wycieczki", exact: true }).focus();
    const sub = nav.getByRole("link", { name: "Wycieczki z Hurghady" });
    await expect(sub).toBeVisible();
    await expect(sub).toHaveAttribute("href", "/wycieczki-z-hurghady/");
    await sub.click();
    await expect(page).toHaveURL(/\/wycieczki-z-hurghady\/$/);
  });
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens, traps in a dialog, and closes on Escape", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Otwórz menu" });
    // The hamburger icon must render as a real, sized inline SVG (no empty box).
    const toggleIcon = toggle.locator("svg");
    await expect(toggleIcon).toBeVisible();
    const box = await toggleIcon.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(12);
    expect(box?.height ?? 0).toBeGreaterThan(12);

    await toggle.click();

    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();

    // The close (X) icon must also render as a visible, sized inline SVG.
    const closeIcon = dialog.getByRole("button", { name: "Zamknij menu" }).locator("svg");
    await expect(closeIcon).toBeVisible();
    const cbox = await closeIcon.boundingBox();
    expect(cbox?.width ?? 0).toBeGreaterThan(12);
    expect(cbox?.height ?? 0).toBeGreaterThan(12);

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });

  test("navigates from the mobile menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Otwórz menu" }).click();
    await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "O nas" }).click();
    await expect(page).toHaveURL(/\/o-nas\/$/);
  });

  test("floating WhatsApp is hidden while the drawer is open", async ({ page }) => {
    await page.goto("/");
    const float = page.getByRole("link", { name: "Napisz do nas na WhatsApp" });
    await expect(float).toBeVisible();
    await page.getByRole("button", { name: "Otwórz menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    // Hidden via CSS (visibility:hidden) driven by body[data-menu-open].
    await expect(float).toBeHidden();
  });
});
