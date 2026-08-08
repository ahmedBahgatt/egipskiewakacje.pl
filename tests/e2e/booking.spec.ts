import { test, expect, type Page } from "@playwright/test";

const TOUR_URL = "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/";

/** Capture window.open calls so we can assert whether WhatsApp was opened. */
async function stubWindowOpen(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __opened: string[] }).__opened = [];
    window.open = (url?: string | URL) => {
      (window as unknown as { __opened: string[] }).__opened.push(String(url));
      return null;
    };
  });
}
const opened = (page: Page) =>
  page.evaluate(() => (window as unknown as { __opened: string[] }).__opened);

test.describe("booking form", () => {
  test("invalid form does NOT open WhatsApp and shows Polish errors", async ({ page }) => {
    await stubWindowOpen(page);
    await page.goto(TOUR_URL);

    await page.locator("#rezerwacja").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Wyślij zapytanie przez WhatsApp/ }).click();

    // No WhatsApp opened.
    expect(await opened(page)).toHaveLength(0);
    // Inline Polish error for the missing name.
    await expect(page.getByText("Podaj imię (min. 2 znaki).")).toBeVisible();
  });

  test("children ages become required when children > 0", async ({ page }) => {
    await stubWindowOpen(page);
    await page.goto(TOUR_URL);

    await page.fill("#bf-name", "Anna");
    await page.fill("#bf-date", "2027-01-15");
    await page.fill("#bf-hotel", "Steigenberger");
    await page.fill("#bf-adults", "2");
    await page.fill("#bf-children", "1");

    await page.getByRole("button", { name: /Wyślij zapytanie przez WhatsApp/ }).click();

    expect(await opened(page)).toHaveLength(0);
    await expect(page.getByText("Podaj wiek każdego dziecka (0-17 lat).")).toBeVisible();
  });

  test("valid form opens the correct encoded WhatsApp URL", async ({ page }) => {
    await stubWindowOpen(page);
    await page.goto(TOUR_URL);

    await page.fill("#bf-name", "Anna");
    await page.fill("#bf-date", "2027-01-15");
    await page.fill("#bf-hotel", "Steigenberger Al Dau");
    await page.fill("#bf-adults", "2");

    await page.getByRole("button", { name: /Wyślij zapytanie przez WhatsApp/ }).click();

    const urls = await opened(page);
    expect(urls).toHaveLength(1);
    const url = urls[0];
    expect(url.startsWith("https://wa.me/201055850536?text=")).toBeTruthy();

    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("Wycieczka z Hurghady do Kairu");
    expect(decoded).toContain("Miejsce wyjazdu: Hurghada");
    expect(decoded).toContain("Dorośli: 2");
    expect(decoded).toContain("Hotel: Steigenberger Al Dau");
    expect(decoded).toContain("Data: 2027-01-15");
  });
});
