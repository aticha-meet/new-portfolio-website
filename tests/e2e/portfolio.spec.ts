import { projectDisplay } from "../../config/projects";

const displayedProjects = (total: number) =>
  Math.min(projectDisplay.limit ?? total, total);

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("responsive layout, images, navigation targets and accessibility", async ({
  page,
}) => {
  test.setTimeout(90_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page).toHaveTitle(/Aticha Meetunyakron/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    for (const section of ["about", "experience", "projects", "contact"])
      await expect(page.locator(`#${section}`)).toBeVisible();
    // Load lazy images and let the scroll reveals settle before visual evidence.
    for (const image of await page.locator("main img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      await expect(image).not.toHaveJSProperty("naturalWidth", 0);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    const missingTargets = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href")!)
          .filter((href) => !document.getElementById(href.slice(1))),
      );
    expect(missingTargets).toEqual([]);
    if (width === 390 || width === 1440) {
      await page.evaluate(async () => {
        await Promise.allSettled(
          document.getAnimations().map((animation) => animation.finished),
        );
      });
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations).toEqual([]);
      await page.screenshot({
        path: `artifacts/portfolio-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
      await page.screenshot({
        path: `artifacts/portfolio-${width}-hero.png`,
        animations: "disabled",
      });
    }
  }
  expect(errors).toEqual([]);
});

test("mobile menu opens, navigates, and restores focus on Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("filters show the right projects and can reset", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator(".project-card");
  await expect(cards).toHaveCount(displayedProjects(12));
  await page.getByRole("button", { name: "Backend", exact: true }).click();
  await expect(cards).toHaveCount(displayedProjects(2));
  await expect(
    page.getByRole("heading", { name: "From database to API" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(cards).toHaveCount(displayedProjects(1));
  await expect(
    page.getByRole("heading", { name: "Currency, converted." }),
  ).toBeVisible();
  await page.getByRole("button", { name: /All projects/ }).click();
  await expect(cards).toHaveCount(displayedProjects(12));
  await page.getByRole("button", { name: "Full-stack", exact: true }).click();
  await expect(cards).toHaveCount(displayedProjects(3));
  await expect(
    cards.getByRole("heading", { name: "Adapter Website CMS", exact: true }),
  ).toBeVisible();
  await expect(cards.locator('a[href^="https://github.com/"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Automation", exact: true }).click();
  await expect(cards).toHaveCount(displayedProjects(1));
  await expect(
    cards.getByRole("heading", {
      name: "Google Classroom Automation",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Robotics", exact: true }).click();
  await expect(cards).toHaveCount(displayedProjects(3));
  await expect(cards.locator("img")).toHaveCount(displayedProjects(3));
  await page.getByRole("button", { name: /All projects/ }).click();
  await expect(cards).toHaveCount(displayedProjects(12));
  await page
    .locator("#projects")
    .getByRole("link", { name: "Explore activities on Beyond" })
    .click();
  await expect(page).toHaveURL(/\/beyond$/);
  await expect(page.locator("#community")).toBeVisible();
});

test("form validates and prepares a draft without claiming it was sent", async ({
  page,
}) => {
  await page.goto("/#contact");
  const submit = page.getByRole("button", {
    name: "Prepare email",
    exact: true,
  });
  test.skip(
    !(await submit.count()),
    "Live delivery configured; do not send a real message.",
  );
  await submit.click();
  expect(
    await page
      .locator("input[name=name]")
      .evaluate((input: HTMLInputElement) => input.validity.valueMissing),
  ).toBe(true);
  await page.getByLabel("Your name", { exact: true }).fill("Test Visitor");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("visitor@example.com");
  await page
    .getByLabel("What’s on your mind?", { exact: true })
    .fill("A question & an idea");
  await page
    .getByLabel("Your message", { exact: true })
    .fill("I would like to discuss an interesting project.");
  await submit.click();
  await expect(page.getByRole("status")).toContainText("Your draft is ready");
  const link = page.getByRole("link", { name: "Open email draft" });
  await expect(link).toHaveAttribute(
    "href",
    /^mailto:aticha0991862895@gmail.com\?subject=/,
  );
  expect(
    new URL((await link.getAttribute("href"))!).searchParams.get("subject"),
  ).toBe("A question & an idea");
  await expect(page.getByRole("status")).not.toContainText("has been sent");
});

test("contact API rejects invalid requests without emailing anyone", async ({
  request,
}) => {
  expect((await request.get("/api/contact")).status()).toBe(405);
  expect((await request.post("/api/contact", { data: {} })).status()).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        data: {},
        headers: { Origin: "https://unrelated.example" },
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/contact", {
        data: "invalid",
        headers: { "Content-Type": "text/plain" },
      })
    ).status(),
  ).toBe(415);
  expect(
    (
      await request.post("/api/contact", {
        data: "x".repeat(16001),
        headers: { "Content-Type": "application/json" },
      })
    ).status(),
  ).toBe(413);
});

test("portfolio remains readable without JavaScript and with reduced motion", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "reduce",
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3010");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".project-card")).toHaveCount(
    displayedProjects(12),
  );
  await expect(page.locator(".contact-email")).toBeVisible();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await context.close();
});
