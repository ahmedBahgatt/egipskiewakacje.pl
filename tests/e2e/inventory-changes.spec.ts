import { test, expect } from "@playwright/test";

/**
 * Guards the owner-requested inventory correction:
 *  - the 5 PADI course products are removed (routes 404)
 *  - the 2 new Sharm tours exist, are distinct, and are wired into the site.
 */

const REMOVED = [
  "/wycieczki-z-marsa-alam/kurs-padi-open-water/",
  "/wycieczki-z-marsa-alam/kurs-padi-advanced-open-water/",
  "/wycieczki-z-marsa-alam/kurs-padi-rescue-diver/",
  "/wycieczki-z-hurghady/kurs-padi-open-water/",
  "/wycieczki-z-hurghady/kurs-padi-advanced-open-water/",
];

test.describe("removed PADI courses return 404", () => {
  for (const url of REMOVED) {
    test(`404: ${url}`, async ({ page }) => {
      const res = await page.goto(url);
      expect(res?.status(), `${url} should 404`).toBe(404);
    });
  }
});

test.describe("new Sharm tours", () => {
  test("Cairo by plane (Muzeum Egipskie) - distinct from the GEM variant", async ({ page }) => {
    const res = await page.goto(
      "/wycieczki-z-sharm-el-sheikh/kair-samolotem-muzeum-egipskie-piramidy/",
    );
    expect(res?.status()).toBe(200);
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toContainText("Muzeum Egipskie");
    expect(await h1.textContent()).not.toContain("GEM"); // not the GEM-by-plane page
    const html = await page.content();
    expect(html).toContain("255"); // adult price
    expect(html).toContain("230"); // child price
    await expect(page.locator("#rezerwacja")).toHaveCount(1);
  });

  test("St Catherine monastery - day trip, NO Mount Moses ascent", async ({ page }) => {
    const res = await page.goto("/wycieczki-z-sharm-el-sheikh/klasztor-sw-katarzyny-synaj/");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Klasztor św. Katarzyny");
    const html = await page.content();
    expect(html).toContain("33"); // adult price
    expect(html).toContain("17"); // child 5-11 price
    // The tour's OWN content (everything before the "Podobne wycieczki" related-tours
    // section) must NOT present the night ascent / sunrise summit as an activity. The
    // related section legitimately links to the separate ascent tour.
    const ownContent = html.split("Podobne wycieczki")[0];
    expect(ownContent).not.toContain("Wschód słońca na szczycie");
    expect(ownContent).not.toContain("Nocne wejście na Górę Mojżesza");
    await expect(page.locator("#rezerwacja")).toHaveCount(1);
  });

  test("both new tours are in the sitemap; no PADI course is", async ({ request, baseURL }) => {
    const xml = await (await request.get(`${baseURL}/sitemap.xml`)).text();
    expect(xml).toContain("/wycieczki-z-sharm-el-sheikh/kair-samolotem-muzeum-egipskie-piramidy/");
    expect(xml).toContain("/wycieczki-z-sharm-el-sheikh/klasztor-sw-katarzyny-synaj/");
    expect(xml).not.toContain("kurs-padi");
  });

  test("new tours appear on the Sharm destination page", async ({ page }) => {
    await page.goto("/wycieczki-z-sharm-el-sheikh/");
    const html = await page.content();
    expect(html).toContain("kair-samolotem-muzeum-egipskie-piramidy");
    expect(html).toContain("klasztor-sw-katarzyny-synaj");
    expect(html).not.toContain("kurs-padi");
  });

  test("cennik lists the new tours and no PADI course", async ({ page }) => {
    await page.goto("/cennik/");
    const html = await page.content();
    expect(html).toContain("Kair samolotem");
    expect(html).toContain("Klasztor św. Katarzyny");
    expect(html).not.toContain("kurs-padi");
    expect(html).not.toContain("PADI");
  });
});
