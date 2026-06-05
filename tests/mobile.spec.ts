import { test, expect } from "@playwright/test";
import { mockAllApis, waitForPageLoad } from "./fixtures/helpers";

test.describe("Mobile Responsive Layout", () => {
  test.use({ viewport: { width: 393, height: 851 } });

  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
    await page.goto("/");
    await waitForPageLoad(page);
  });

  test("hero headline is readable on mobile", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Pure Goodness/i })).toBeVisible();
  });

  test("trust banner is in DOM (scrolling marquee)", async ({ page }) => {
    // Items are in a scrolling container — check DOM presence
    await expect(page.getByText(/Lab Tested Every Batch/i).first()).toBeAttached();
  });

  test("no horizontal overflow on home page", async ({ page }) => {
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyScrollWidth).toBeLessThanOrEqual(viewportWidth + 4);
  });

  test("product comparison shows stacked cards on mobile (table hidden)", async ({ page }) => {
    // Desktop table is hidden (hidden md:block), mobile cards visible (md:hidden)
    await page.getByRole("heading", { name: /Vedyara vs/i }).scrollIntoViewIfNeeded();

    // Check that the feature label is visible (mobile card view renders it)
    const featureLabel = page.getByText(/Processing Method/i).first();
    await expect(featureLabel).toBeAttached();

    // Table wrapper should be hidden on mobile
    const tableWrapper = page.locator(".hidden").filter({ has: page.locator(".grid-cols-3") });
    if (await tableWrapper.count() > 0) {
      const display = await tableWrapper.evaluate((el) => getComputedStyle(el).display);
      expect(display).toBe("none");
    }
  });

  test("educational section tabs are all visible vertically on mobile", async ({ page }) => {
    await page.getByRole("heading", { name: /Education Hub/i }).scrollIntoViewIfNeeded();
    await expect(page.getByText(/Why Honey Crystallizes/i)).toBeVisible();
    await expect(page.getByText(/Purity Test at Home/i)).toBeVisible();
    await expect(page.getByText(/Why Choose Raw Honey/i)).toBeVisible();
  });

  test("educational tab click works on mobile", async ({ page }) => {
    await page.getByText(/Purity Test at Home/i).scrollIntoViewIfNeeded();
    await page.getByText(/Purity Test at Home/i).click();
    await expect(page.getByText(/3 Simple Purity Tests/i)).toBeVisible({ timeout: 3000 });
  });

  test("combo packs are visible on mobile", async ({ page }) => {
    await page.getByText(/Immunity Combo/i).scrollIntoViewIfNeeded();
    await expect(page.getByText(/Immunity Combo/i)).toBeVisible();
    await expect(page.getByText(/Kitchen Essentials/i)).toBeVisible();
  });

  test("farm to home vertical timeline steps are in DOM", async ({ page }) => {
    await page.getByRole("heading", { name: /Farm to/i }).scrollIntoViewIfNeeded();
    await expect(page.getByText("Bee Farm").first()).toBeAttached();
    await expect(page.getByText("Your Door").first()).toBeAttached();

    // Horizontal desktop layout should be hidden on mobile
    const desktopLayout = page.locator(".hidden.lg\\:block");
    if (await desktopLayout.count() > 0) {
      const display = await desktopLayout.evaluate((el) => getComputedStyle(el).display);
      expect(display).toBe("none");
    }
  });

  test("mobile sticky CTA Shop Now bar is visible", async ({ page }) => {
    // The sticky bar has class md:hidden so it's only shown on mobile
    const stickyLink = page.locator("a[href='/products']").filter({ hasText: /Shop Now/i }).last();
    await expect(stickyLink).toBeVisible();
  });

  test("no horizontal overflow on products page", async ({ page }) => {
    await page.goto("/products");
    await waitForPageLoad(page);
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyScrollWidth).toBeLessThanOrEqual(viewportWidth + 4);
  });
});
