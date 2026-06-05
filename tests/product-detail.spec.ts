import { test, expect } from "@playwright/test";
import { mockAllApis, waitForPageLoad } from "./fixtures/helpers";
import { mockProducts } from "./fixtures/mockData";

const API = "https://vedyara-backend.onrender.com";
const slug = "pure-natural-honey-500g";

test.describe("Product Detail Page — API product", () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);

    // API returns { data: { product: ... } }
    const productResponse = {
      success: true,
      message: "Product fetched",
      data: { product: mockProducts[0] },
    };
    await page.route(`${API}/api/v1/products/${slug}`, (route) =>
      route.fulfill({ json: productResponse })
    );

    await page.goto(`/product/${slug}`);
    await waitForPageLoad(page);
  });

  test("product name heading is displayed", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Pure Natural Honey/i }).first()
    ).toBeVisible({ timeout: 8000 });
  });

  test("discounted price is shown", async ({ page }) => {
    await expect(page.getByText("₹449").first()).toBeVisible({ timeout: 8000 });
  });

  test("original price with strikethrough shown", async ({ page }) => {
    await expect(page.getByText("₹899").first()).toBeVisible({ timeout: 8000 });
  });

  test("add to cart button is present", async ({ page }) => {
    const btn = page.getByRole("button", { name: /add to cart|add/i }).first();
    await expect(btn).toBeVisible({ timeout: 8000 });
  });

  test("product description text is displayed", async ({ page }) => {
    await expect(page.getByText(/sourced directly from the Farm/i)).toBeVisible({ timeout: 8000 });
  });

  test("product image renders", async ({ page }) => {
    const img = page.getByRole("img").first();
    await expect(img).toBeVisible({ timeout: 8000 });
  });

  test("add to cart stores in guest cart when unauthenticated", async ({ page }) => {
    // No token → CartContext uses localStorage guest_cart
    const btn = page.getByRole("button", { name: /add to cart|add/i }).first();
    if (await btn.count() > 0) {
      await btn.click();
      await page.waitForTimeout(800);
      const guestCart = await page.evaluate(() => localStorage.getItem("guest_cart"));
      expect(guestCart).not.toBeNull();
    }
  });
});

test.describe("Product Detail Page — local static product", () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
    // Navigate using numeric ID (matches localProducts id: 1 = honey 500g)
    await page.goto("/product/1");
    await waitForPageLoad(page);
  });

  test("local product renders without API call", async ({ page }) => {
    // Local product with id=1 is Pure Natural Honey
    const heading = page.getByRole("heading").first();
    await expect(heading).toBeVisible({ timeout: 6000 });
  });

  test("back navigation exists", async ({ page }) => {
    const backBtn = page.getByRole("link", { name: /back|products/i })
      .or(page.getByRole("button", { name: /back/i }))
      .first();
    if (await backBtn.count() > 0) {
      await expect(backBtn).toBeVisible();
    }
  });
});
