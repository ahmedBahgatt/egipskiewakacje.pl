import { test, expect, type Page } from "@playwright/test";

const TOUR_URL = "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/";
const SUBMIT = /Wyślij rezerwację przez WhatsApp/;

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
  test("invalid form does NOT open WhatsApp and shows a Polish error", async ({ page }) => {
    await stubWindowOpen(page);
    await page.goto(TOUR_URL);

    await page.locator("#rezerwacja").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: SUBMIT }).click();

    // No WhatsApp opened.
    expect(await opened(page)).toHaveLength(0);
    // First invalid field is the date (name was removed entirely).
    await expect(page.getByText("Wybierz datę wycieczki.")).toBeVisible();
  });

  test("is name-free and has no per-child age inputs", async ({ page }) => {
    await page.goto(TOUR_URL);
    await page.locator("#rezerwacja").scrollIntoViewIfNeeded();

    // No name field anywhere in the form.
    await expect(page.locator("#bf-name")).toHaveCount(0);
    await expect(page.getByLabel("Imię")).toHaveCount(0);
    // Exactly one children field, labelled 5-11, and ZERO per-child age boxes.
    await expect(page.getByLabel("Dzieci 5–11 lat")).toBeVisible();
    await expect(page.locator('[id^="bf-age-"]')).toHaveCount(0);
    await expect(page.getByText("Wiek dzieci")).toHaveCount(0);
  });

  test("valid form opens a booking-intent WhatsApp URL (no name, no fake data)", async ({ page }) => {
    await stubWindowOpen(page);
    await page.goto(TOUR_URL);

    await page.fill("#bf-date", "2027-01-15");
    await page.fill("#bf-hotel", "Steigenberger Al Dau");
    await page.fill("#bf-adults", "2");

    await page.getByRole("button", { name: SUBMIT }).click();

    const urls = await opened(page);
    expect(urls).toHaveLength(1);
    const url = urls[0];
    expect(url.startsWith("https://wa.me/201055850536?text=")).toBeTruthy();

    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("Chcę zarezerwować");
    expect(decoded).toContain("Wycieczka z Hurghady do Kairu");
    expect(decoded).toContain("Miejsce wyjazdu: Hurghada");
    expect(decoded).toContain("Dorośli: 2");
    expect(decoded).toContain("Hotel: Steigenberger Al Dau");
    expect(decoded).toContain("Data: 2027-01-15");
    // No name row, no fake/default data, no children row when none selected.
    expect(decoded).not.toContain("Imię");
    expect(decoded).not.toContain("(do podania)");
    expect(decoded).not.toContain("Dzieci");
  });
});
