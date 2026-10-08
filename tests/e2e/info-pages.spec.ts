import { test, expect } from "./fixtures";

/**
 * Coverage for the contact / FAQ / legal / reservation pages refined on
 * 2026-10-09: contact channels + schema, FAQ accordion + FAQPage match, legal
 * WebPage schema + contact block, reservation step cards + trust + iOS-safe
 * inputs, and no horizontal overflow on any of them at phone + desktop widths.
 */

const ALL = [
  { path: "/kontakt/", h1: "Napisz do nas", canonical: "https://egipskiewakacje.pl/kontakt/" },
  { path: "/faq/", h1: "Najczęstsze pytania", canonical: "https://egipskiewakacje.pl/faq/" },
  { path: "/polityka-prywatnosci/", h1: "Polityka prywatności", canonical: "https://egipskiewakacje.pl/polityka-prywatnosci/" },
  { path: "/polityka-cookies/", h1: "Polityka cookies", canonical: "https://egipskiewakacje.pl/polityka-cookies/" },
  { path: "/regulamin/", h1: "Regulamin", canonical: "https://egipskiewakacje.pl/regulamin/" },
  { path: "/rezerwacja/", h1: "Zarezerwuj wycieczkę", canonical: "https://egipskiewakacje.pl/rezerwacja/" },
];

test.describe("info pages - metadata, single H1, no overflow", () => {
  for (const { path, h1, canonical } of ALL) {
    test(`${path} renders correctly`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBeLessThan(400);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
      await expect(page.locator("link[rel=canonical]")).toHaveAttribute("href", canonical);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index/);

      for (const width of [1280, 390]) {
        await page.setViewportSize({ width, height: 900 });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `overflow on ${path} @${width}`).toBeLessThanOrEqual(1);
      }
    });
  }
});

test.describe("kontakt - channels + schema", () => {
  test("phone, email, facebook and instagram are present and labelled", async ({ page }) => {
    await page.goto("/kontakt/");
    const main = page.locator("section.section");
    await expect(main.locator('a[href="tel:+201055850536"]')).toHaveCount(1);
    await expect(main.locator('a[href="mailto:info.egipskiewakacje@gmail.com"]')).toHaveCount(1);
    await expect(main.locator('a[href="https://www.facebook.com/egipskiewakacje"]')).toHaveCount(1);
    await expect(main.locator('a[href="https://www.instagram.com/egipskiewakacje/"]')).toHaveCount(1);
    await expect(main.getByRole("link", { name: "Napisz na WhatsApp" })).toBeVisible();
    await expect(main.getByRole("link", { name: "Egipskie Wakacje na Facebooku" })).toBeVisible();
    // Useful internal links.
    await expect(main.getByRole("link", { name: "Wszystkie wycieczki" })).toBeVisible();
  });

  test("emits ContactPage JSON-LD bound to the existing organization", async ({ page }) => {
    await page.goto("/kontakt/");
    const html = await page.content();
    expect(html).toContain('"ContactPage"');
    expect(html).toContain('egipskiewakacje.pl/#organization');
  });
});

test.describe("faq - accordion + schema parity", () => {
  test("native details accordion expands and matches FAQPage JSON-LD", async ({ page }) => {
    await page.goto("/faq/");
    const items = page.locator("details");
    const count = await items.count();
    expect(count).toBeGreaterThan(5);

    // Expanding the first item reveals its answer (keyboard-operable <details>).
    const first = items.first();
    await first.locator("summary").click();
    await expect(first).toHaveAttribute("open", "");

    // One Question node per visible <summary>.
    const html = await page.content();
    expect(html).toContain('"FAQPage"');
    const questions = (html.match(/"@type":"Question"/g) || []).length;
    expect(questions).toBe(count);

    await expect(
      page.locator("section.section").getByRole("link", { name: "Napisz e-mail do Egipskie Wakacje" }),
    ).toBeVisible();
  });
});

test.describe("legal pages - schema + contact block", () => {
  for (const path of ["/polityka-prywatnosci/", "/polityka-cookies/", "/regulamin/"]) {
    test(`${path} has WebPage schema + email contact + last-updated`, async ({ page }) => {
      await page.goto(path);
      const html = await page.content();
      expect(html).toContain('"WebPage"');
      expect(html).toContain("Ostatnia aktualizacja");
      await expect(
        page.locator('a[href="mailto:info.egipskiewakacje@gmail.com"]').first(),
      ).toBeVisible();
    });
  }

  test("regulamin no longer claims a per-tour price-verification date", async ({ page }) => {
    await page.goto("/regulamin/");
    await expect(page.locator("body")).not.toContainText("Datę ostatniej weryfikacji ceny");
  });

  test("privacy policy and cookie policy agree that GA4 is used", async ({ page }) => {
    await page.goto("/polityka-prywatnosci/");
    await expect(page.locator("body")).toContainText("Google Analytics 4");
    await expect(page.locator("body")).not.toContainText("nie używa plików cookies do śledzenia");
    await page.goto("/polityka-cookies/");
    await expect(page.locator("body")).toContainText("Google Analytics 4");
  });
});

test.describe("rezerwacja - steps, trust, iOS-safe form", () => {
  test("three step cards, trust points and >=16px inputs", async ({ page }) => {
    await page.goto("/rezerwacja/");
    await expect(page.locator('ol[aria-label="Jak to działa?"] > li')).toHaveCount(3);
    await expect(page.getByText("Bez przedpłaty", { exact: true })).toBeVisible();
    await expect(page.getByText("Płatność przy rozpoczęciu wycieczki", { exact: true })).toBeVisible();

    const form = page.locator("form").first();
    await expect(form).toBeVisible();
    // iOS Safari auto-zooms if an input font-size is < 16px.
    const minFont = await form.locator("input, select, textarea").evaluateAll((els) =>
      Math.min(...els.map((el) => parseFloat(getComputedStyle(el).fontSize))),
    );
    expect(minFont).toBeGreaterThanOrEqual(16);
  });
});
