import { test, expect } from '@playwright/test';

test.describe('Responsive UI Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Hero section elements are visible and properly contained', async ({ page, isMobile }) => {
    // 1. Verify that the Hero headline is visible
    const heroTitle = page.locator('#about h1');
    await expect(heroTitle).toBeVisible();

    // 2. Verify that the Hero image is visible
    const heroImage = page.locator('#about img');
    await expect(heroImage).toBeVisible();

    // 3. Bounding box check to ensure elements are not overflowing the viewport width
    const viewportSize = page.viewportSize();
    const titleBox = await heroTitle.boundingBox();
    const imageBox = await heroImage.boundingBox();

    // The component should not be wider than the screen
    expect(titleBox.width).toBeLessThanOrEqual(viewportSize.width);
    expect(imageBox.width).toBeLessThanOrEqual(viewportSize.width);

    // Ensure they have non-zero dimensions (actually rendered)
    expect(titleBox.height).toBeGreaterThan(0);
    expect(imageBox.height).toBeGreaterThan(0);
  });

  test('Navigation menu behaves correctly depending on viewport', async ({ page, isMobile }) => {
    const desktopSidebar = page.locator('nav').first();
    const mobileTopBar = page.locator('.md\\:hidden.fixed.top-0'); // The mobile top bar with Hamburger

    if (isMobile) {
      // On mobile, the hamburger menu bar should be visible
      await expect(mobileTopBar).toBeVisible();
      
      // The hamburger button
      const hamburgerButton = page.locator('button.focus\\:outline-none');
      await expect(hamburgerButton).toBeVisible();

      // Click to open sidebar
      await hamburgerButton.click();
      
      // Now the sidebar links should be visible
      const aboutLink = page.locator('nav a[href="#about"]');
      await expect(aboutLink).toBeVisible();
    } else {
      // On desktop, the sidebar should be visible immediately
      await expect(desktopSidebar).toBeVisible();
      
      // Mobile top bar should be hidden
      await expect(mobileTopBar).toBeHidden();
    }
  });

  test('Experience section is completely visible', async ({ page }) => {
    const expSection = page.locator('#experience');
    // Scroll to the experience section
    await expSection.scrollIntoViewIfNeeded();

    await expect(expSection).toBeVisible();

    // Check that the container bounding box isn't collapsed
    const box = await expSection.boundingBox();
    expect(box.width).toBeGreaterThan(0);
    expect(box.height).toBeGreaterThan(0);
    
    // Ensure it does not exceed viewport width
    const viewportSize = page.viewportSize();
    expect(box.width).toBeLessThanOrEqual(viewportSize.width);
  });
});
