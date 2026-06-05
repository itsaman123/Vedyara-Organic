import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,   // 1 retry locally catches flaky server-startup timeouts
  workers: process.env.CI ? 1 : 2,   // limit workers so dev server isn't overwhelmed
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }], ["list"]],
  timeout: 60_000,                    // per-test timeout (default 30s was shorter than webServer.timeout)
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 15_000,            // slightly more generous for slow dev server responses
    navigationTimeout: 45_000,        // explicit navigation timeout
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,                 // give Vite up to 2 min on cold start (Windows can be slow)
  },
});
