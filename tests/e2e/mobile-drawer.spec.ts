import { test, expect } from "@playwright/test";

/**
 * Regression guard for the Android inner-page drawer bug.
 *
 * ROOT CAUSE (fixed): the mobile drawer is `position: fixed`, but it used to be a
 * DOM descendant of <header>, which carries `backdrop-filter`. A `backdrop-filter`
 * ancestor becomes the containing block for fixed-position descendants, so the
 * drawer's `inset: 0` resolved to the 72px-tall header box instead of the viewport:
 * the backdrop covered only the header strip and the panel was clipped/misplaced.
 * It only *looked* fine on the homepage because the leaked area was the dark hero;
 * on inner pages the leaked area is white/cream, so the breakage was obvious.
 *
 * FIX: the drawer is rendered through a React portal into <body>, escaping the
 * header's containing block. These assertions fail loudly if that regresses on ANY
 * page type - the home page is deliberately included so we can never "fix" inner
 * pages by breaking home again.
 */

const PAGES: { name: string; path: string }[] = [
  { name: "home", path: "/" },
  { name: "all-tours", path: "/wycieczki/" },
  { name: "destination (Marsa Alam)", path: "/wycieczki-z-marsa-alam/" },
  { name: "destination (Hurghada)", path: "/wycieczki-z-hurghady/" },
  { name: "category (Nurkowanie)", path: "/wycieczki/nurkowanie/" },
  { name: "tour detail", path: "/wycieczki-z-marsa-alam/abu-dabbab/" },
  { name: "guide article", path: "/poradnik/co-zabrac-na-wycieczke-do-kairu/" },
];

test.describe("mobile drawer - cross-page geometry", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const { name, path } of PAGES) {
    test(`drawer covers the viewport on ${name}`, async ({ page }) => {
      await page.goto(path);
      await page.getByRole("button", { name: "Otwórz menu" }).click();

      const dialog = page.getByRole("dialog", { name: "Menu" });
      await expect(dialog).toBeVisible();
      // Wait for the slide-in animation to settle so we measure the resting
      // geometry, not a frame mid-transform.
      await page.waitForFunction(
        () => getComputedStyle(document.getElementById("mobile-menu")!).transform === "none",
      );

      const vp = page.viewportSize()!;

      // The whole drawer subtree (root = the fixed overlay) must be portaled out of
      // the header and cover the FULL viewport - width and height. A 72px-tall root
      // is the exact signature of the containing-block bug.
      const geo = await page.evaluate(() => {
        const panel = document.getElementById("mobile-menu");
        const root = panel?.parentElement as HTMLElement;
        const backdrop = root?.firstElementChild as HTMLElement;
        const r = root.getBoundingClientRect();
        const b = backdrop.getBoundingClientRect();
        const p = panel!.getBoundingClientRect();
        return {
          rootParentTag: root.parentElement?.tagName,
          root: { x: r.x, y: r.y, w: r.width, h: r.height },
          backdrop: { w: b.width, h: b.height },
          panel: { x: p.x, right: p.right, w: p.width, h: p.height },
          docOverflowX:
            document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });

      // Portaled to <body> - escapes the header's backdrop-filter containing block.
      expect(geo.rootParentTag).toBe("BODY");

      // Root overlay + backdrop fill the whole viewport (not just the 72px header).
      expect(geo.root.x).toBe(0);
      expect(geo.root.y).toBe(0);
      expect(geo.root.w).toBeGreaterThanOrEqual(vp.width - 1);
      expect(geo.root.h).toBeGreaterThanOrEqual(vp.height - 1);
      expect(geo.backdrop.w).toBeGreaterThanOrEqual(vp.width - 1);
      expect(geo.backdrop.h).toBeGreaterThanOrEqual(vp.height - 1);

      // Panel is a right-aligned sheet fully inside the viewport - no negative-X
      // displacement, no overflow past the right edge, expected ~min(400,88vw).
      expect(geo.panel.x).toBeGreaterThanOrEqual(0);
      expect(geo.panel.right).toBeLessThanOrEqual(vp.width + 1);
      expect(geo.panel.w).toBeGreaterThan(vp.width * 0.6);
      expect(geo.panel.w).toBeLessThanOrEqual(400 + 1);
      expect(geo.panel.h).toBeGreaterThanOrEqual(vp.height - 1);

      // Opening the drawer must never introduce horizontal page overflow.
      expect(geo.docOverflowX).toBeLessThanOrEqual(0);

      // Close control and menu content are visible and usable.
      await expect(dialog.getByRole("button", { name: "Zamknij menu" })).toBeVisible();
      await expect(dialog.getByRole("link", { name: "O nas" })).toBeVisible();
    });
  }

  test("drawer stays viewport-pinned after scrolling down an inner page", async ({ page }) => {
    await page.goto("/wycieczki-z-marsa-alam/");
    await page.evaluate(() => window.scrollTo(0, 1400));
    await page.getByRole("button", { name: "Otwórz menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    await page.waitForFunction(
      () => getComputedStyle(document.getElementById("mobile-menu")!).transform === "none",
    );

    const geo = await page.evaluate(() => {
      const panel = document.getElementById("mobile-menu");
      const root = panel?.parentElement as HTMLElement;
      const r = root.getBoundingClientRect();
      return { top: r.top, height: r.height, vh: window.innerHeight };
    });
    // Pinned to the top of the viewport regardless of scroll offset.
    expect(Math.abs(geo.top)).toBeLessThanOrEqual(1);
    expect(geo.height).toBeGreaterThanOrEqual(geo.vh - 1);
  });
});
