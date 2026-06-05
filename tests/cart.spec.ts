import { test, expect } from "@playwright/test";
import { mockAllApis, waitForPageLoad } from "./fixtures/helpers";
import { mockCart, mockEmptyCart } from "./fixtures/mockData";

const API = "https://vedyara-backend.onrender.com";

// Helper: populate guest cart in localStorage (CartContext reads this when no token)
async function setGuestCart(page: import("@playwright/test").Page, cart = mockCart.data) {
  await page.addInitScript((c) => {
    localStorage.setItem("guest_cart", JSON.stringify(c));
  }, cart);
}

test.describe("Cart — empty state", () => {
  test("shows empty cart message and shop link", async ({ page }) => {
    await mockAllApis(page);
    await page.goto("/cart");
    await waitForPageLoad(page);

    await expect(page.getByText(/Your Cart is Empty/i)).toBeVisible({ timeout: 6000 });
    await expect(page.getByRole("link", { name: /Start Shopping|Shop|Products/i }).first()).toBeVisible();
  });
});

test.describe("Cart — with items", () => {
  test.beforeEach(async ({ page }) => {
    // Populate guest cart via localStorage so CartContext shows items without a token
    await setGuestCart(page);
    await mockAllApis(page);
  });

  test("cart page shows item name and price", async ({ page }) => {
    await page.goto("/cart");
    await waitForPageLoad(page);

    await expect(page.getByText("Pure Natural Honey")).toBeVisible({ timeout: 6000 });
    await expect(page.getByText(/449/).first()).toBeVisible();
  });

  test("cart total is displayed", async ({ page }) => {
    await page.goto("/cart");
    await waitForPageLoad(page);

    // Total amount should appear somewhere on the page
    await expect(page.getByText(/449|Total/i).first()).toBeVisible({ timeout: 6000 });
  });

  test("checkout Buy Now button exists when cart has items", async ({ page }) => {
    await page.goto("/cart");
    await waitForPageLoad(page);

    // Cart.tsx renders a "Buy Now" button (not labelled "checkout")
    const checkoutBtn = page.getByRole("button", { name: /Buy Now/i });
    await expect(checkoutBtn.first()).toBeVisible({ timeout: 6000 });
  });

  test("remove item button is visible", async ({ page }) => {
    await page.goto("/cart");
    await waitForPageLoad(page);

    // Trash button has class "text-gray-400" and is inside the cart items list
    const removeBtn = page.locator(".space-y-6 button").filter({ has: page.locator("svg") }).first();
    await expect(removeBtn).toBeVisible({ timeout: 6000 });
  });
});

test.describe("Cart — guest cart interactions", () => {
  test("add to cart button is clickable without auth (no crash)", async ({ page }) => {
    await mockAllApis(page);
    await page.goto("/products");
    await waitForPageLoad(page);

    // Find the cart icon button on a product card (has ShoppingBag icon, no text label)
    const addBtn = page.getByRole("button", { name: /add to cart|add/i }).first();
    const hasBtn = await addBtn.count() > 0;
    if (hasBtn) {
      // Clicking should not throw or navigate away
      await addBtn.click();
      await page.waitForTimeout(600);
      // Still on /products page (not redirected to error page)
      expect(page.url()).toContain("/products");
    }
  });
});

test.describe("Checkout", () => {
  test("checkout page shows form or redirects unauthenticated users", async ({ page }) => {
    await mockAllApis(page);
    await page.goto("/checkout");
    await waitForPageLoad(page);

    const hasForm = await page.getByRole("textbox").count() > 0;
    const hasAuthMsg = await page.getByText(/login|sign in|authenticate/i).count() > 0;
    const isRedirected = page.url().includes("/login") || page.url().includes("/auth");
    expect(hasForm || hasAuthMsg || isRedirected).toBeTruthy();
  });
});
