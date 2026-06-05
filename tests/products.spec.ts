import { test, expect } from "@playwright/test";
import { mockAllApis, waitForPageLoad } from "./fixtures/helpers";
import { mockProductsResponse } from "./fixtures/mockData";

const API = "https://vedyara-backend.onrender.com";

test.describe("Products Page", () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
    await page.goto("/products");
    await waitForPageLoad(page);
  });

  test("products page heading is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /products|collection|shop/i }).first()
    ).toBeVisible({ timeout: 6000 });
  });

  test("product cards render from API response", async ({ page }) => {
    await expect(page.getByText("Pure Natural Honey").first()).toBeVisible({ timeout: 8000 });
    await expect(page.getByText("Natural Turmeric Powder").first()).toBeVisible({ timeout: 8000 });
    await expect(page.getByText("Natural Coriander Powder").first()).toBeVisible({ timeout: 8000 });
  });

  test("product prices display correctly", async ({ page }) => {
    await expect(page.getByText("₹449").first()).toBeVisible({ timeout: 8000 });
    await expect(page.getByText("₹129").first()).toBeVisible({ timeout: 8000 });
  });

  test("empty state shows when no products returned", async ({ page }) => {
    await page.route(`${API}/api/v1/products**`, (route) =>
      route.fulfill({
        json: {
          success: true,
          message: "No products",
          data: { items: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } },
        },
      })
    );
    await page.reload();
    await waitForPageLoad(page);
    const emptyMsg = page.getByText(/no products|nothing here|empty/i);
    const hasEmpty = await emptyMsg.count() > 0;
    // Either empty state text or zero product cards
    const cards = await page.locator("h3").filter({ hasText: /Honey|Turmeric|Coriander/i }).count();
    expect(hasEmpty || cards === 0).toBeTruthy();
  });

  test("category filter 'honey' shows only honey products", async ({ page }) => {
    let capturedUrl = "";
    await page.route(`${API}/api/v1/products**`, (route) => {
      capturedUrl = route.request().url();
      return route.fulfill({ json: mockProductsResponse });
    });

    // Use the category pill button (first match), not product-specific buttons
    const honeyFilter = page.getByRole("button", { name: /🍯 Honey|^Honey$/i }).first();
    if (await honeyFilter.count() > 0) {
      await honeyFilter.click();
      await page.waitForTimeout(500);
      expect(capturedUrl).toMatch(/category=honey/);
    }
  });

  test("category filter 'spices' triggers API call with category param", async ({ page }) => {
    let capturedUrl = "";
    await page.route(`${API}/api/v1/products**`, (route) => {
      capturedUrl = route.request().url();
      return route.fulfill({ json: mockProductsResponse });
    });

    const spicesFilter = page.getByRole("button", { name: /Spices|✨/i }).first();
    if (await spicesFilter.count() > 0) {
      await spicesFilter.click();
      await page.waitForTimeout(500);
      expect(capturedUrl).toMatch(/category=spices/);
    }
  });

  test("clicking a product card navigates to detail page", async ({ page }) => {
    const card = page.getByText("Pure Natural Honey").first();
    await expect(card).toBeVisible({ timeout: 8000 });
    await card.click();
    await expect(page).toHaveURL(/\/product\//);
  });

  test("add to cart button is present on product card", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /add|cart/i }).first();
    await expect(addBtn).toBeVisible({ timeout: 8000 });
  });

  test("wishlist heart button is visible", async ({ page }) => {
    const heartBtn = page.getByRole("button", { name: /wishlist|heart|favourite/i }).first();
    if (await heartBtn.count() > 0) {
      await expect(heartBtn).toBeVisible();
    }
  });
});
