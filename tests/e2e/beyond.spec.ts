import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("appendix shows activities, opens photo galleries and links back to projects", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("link", { name: "Beyond", exact: true }).click();
  await expect(page).toHaveURL(/\/beyond$/);
  await expect(page).toHaveTitle(/Beyond the Code/);
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Beyond", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(page.locator("#teaching .activity-card")).toHaveCount(2);
  await expect(page.locator("#community .activity-card")).toHaveCount(4);
  const gallery = page.locator("#teaching-assistant details");
  await gallery.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(gallery).toHaveAttribute("open", "");
  const photo = gallery.locator("img");
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toBeVisible();
  await expect(photo).not.toHaveJSProperty("naturalWidth", 0);
  await gallery.locator("summary").click();
  await expect(gallery).not.toHaveAttribute("open", "");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator(".project-card")).toHaveCount(5);
});

test("appendix supports mobile navigation, responsive photos and accessibility", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/beyond");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    for (const image of await page.locator(".activity-cover img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      await expect(image).not.toHaveJSProperty("naturalWidth", 0);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const missing = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .filter(
            (link) =>
              !document.getElementById(link.getAttribute("href")!.slice(1)),
          )
          .map((link) => link.getAttribute("href")),
      );
    expect(missing).toEqual([]);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    if (width === 390 || width === 1440) {
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      await page.screenshot({
        path: `artifacts/beyond-${width}.png`,
        fullPage: true,
      });
    }
    if (width === 390) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "Contact", exact: true })
        .click();
      await expect(page).toHaveURL(/\/#contact$/);
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toHaveAttribute("aria-expanded", "false");
    }
  }
  expect(errors).toEqual([]);
});
