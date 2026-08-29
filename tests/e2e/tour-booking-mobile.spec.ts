import { test, expect, type Page } from "@playwright/test";

/** Representative tours across data shapes (pricing tiers, transfer rows, categories). */
const TOURS = [
  "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/",
  "/wycieczki-z-hurghady/orange-bay/",
  "/wycieczki-z-marsa-alam/kair-stary-kair-piramidy/",
  "/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy/",
];
const PHONE = { width: 375, height: 812 };

async function gotoMobile(page: Page, url: string) {
  await page.setViewportSize(PHONE);
  await page.goto(url);
}

test.describe("tour page - mobile booking + responsive", () => {
  for (const url of TOURS) {
    for (const width of [320, 375]) {
      test(`no horizontal overflow @ ${width}px: ${url}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 812 });
        await page.goto(url);
        // Page must not scroll sideways.
        const docDelta = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(docDelta).toBeLessThanOrEqual(1);
        // Every DataTable box must fit its own width (no inner swipe).
        const overflow = await page.$$eval("main table", (tables) =>
          tables
            .map((t) => t.closest("div"))
            .filter((w): w is HTMLDivElement => !!w)
            .map((w) => w.scrollWidth - w.clientWidth),
        );
        for (const delta of overflow) expect(delta).toBeLessThanOrEqual(1);
      });
    }

    test(`booking bar fits the viewport @ 375px: ${url}`, async ({ page }) => {
      await gotoMobile(page, url);
      const cta = page.getByRole("button", { name: "Zarezerwuj", exact: true });
      await expect(cta).toBeVisible();
      const box = await cta.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x + box!.width).toBeLessThanOrEqual(PHONE.width + 1);
    });

    test(`standalone WhatsApp FAB is hidden on tour pages: ${url}`, async ({ page }) => {
      await gotoMobile(page, url);
      await expect(page.getByRole("link", { name: "Napisz do nas na WhatsApp" })).toBeHidden();
    });
  }

  test("booking sheet opens, exposes submit, and closes", async ({ page }) => {
    await gotoMobile(page, TOURS[0]);

    await page.getByRole("button", { name: "Zarezerwuj", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    // Submit CTA is present and inside the viewport.
    const submit = dialog.getByRole("button", { name: /Wyślij zapytanie przez WhatsApp/ });
    await expect(submit).toBeVisible();
    const box = await submit.boundingBox();
    expect(box!.y + box!.height).toBeLessThanOrEqual(PHONE.height + 1);

    // Escape closes it.
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("sheet submit stays WhatsApp-based (no online checkout)", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __opened: string[] }).__opened = [];
      window.open = (u?: string | URL) => {
        (window as unknown as { __opened: string[] }).__opened.push(String(u));
        return null;
      };
    });
    await gotoMobile(page, TOURS[0]);
    await page.getByRole("button", { name: "Zarezerwuj", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog.locator("#bfm-name").fill("Anna");
    await dialog.locator("#bfm-date").fill("2027-01-15");
    await dialog.locator("#bfm-hotel").fill("Steigenberger");
    await dialog.getByRole("button", { name: /Wyślij zapytanie przez WhatsApp/ }).click();
    const urls = await page.evaluate(
      () => (window as unknown as { __opened: string[] }).__opened,
    );
    expect(urls).toHaveLength(1);
    expect(urls[0].startsWith("https://wa.me/")).toBeTruthy();
  });

  test("desktop keeps the in-column booking card", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(TOURS[0]);
    // Primary CTA present; sheet opener bar hidden on desktop.
    await expect(
      page.getByRole("link", { name: "Zarezerwuj wycieczkę" }).first(),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Zarezerwuj", exact: true })).toBeHidden();
  });
});
