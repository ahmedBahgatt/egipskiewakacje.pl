import { test, expect, type Page } from "@playwright/test";

/**
 * Regression guard for the "invisible tour link covers the page" bug.
 *
 * Root cause (fixed): TourCard's title link carried a
 * `::after { position:absolute; inset:0 }` stretched-link pseudo-element, but the
 * card was not a positioned containing block, so the pseudo-element resolved its
 * inset against the VIEWPORT and turned large blank areas of the page into an
 * invisible tour link. Clicking apparently empty space navigated to a tour.
 *
 * This test reproduces the user-observed behaviour: from a clean load, without
 * scrolling first, it (1) asserts no blank point OUTSIDE any tour card is owned by
 * a tour-card link, and (2) clicks genuinely non-interactive points and asserts
 * nothing navigates or opens a popup.
 */

const PAGES = [
  { name: "home", url: "/" },
  { name: "hurghada", url: "/wycieczki-z-hurghady/" },
  { name: "marsa-alam", url: "/wycieczki-z-marsa-alam/" },
  { name: "sharm", url: "/wycieczki-z-sharm-el-sheikh/" },
  { name: "all-tours", url: "/wycieczki/" },
  { name: "category-kair", url: "/wycieczki/kair-i-piramidy/" },
  { name: "cennik", url: "/cennik/" },
];

type Rect = { left: number; top: number; right: number; bottom: number };

function probePoints(width: number, height: number) {
  const pts: { x: number; y: number }[] = [];
  for (let gx = 1; gx <= 8; gx++) {
    for (let gy = 1; gy <= 6; gy++) {
      pts.push({
        x: Math.round((width * gx) / 9),
        y: Math.round((height * gy) / 7),
      });
    }
  }
  return pts;
}

async function cardRects(page: Page): Promise<Rect[]> {
  return page.$$eval('[data-testid="tour-card"]', (els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect();
      return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
    }),
  );
}

/** Classify a viewport point: is it inside a card, and what owns it? */
async function classify(page: Page, x: number, y: number) {
  return page.evaluate(
    ({ x, y }) => {
      const el = document.elementFromPoint(x, y);
      if (!el) return { empty: true, interactive: false, ownedByCardLink: false };
      const interactiveEl = el.closest(
        "a, button, [role=button], input, select, textarea, label, summary",
      );
      return {
        empty: false,
        interactive: !!interactiveEl,
        // A link that belongs to a tour card is the ghost-link signature.
        ownedByCardLink: !!el.closest('[data-testid="tour-card"] a'),
      };
    },
    { x, y },
  );
}

function insideAnyCard(rects: Rect[], x: number, y: number): boolean {
  return rects.some((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);
}

async function assertNoGhost(page: Page, label: string) {
  const vp = page.viewportSize()!;
  const rects = await cardRects(page);
  const startUrl = page.url();

  for (const pt of probePoints(vp.width, vp.height)) {
    const info = await classify(page, pt.x, pt.y);
    if (info.empty) continue;

    // (1) A point that is NOT geometrically inside any card must never be owned by
    // a tour-card link. Pre-fix this fails on hero / gap / background points.
    if (!insideAnyCard(rects, pt.x, pt.y)) {
      expect(
        info.ownedByCardLink,
        `${label}: blank point ${pt.x},${pt.y} outside every card is owned by a tour link (ghost link)`,
      ).toBe(false);
    }

    // (2) Behavioural: click only points the browser reports as non-interactive
    // and assert nothing navigates or opens a popup/tab.
    if (info.interactive) continue;
    await page.mouse.click(pt.x, pt.y);
    await page.waitForTimeout(40);
    expect(page.url(), `${label}: click at ${pt.x},${pt.y} changed the URL`).toBe(startUrl);
    expect(page.context().pages().length, `${label}: a popup/tab opened`).toBe(1);
  }
}

for (const p of PAGES) {
  test(`no ghost tour-link on ${p.name} (first viewport, no scroll)`, async ({ page }) => {
    await page.goto(p.url);
    await page.waitForLoadState("load");
    await assertNoGhost(page, `${p.name}`);
  });
}

test("no ghost navigation in the gaps of a scrolled card grid", async ({ page }) => {
  await page.goto("/wycieczki-z-hurghady/");
  await page.waitForLoadState("load");
  // Scroll a card grid into view, then probe the gaps between/around cards.
  const firstCard = page.locator('[data-testid="tour-card"]').first();
  await firstCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(120);
  await assertNoGhost(page, "hurghada scrolled grid");
});
