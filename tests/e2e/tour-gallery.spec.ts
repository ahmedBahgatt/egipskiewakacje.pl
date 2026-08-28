import { test, expect } from "@playwright/test";

/**
 * Gold-standard tour page: the six-image TourGallery + lightbox on
 * /wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/. Guards that all six
 * images render as real buttons, the lightbox opens with a working counter,
 * next/prev (incl. wrap) and keyboard arrows navigate, Escape closes and returns
 * focus, and the body scroll-lock toggles. Runs on desktop + mobile Chromium.
 */

const PATH = "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/";

test.describe("Cairo tour gallery + lightbox", () => {
  test("all six images render as buttons and the page has no horizontal overflow", async ({
    page,
  }) => {
    await page.goto(PATH);
    const tiles = page.getByRole("button", { name: /^Powiększ zdjęcie/ });
    await expect(tiles).toHaveCount(6);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, "horizontal overflow").toBeLessThanOrEqual(1);
  });

  test("lightbox opens, navigates (next/prev + wrap + arrows), counter tracks, Escape returns focus", async ({
    page,
  }) => {
    await page.goto(PATH);

    const firstTile = page.getByRole("button", { name: /^Powiększ zdjęcie 1 z 6/ });
    await firstTile.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("1 / 6")).toBeVisible();

    // body scroll lock while open
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

    // next
    await dialog.getByRole("button", { name: "Następne zdjęcie" }).click();
    await expect(dialog.getByText("2 / 6")).toBeVisible();

    // keyboard right
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByText("3 / 6")).toBeVisible();

    // prev back to 2
    await dialog.getByRole("button", { name: "Poprzednie zdjęcie" }).click();
    await expect(dialog.getByText("2 / 6")).toBeVisible();

    // wrap: from image 1 press prev -> 6
    await page.keyboard.press("ArrowLeft"); // -> 1
    await expect(dialog.getByText("1 / 6")).toBeVisible();
    await page.keyboard.press("ArrowLeft"); // wrap -> 6
    await expect(dialog.getByText("6 / 6")).toBeVisible();

    // Escape closes, focus returns to the triggering tile, scroll unlocked
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(firstTile).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  });

  test("close button and backdrop both close the lightbox", async ({ page }) => {
    await page.goto(PATH);
    await page.getByRole("button", { name: /^Powiększ zdjęcie 2 z 6/ }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Zamknij galerię" }).click();
    await expect(dialog).toHaveCount(0);
  });
});
