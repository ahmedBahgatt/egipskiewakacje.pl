import { defineConfig, devices } from "@playwright/test";

/**
 * E2E tests run against the real static export (the same `out/` that ships to
 * GitHub Pages), served by a tiny zero-dependency Node static server. This
 * exercises the production artifact, not the dev server.
 */
const PORT = 4321;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  timeout: 30_000,
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    // Mobile Chromium (Pixel 5) - runs in CI without a separate WebKit download.
    { name: "mobile-chromium", use: { ...devices["Pixel 5"] } },
    // Mobile WebKit - run locally for real Safari-engine coverage.
    { name: "mobile-safari", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: `node tests/serve-out.mjs ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
