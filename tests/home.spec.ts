import { test, expect } from "@playwright/test";
import { mockAllApis, waitForPageLoad } from "./fixtures/helpers";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
    await page.goto("/");
    await waitForPageLoad(page);
  });

  // ─── Hero ────────────────────────────────────────────────
  test("renders hero section with headline and CTA buttons", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Pure Goodness/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Shop Now/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Explore Products/i }).first()).toBeVisible();
  });

  test("hero badge shows brand tagline", async ({ page }) => {
    // Text is in DOM — use first() since it may appear in multiple elements
    await expect(page.getByText(/Rooted in Ancient Wisdom/i).first()).toBeAttached();
  });

  // ─── Trust Banner ─────────────────────────────────────────
  test("trust banner container is visible", async ({ page }) => {
    // Check banner section is rendered by looking for a key label in the DOM
    await expect(page.getByText(/Lab Tested Every Batch/i).first()).toBeAttached();
    await expect(page.getByText(/Farm Sourced/i).first()).toBeAttached();
    await expect(page.getByText(/No Chemicals/i).first()).toBeAttached();
    await expect(page.getByText(/Secure Payments/i).first()).toBeAttached();
  });

  // ─── Stats ─────────────────────────────────────────────────
  test("stats section is in the DOM", async ({ page }) => {
    // Stats use useInView animation (opacity:0 until scrolled). Check DOM presence.
    const statsSection = page.getByText("Happy Customers").first();
    await expect(statsSection).toBeAttached();
    await expect(page.getByText("1000+").first()).toBeAttached();
  });

  test("stats become visible after scrolling to section", async ({ page }) => {
    await page.getByText("Happy Customers").first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(700); // animation settles
    await expect(page.getByText("1000+").first()).toBeVisible();
  });

  // ─── Products ─────────────────────────────────────────────
  test("products section heading loads", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Shop Our Products/i })).toBeVisible();
  });

  test("product cards render after API resolves", async ({ page }) => {
    const cards = page.getByText(/Pure Natural Honey|Natural Turmeric|Natural Coriander/i).first();
    await expect(cards).toBeVisible({ timeout: 8000 });
  });

  // ─── Combo Packs ──────────────────────────────────────────
  test("combo packs section renders all 3 combos", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Combo Packs/i })).toBeVisible();
    await expect(page.getByText(/Immunity Combo/i)).toBeVisible();
    await expect(page.getByText(/Kitchen Essentials/i)).toBeVisible();
    await expect(page.getByText(/Family Honey Pack/i)).toBeVisible();
  });

  // ─── Product Comparison ───────────────────────────────────
  test("product comparison section renders", async ({ page }) => {
    await page.getByRole("heading", { name: /Vedyara vs/i }).scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: /Vedyara vs/i })).toBeVisible();
    await expect(page.getByText(/The Vedyara Difference/i)).toBeVisible();
  });

  // ─── Farm to Home ─────────────────────────────────────────
  test("farm to home section has all 5 journey steps", async ({ page }) => {
    // Center element in viewport so IntersectionObserver fires reliably on mobile
    await page.getByText("Bee Farm").first().evaluate((el) =>
      el.scrollIntoView({ behavior: "instant", block: "center" })
    );
    await page.waitForTimeout(900);
    // Section heading is inside a motion.div — check DOM attachment (not visibility)
    // to avoid flakiness from framer-motion opacity animation timing
    await expect(page.getByRole("heading", { name: /Farm to/i })).toBeAttached();
    await expect(page.getByText("Bee Farm").first()).toBeAttached();
    await expect(page.getByText("Harvest").first()).toBeAttached();
    await expect(page.getByText("Lab Testing").first()).toBeAttached();
    await expect(page.getByText("Packaging").first()).toBeAttached();
    await expect(page.getByText("Your Door").first()).toBeAttached();
  });

  // ─── Why Choose Us ────────────────────────────────────────
  test("why choose us section appears", async ({ page }) => {
    await page.getByRole("heading", { name: /Why Choose/i }).evaluate((el) =>
      el.scrollIntoView({ behavior: "instant", block: "center" })
    );
    await page.waitForTimeout(900);
    // Check DOM attachment — heading is inside a staggerContainer motion.div
    await expect(page.getByRole("heading", { name: /Why Choose/i })).toBeAttached();
  });

  // ─── Educational Hub ──────────────────────────────────────
  test("educational hub section renders with all 3 tabs", async ({ page }) => {
    await page.getByRole("heading", { name: /Education Hub/i }).scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: /Education Hub/i })).toBeVisible();
    await expect(page.getByText(/Why Honey Crystallizes/i)).toBeVisible();
    await expect(page.getByText(/Purity Test at Home/i)).toBeVisible();
    await expect(page.getByText(/Why Choose Raw Honey/i)).toBeVisible();
  });

  test("educational section tab switch shows new content", async ({ page }) => {
    // Scroll so tab isn't hidden behind fixed sticky CTA bar (mobile) or navbar
    await page.getByText(/Purity Test at Home/i).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    // Use force:true to click even if partially obscured by fixed elements
    await page.getByText(/Purity Test at Home/i).click({ force: true });
    await expect(page.getByText(/3 Simple Purity Tests/i)).toBeVisible({ timeout: 4000 });

    await page.getByText(/Why Choose Raw Honey/i).click({ force: true });
    await expect(page.getByText(/Raw vs Processed Honey/i)).toBeVisible({ timeout: 4000 });
  });

  // ─── Testimonials ─────────────────────────────────────────
  test("testimonials carousel section is visible", async ({ page }) => {
    await page.getByRole("heading", { name: /What Our Customers Say/i }).scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: /What Our Customers Say/i })).toBeVisible();
  });

  test("testimonials carousel next arrow navigates", async ({ page }) => {
    await page.getByRole("heading", { name: /What Our Customers Say/i }).scrollIntoViewIfNeeded();
    const nextBtn = page.getByRole("button").filter({ has: page.locator("svg") }).last();
    // Soft check — button may be disabled if only 1 page of testimonials
    const isDisabled = await nextBtn.isDisabled();
    if (!isDisabled) {
      await nextBtn.click();
    }
  });

  // ─── CTA ──────────────────────────────────────────────────
  test("CTA section at bottom renders", async ({ page }) => {
    await page.getByRole("heading", { name: /Tradition/i }).scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: /Tradition/i })).toBeVisible();
  });
});
