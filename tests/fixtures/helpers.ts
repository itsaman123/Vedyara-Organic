import type { Page } from "@playwright/test";
import { mockProductsResponse, mockEmptyCart, mockWishlist } from "./mockData";

const API = "https://vedyara-backend.onrender.com";

/** Mock all backend API calls so tests run without a live server. */
export async function mockAllApis(page: Page) {
  await page.route(`${API}/api/v1/products**`, (route) =>
    route.fulfill({ json: mockProductsResponse })
  );
  await page.route(`${API}/api/v1/cart**`, (route) =>
    route.fulfill({ json: mockEmptyCart })
  );
  await page.route(`${API}/api/v1/wishlist**`, (route) =>
    route.fulfill({ json: mockWishlist })
  );
  await page.route(`${API}/api/v1/orders**`, (route) =>
    route.fulfill({ json: { success: true, message: "ok", data: [] } })
  );
  await page.route(`${API}/api/admin/**`, (route) =>
    route.fulfill({
      status: 401,
      json: { success: false, message: "Unauthorized" },
    })
  );
}

/** Wait for the page to finish loading (no spinners). */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {
    // networkidle is not always reachable with animations — fall through
  });
}
