import { test, expect } from "@playwright/test";

// Clean first-visit state (overrides the project's seeded consent) so the banner
// actually appears for these tests.
test.use({ storageState: { cookies: [], origins: [] } });

const bannerName = "Zgoda na analitykę";

test.describe("analytics consent banner", () => {
  test("appears on first visit; Accept grants analytics, persists, and does not reappear", async ({
    page,
  }) => {
    await page.goto("/");
    const banner = page.getByRole("region", { name: bannerName });
    await expect(banner).toBeVisible();
    // No stored choice before the visitor decides.
    expect(await page.evaluate(() => localStorage.getItem("ew_consent_v1"))).toBeNull();

    await banner.getByRole("button", { name: "Akceptuję" }).click();
    await expect(banner).toBeHidden();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("ew_consent_v1")))
      .toBe("granted");

    // A consent update to granted was pushed (analytics_storage only).
    const grantedUpdate = await page.evaluate(() => {
      const dl = (window as unknown as { dataLayer?: ArrayLike<unknown>[] }).dataLayer || [];
      return dl
        .map((a) => Array.from(a as ArrayLike<unknown>))
        .some(
          (e) =>
            e[0] === "consent" &&
            e[1] === "update" &&
            (e[2] as { analytics_storage?: string })?.analytics_storage === "granted",
        );
    });
    expect(grantedUpdate).toBe(true);

    // Does not reappear on the next navigation.
    await page.reload();
    await expect(page.getByRole("region", { name: bannerName })).toBeHidden();
  });

  test("Reject keeps analytics denied and can be reopened from the footer", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("region", { name: bannerName });
    await expect(banner).toBeVisible();

    await banner.getByRole("button", { name: "Odrzucam" }).click();
    await expect(banner).toBeHidden();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("ew_consent_v1")))
      .toBe("denied");

    // Reopen via the footer "Ustawienia cookies" control.
    await page.getByRole("button", { name: "Ustawienia cookies" }).click();
    await expect(page.getByRole("region", { name: bannerName })).toBeVisible();
  });
});
