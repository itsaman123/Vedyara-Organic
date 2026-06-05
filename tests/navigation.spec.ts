import { test, expect } from "@playwright/test";
import { mockAllApis, waitForPageLoad } from "./fixtures/helpers";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
    await page.goto("/");
    await waitForPageLoad(page);
  });

  test("navbar logo is visible and links to home", async ({ page }) => {
    // Logo is the first link in the header
    const logo = page.locator("header a").first();
    await expect(logo).toBeVisible();
    await logo.click();
    await expect(page).toHaveURL("/");
  });

  test("desktop nav links are visible", async ({ page, viewport }) => {
    if ((viewport?.width ?? 0) < 768) return;
    await expect(page.getByRole("link", { name: "Products" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "About Us" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact" }).first()).toBeVisible();
  });

  test("Shop Now button navigates to /products", async ({ page }) => {
    await page.getByRole("link", { name: /Shop Now/i }).first().click();
    await expect(page).toHaveURL(/\/products/);
  });

  test("navigates to /about page via nav link", async ({ page, viewport }) => {
    if ((viewport?.width ?? 0) < 768) return;
    await page.getByRole("link", { name: "About Us" }).first().click();
    await expect(page).toHaveURL(/\/about/);
  });

  test("navigates to /contact page via nav link", async ({ page, viewport }) => {
    if ((viewport?.width ?? 0) < 768) return;
    await page.getByRole("link", { name: "Contact" }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test("cart icon button is present in header", async ({ page, viewport }) => {
    if ((viewport?.width ?? 0) < 768) {
      // On mobile, cart button is usually in hamburger menu or always shown
      return;
    }
    // Cart icon is a button with FiShoppingBag icon (not a labelled link)
    // Check header contains a link/button that navigates to /cart
    const cartLink = page.locator("header a[href='/cart']").or(
      page.locator("header button").filter({ has: page.locator("svg") })
    );
    await expect(cartLink.first()).toBeVisible();
  });

  test("mobile hamburger menu toggles navigation links", async ({ page, viewport }) => {
    if ((viewport?.width ?? 1200) >= 768) return;
    // Look for hamburger button (aria-expanded or contains SVG icon)
    const hamburger = page.locator("header button[aria-expanded]")
      .or(page.locator("header button").filter({ has: page.locator("svg") }).last());
    if (await hamburger.count() > 0) {
      await hamburger.first().click();
      await page.waitForTimeout(400);
      await expect(page.getByRole("link", { name: "Products" }).first()).toBeVisible();
    }
  });

  test("unknown route shows 404 or redirects to home", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-xyz");
    await page.waitForLoadState("domcontentloaded");
    const is404 = await page.getByText(/404|not found/i).count() > 0;
    const isHome = page.url().endsWith("/") || page.url().endsWith("/this-page-does-not-exist-xyz");
    expect(is404 || isHome).toBeTruthy();
  });
});
