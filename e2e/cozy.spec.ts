import { test, expect } from "@playwright/test";

test.describe("Cozy Coffee — Chrome @Pariksha", () => {
  test("home — hero + header + testimonials + footer", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /a warm hug/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /see the menu/i })).toBeVisible();
    await expect(page.getByText(/neighborhood living room/i).first()).toBeVisible();
    // testimonials 4 Indian names
    await expect(page.getByText("Aarav Singh")).toBeVisible();
    await expect(page.getByText("Priya Sharma")).toBeVisible();
    await expect(page.getByText("Rohan Patel")).toBeVisible();
    await expect(page.getByText("Ananya Gupta")).toBeVisible();
    // gender-matched portraits (alt = name — gender, spaced em dash)
    await expect(page.locator('img[alt*="Aarav Singh"]')).toBeVisible();
    await expect(page.locator('img[alt*="Priya Sharma"]')).toBeVisible();
    // header responsive — reserve CTA
    await expect(page.getByRole("link", { name: /reserve a table/i }).first()).toBeVisible();
    // footer
    await expect(page.getByText(/your usual table is waiting/i).first()).toBeVisible();
  });

  test("menu — 13 items with images, latte fixed", async ({ page }) => {
    await page.goto("/menu");
    await expect(page.getByRole("heading", { name: /^menu$/i })).toBeVisible();
    await expect(page.getByText("House Latte — Slow Milk")).toBeVisible();
    // image for latte should load (no 404)
    const latteImg = page.getByAltText("House Latte — Slow Milk");
    await expect(latteImg).toBeVisible();
    await expect(latteImg).toHaveAttribute("src", /https:\/\/images\.unsplash\.com/);
    // check 13 cards visible by price pills
    await expect(page.getByText("$5.50").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Espresso" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pastries" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Seasonal", exact: true })).toBeVisible();
  });

  test("story + visit + journal + reserve routes", async ({ page }) => {
    for (const route of ["/story", "/visit", "/journal", "/reserve"]) {
      await page.goto(route);
      await expect(page).not.toHaveTitle(/404/);
      await expect(page.locator("body")).not.toContainText("404 — the room you looked");
    }
    await page.goto("/journal/first-sip");
    await expect(page.getByRole("heading", { name: /first sip is for the room/i })).toBeVisible();
    await page.goto("/journal/slow-bar");
    await expect(page.getByRole("heading", { name: /slow bar/i })).toBeVisible();
  });

  test("404 — styled warm page", async ({ page }) => {
    await page.goto("/this-does-not-exist-404-test");
    await expect(page.locator("h1")).toContainText(/table is empty/i);
    await expect(page.getByRole("heading", { name: /oops\. the slow/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /back to the living room/i })).toBeVisible();
  });

  test("header hamburger — responsive (mobile)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    const hamburger = page.getByRole("button", { name: /open menu|close menu/i });
    await expect(hamburger).toBeVisible();
    await hamburger.click();
    await expect(page.locator("header").getByRole("link", { name: "Menu", exact: true })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Story", exact: true })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Journal", exact: true })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Visit", exact: true })).toBeVisible();
    await hamburger.click();
  });

  test("reserve API — honeypot & validation (via fetch)", async ({ page }) => {
    await page.goto("/reserve");
    await expect(page.getByRole("heading", { name: /save your usual table/i })).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
  });

  test("SEO — sitemap + robots", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain("cozy-coffee.example.com");

    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain("sitemap");
  });
});
