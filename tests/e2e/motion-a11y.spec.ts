import { test, expect } from "@playwright/test";

test.describe("accessibility & motion", () => {
  test("floating WhatsApp button has the correct accessible label", async ({ page }) => {
    await page.goto("/");
    const float = page.getByRole("link", { name: "Napisz do nas na WhatsApp" });
    await expect(float).toBeVisible();
    await expect(float).toHaveAttribute("href", /wa\.me\/201055850536/);
  });

  test("reduced motion disables the hero background video", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    // With reduced motion the hero renders the poster only - no <video>, no play/pause control.
    await expect(page.locator("section video")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /wideo w tle/ })).toHaveCount(0);
    // Content is still present (reading never depends on motion).
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("skip link is present for keyboard users", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Przejdź do treści" })).toHaveCount(1);
  });
});
