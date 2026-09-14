import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  use: {
    baseURL: "http://localhost:3010",
    browserName: "chromium",
    channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL || "msedge",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm start --port 3010",
    url: "http://localhost:3010",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
