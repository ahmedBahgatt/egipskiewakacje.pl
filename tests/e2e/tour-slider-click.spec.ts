import { test, expect, type Page, type Locator } from "@playwright/test";

/**
 * Regression guard for the homepage tour carousel (`TourSlider`).
 *
 * Root cause fixed: the viewport called `setPointerCapture` on pointerdown, so
 * Chromium retargeted the trailing `click` to the capturing viewport and a plain
 * DESKTOP click never reached a card's <a> - the tour did not open (mobile tap,
 * whose click is hit-tested at the touch point, still worked). Capture is now
 * deferred until a real horizontal drag begins, so:
 *   - a click/tap navigates via the real crawlable <a href>
 *   - a drag/swipe suppresses the trailing click (no accidental navigation)
 *   - the belt / arrows / autoplay / infinite loop are unchanged
 *
 * The pointer logic under test is identical with or without the drift belt, so
 * these tests run under prefers-reduced-motion (belt disabled) to keep card
 * positions stable and the assertions deterministic.
 */

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

async function firstRealCard(page: Page): Promise<Locator> {
  const card = page.locator('[data-testid="tour-slider"] a[data-slide-card="real"]').first();
  await card.scrollIntoViewIfNeeded();
  await expect(card).toBeVisible();
  return card;
}

test.describe("homepage tour carousel", () => {
  test("every slider card (real + clone) has a real crawlable tour href", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");

    const hrefs = await page
      .locator('[data-testid="tour-slider"] a[data-slide-card]')
      .evaluateAll((els) => els.map((el) => (el as HTMLAnchorElement).getAttribute("href")));

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href, "slider card must carry a real href").toBeTruthy();
      // canonical tour route under a departure hub, trailing slash
      expect(href!).toMatch(/^\/wycieczki-z-[a-z-]+\/[a-z0-9-]+\/$/);
    }

    // Clones exist (3x track) and also carry valid hrefs - no dead cloned cards.
    const clones = await page
      .locator('[data-testid="tour-slider"] a[data-slide-card="clone"][href]')
      .count();
    expect(clones).toBeGreaterThan(0);
  });

  test("clicking a card navigates to its tour page (desktop + mobile)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    const card = await firstRealCard(page);
    const href = await card.getAttribute("href");
    expect(href).toBeTruthy();

    await card.click();
    await page.waitForURL(`**${href}`);
    expect(new URL(page.url()).pathname).toBe(href);
  });

  test("dragging the carousel does NOT navigate", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop-chromium",
      "mouse-drag variant runs on desktop; touch swipe is covered separately",
    );
    await page.goto("/");
    await page.waitForLoadState("load");
    const card = await firstRealCard(page);
    const box = await card.boundingBox();
    if (!box) throw new Error("no card box");
    const startUrl = page.url();

    const cy = box.y + box.height / 2;
    const cx = box.x + Math.min(box.width / 2, 120);
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    // Real horizontal drag well past the 6px threshold.
    for (let i = 1; i <= 6; i++) {
      await page.mouse.move(cx - i * 30, cy);
    }
    await page.mouse.up();
    await page.waitForTimeout(150);

    expect(page.url(), "a drag must not navigate").toBe(startUrl);
    expect(page.context().pages().length, "a drag must not open a tab").toBe(1);
  });

  test("swiping the carousel does NOT navigate (touch)", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name === "desktop-chromium",
      "touch swipe runs on mobile (touch) projects only",
    );
    await page.goto("/");
    await page.waitForLoadState("load");
    const card = await firstRealCard(page);
    const box = await card.boundingBox();
    if (!box) throw new Error("no card box");
    const startUrl = page.url();

    // A real horizontal touch drag: same code path as mouse (axis-lock -> capture
    // -> click suppression). Dispatched as pointerType "touch" from the card.
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    await card.dispatchEvent("pointerdown", { pointerId: 1, clientX: cx, clientY: cy, pointerType: "touch", isPrimary: true, bubbles: true });
    for (let i = 1; i <= 6; i++) {
      await card.dispatchEvent("pointermove", { pointerId: 1, clientX: cx - i * 30, clientY: cy, pointerType: "touch", bubbles: true });
    }
    await card.dispatchEvent("pointerup", { pointerId: 1, clientX: cx - 180, clientY: cy, pointerType: "touch", bubbles: true });
    // The trailing click after a real drag must be suppressed by onClickCapture
    // (moved > 6 -> preventDefault + stopPropagation). If suppression regressed,
    // this dispatched click would follow the anchor and change the URL.
    await card.dispatchEvent("click", { bubbles: true, cancelable: true });
    await page.waitForTimeout(150);

    expect(page.url(), "a swipe must not navigate").toBe(startUrl);
    expect(page.context().pages().length, "a swipe must not open a tab").toBe(1);
  });
});
