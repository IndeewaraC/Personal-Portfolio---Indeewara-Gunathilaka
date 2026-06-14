import { test, expect } from '@playwright/test';

test.describe('Portfolio Regression Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test
    await page.goto('/');
  });

  test('should load the page and have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Indeewara/i);
  });

  test('hero section should render correctly', async ({ page }) => {
    // There are two h1 elements (one in the sidebar, one in the hero)
    // We target the one inside the about section
    const heroTitle = page.locator('#about h1');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('Indeewara');
    
    // Check that there is at least one skill pill (like Software Quality Automation Engineer)
    const pills = page.locator('span.rounded-full');
    expect(await pills.count()).toBeGreaterThan(0);
  });

  test('navigation sidebar should exist and work', async ({ page, isMobile }) => {
    if (isMobile) {
      // Open the hamburger menu first on mobile
      await page.locator('button.focus\\:outline-none').click();
    }
    
    // The sidebar has links
    const aboutLink = page.locator('nav a[href="#about"]');
    const experienceLink = page.locator('nav a[href="#experience"]');
    
    await expect(aboutLink).toBeVisible();
    await expect(experienceLink).toBeVisible();

    // Click experience link and verify it navigates
    await experienceLink.click();
    
    const experienceHeader = page.locator('h3', { hasText: 'Experience' });
    await expect(experienceHeader).toBeVisible();
  });

  test('major sections should be present in the DOM', async ({ page }) => {
    // Check various section IDs
    const sections = ['#about', '#experience', '#projects', '#education', '#certifications', '#tech-stack', '#testimonials', '#contact'];
    
    for (const id of sections) {
      const section = page.locator(id);
      await expect(section).toBeVisible();
    }
  });
});
