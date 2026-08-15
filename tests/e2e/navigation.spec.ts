import { test, expect } from "@playwright/test";

test.describe("desktop navigation", () => {
  // Desktop-only: the primary nav and hover dropdown are hidden below 900px.
  test.beforeEach(({ isMobile }) => {
    test.skip(!!isMobile, "Desktop navigation is not shown on mobile");
  });
  test.use({ viewport: { width: 1280, height: 800 } });

  test("primary nav links navigate", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Menu główne" }).getByRole("link", { name: "Cennik" }).click();
    await expect(page).toHaveURL(/\/cennik\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("ceny");
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
    await page.getByRole("button", { name: "Otwórz menu" }).click();

    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });

  test("navigates from the mobile menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Otwórz menu" }).click();
    await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "Cennik" }).click();
    await expect(page).toHaveURL(/\/cennik\/$/);
  });
});
