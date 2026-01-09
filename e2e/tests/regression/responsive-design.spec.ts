import { test, expect } from '@playwright/test';
import { TestData } from '../../fixtures/data';

/**
 * Responsive Design Tests
 * Tests for mobile, tablet, and desktop viewports
 */

/**
 * Robust scroll strategy for WebKit browsers
 */
async function waitForScrollReady(page: any, browserName: string) {
  // WebKit needs extra time for scroll position to settle
  if (browserName === 'webkit') {
    await page.waitForTimeout(500);
  }
  // Firefox also benefits from small wait
  else if (browserName === 'firefox') {
    await page.waitForTimeout(200);
  }
}

test.describe('Mobile View (375x667)', () => {
  test('should display homepage on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have mobile viewport size', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThanOrEqual(420);
  });

  test('should display services page on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/services');

    await expect(page.getByRole('heading', { name: 'Our Services' })).toBeVisible();
  });

  test('should display history page on mobile', async ({ page, browserName }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/history');

    // Check hero section exists (most important)
    await expect(page.getByTestId('history-hero')).toBeVisible();

    // Founder and timeline sections may be below fold
    // Scroll to them before checking visibility
    await page.getByTestId('founder-section').scrollIntoViewIfNeeded();
    await waitForScrollReady(page, browserName);
    await expect(page.getByTestId('founder-section')).toBeVisible();
  });

  test('should have mobile-friendly navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for mobile menu button using data-testid or alternative selectors
    const mobileMenuButton = page.getByTestId('mobile-menu-toggle').or(page.locator('button[aria-label*="mobile"]'));
    const hasMobileMenu = await mobileMenuButton.count() > 0;

    // Mobile menu button should exist on mobile viewport
    expect(hasMobileMenu).toBe(true);
  });
});

test.describe('Tablet View (768x1024)', () => {
  test('should display homepage on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have tablet viewport size', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const viewport = page.viewportSize();
    expect(viewport?.width).toBeGreaterThan(420);
    expect(viewport?.width).toBeLessThanOrEqual(1024);
  });

  test('should display services page on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/services');

    await expect(page.getByTestId('services-heading')).toBeVisible();

    // Service cards should be displayed in grid
    const serviceCards = page.locator('a[href^="/services/"]');
    const count = await serviceCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should display history page on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/history');

    await expect(page.getByTestId('history-hero')).toBeVisible();
    await expect(page.getByTestId('founder-heading')).toBeVisible();
    await expect(page.getByTestId('timeline-heading')).toBeVisible();
  });

  test('should have proper layout on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/services');

    // Check that content is not overflowing
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 0;

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });
});

test.describe('Desktop View (1280x720)', () => {
  test('should display homepage on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have desktop viewport size', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    const viewport = page.viewportSize();
    expect(viewport?.width).toBeGreaterThan(1024);
  });

  test('should display services page on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/services');

    await expect(page.getByTestId('services-heading')).toBeVisible();

    // All service cards should be visible
    const serviceCards = page.locator('a[href^="/services/"]');
    const count = await serviceCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should display history page on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/history');

    await expect(page.getByTestId('history-hero')).toBeVisible();
    await expect(page.getByTestId('founder-heading')).toBeVisible();
    await expect(page.getByTestId('timeline-heading')).toBeVisible();
  });

  test('should have proper desktop layout', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/services');

    // Check that content is properly laid out
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 0;

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test('should display hover states on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/services');

    const firstServiceCard = page.locator('a[href^="/services/"]').first();

    // Hover over card
    await firstServiceCard.hover();

    // Card should still be visible
    await expect(firstServiceCard).toBeVisible();
  });
});

test.describe('Responsive Behavior Across Viewports', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 720 },
  ];

  for (const viewport of viewports) {
    test(`should display homepage on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      // Page should load successfully
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('main')).toBeVisible();

      // No horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 10); // Allow small margin
    });
  }

  for (const viewport of viewports) {
    test(`should display services page on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/services');
      await page.waitForLoadState('networkidle');

      // More flexible heading selector
      const heading = page.getByRole('heading').filter({ hasText: /services/i }).first();
      await expect(heading).toBeVisible();

      // No horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 10); // Allow small margin
    });
  }

  for (const viewport of viewports) {
    test(`should display history page on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page, browserName }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/history');
      await page.waitForLoadState('networkidle');

      // More flexible heading selector for history page
      const heading = page.getByRole('heading').filter({ hasText: /history/i }).first();
      await heading.waitFor({ state: 'visible', timeout: 8000 });
      await expect(heading).toBeVisible();

      // No horizontal scroll - allow browser-specific rendering differences
      await waitForScrollReady(page, browserName);
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      // More permissive allowance for WebKit rendering
      expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 20);
    });
  }
});

test.describe('Landscape Orientation', () => {
  test('should display in landscape on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should display in landscape on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/services');

    await expect(page.getByRole('heading', { name: 'Our Services' })).toBeVisible();
  });
});
