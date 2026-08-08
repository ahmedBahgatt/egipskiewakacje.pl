import { test, expect } from "@playwright/test";

const TOURS: { url: string; h1: string }[] = [
  { url: "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/", h1: "Wycieczka z Hurghady do Kairu" },
  { url: "/wycieczki-z-marsa-alam/kair-stary-kair-piramidy/", h1: "Wycieczka z Marsa Alam do Kairu" },
  { url: "/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy/", h1: "Wycieczka z Sharm el Sheikh do Kairu" },
];

test.describe("tour pages render", () => {
  for (const t of TOURS) {
    test(`renders ${t.url}`, async ({ page }) => {
      const res = await page.goto(t.url);
      expect(res?.status()).toBeLessThan(400);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(t.h1);
      // Booking anchor target exists.
      await expect(page.locator("#rezerwacja")).toHaveCount(1);
    });
  }
});

test.describe("no broken internal links", () => {
  const PAGES = ["/", "/wycieczki/", "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/", "/cennik/"];

  for (const path of PAGES) {
    test(`internal links resolve on ${path}`, async ({ page, request, baseURL }) => {
      await page.goto(path);
      const hrefs = await page.$$eval("a[href]", (as) =>
        Array.from(new Set(as.map((a) => a.getAttribute("href") ?? ""))).filter((h) =>
          h.startsWith("/"),
        ),
      );
      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of hrefs) {
        const res = await request.get(`${baseURL}${href}`);
        expect(res.status(), `broken link: ${href}`).toBeLessThan(400);
      }
    });
  }
});
