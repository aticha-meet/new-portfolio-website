import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL || "msedge",
});
const results = [];
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
    });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.__portfolioMetrics = { lcp: 0, cls: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          window.__portfolioMetrics.lcp = entry.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          if (!entry.hadRecentInput)
            window.__portfolioMetrics.cls += entry.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto(process.env.PERFORMANCE_URL || "http://localhost:3000", {
      waitUntil: "networkidle",
    });
    // A fixed observation window allows late font/image shifts to be included.
    await page.waitForTimeout(2000);
    const metrics = await page.evaluate(() => ({
      ...window.__portfolioMetrics,
      fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime,
      transferBytes: performance
        .getEntriesByType("resource")
        .reduce((sum, entry) => sum + entry.transferSize, 0),
    }));
    results.push({ width, ...metrics });
    await context.close();
  }
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/performance.json",
    JSON.stringify(
      {
        environment:
          "Local production build; Edge Chromium; fresh browser contexts; no CPU/network throttling; not real-device Core Web Vitals",
        results,
      },
      null,
      2,
    ),
  );
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
