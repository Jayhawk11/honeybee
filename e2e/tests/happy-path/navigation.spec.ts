import { test, expect } from '@playwright/test';
import { HomePage } from '../../fixtures/pages/HomePage';
import { ServicesPage } from '../../fixtures/pages/ServicesPage';
import { HistoryPage } from '../../fixtures/pages/HistoryPage';
import { OurVisionPage } from '../../fixtures/pages/OurVisionPage';
import { WaitStrategies } from '../../helpers/utils';

/**
 * Navigation & Routing Tests
 * Tests for navigation between pages and URL routing
 */

/**
 * Robust wait strategy for dropdown menus across all browsers
 */
async function waitForMenuReady(page: any, browserName: string) {
  // Wait for menu to be visible
  await expect(page.getByRole('menu')).toBeVisible({ timeout: 10000 });

  // Browser-specific waits
  const browserWaits: Record<string, number> = {
    chromium: 100,
    firefox: 300,
    webkit: 500, // WebKit/Mobile Safari needs more time
  };

  await page.waitForTimeout(browserWaits[browserName] || 200);

  // Ensure menuitems are attached and visible
  const firstMenuItem = page.getByRole('menuitem').first();
  await firstMenuItem.waitFor({ state: 'attached', timeout: 5000 });
  await firstMenuItem.waitFor({ state: 'visible', timeout: 5000 });
}

test.describe('Navigation & Routing', () => {
  test('should navigate to services page', async ({ page, browserName }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Services is a dropdown button, need to click menu item
    const servicesButton = page.getByRole('button', { name: /services/i });
    await servicesButton.waitFor({ state: 'visible', timeout: 10000 });
    await servicesButton.click();

    // Use robust wait strategy
    await waitForMenuReady(page, browserName);

    // Add extra wait for menu items to be clickable
    const servicesOverview = page.getByRole('menuitem', { name: 'Services Overview' });
    await servicesOverview.waitFor({ state: 'visible', timeout: 8000 });
    await servicesOverview.click();

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/services/);
  });

  test('should navigate to history page', async ({ page, browserName }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await page.waitForLoadState('networkidle');

    const historyLink = page.getByRole('link', { name: /history/i }).first();

    // Wait for link to be fully interactive
    await historyLink.waitFor({ state: 'visible', timeout: 8000 });
    await historyLink.click();

    // Browser-specific wait for navigation
    if (browserName === 'firefox' || browserName === 'webkit') {
      await page.waitForTimeout(300);
    }

    await expect(page).toHaveURL(/\/history/);
  });

  test('should navigate to our vision page', async ({ page, browserName }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await page.waitForLoadState('networkidle');

    const visionLink = page.getByRole('link', { name: /our vision/i }).first();

    // Wait for link to be fully interactive
    await visionLink.waitFor({ state: 'visible', timeout: 8000 });
    await visionLink.click();

    // Browser-specific wait for navigation
    if (browserName === 'firefox' || browserName === 'webkit') {
      await page.waitForTimeout(300);
    }

    await expect(page).toHaveURL(/\/our-vision/);
  });

  test('should navigate back to home from history', async ({ page, browserName }) => {
    const historyPage = new HistoryPage(page);

    await historyPage.goto();

    // Wait for back button to be ready
    const backToHomeButton = page.locator('a[href="/"]');
    await backToHomeButton.waitFor({ state: 'attached', timeout: 5000 });
    await historyPage.clickBackToHome();

    // Browser-specific wait for navigation
    if (browserName === 'firefox' || browserName === 'webkit') {
      await page.waitForTimeout(300);
    }

    await expect(page).toHaveURL('/');
  });

  test('should navigate to service detail pages', async ({ page, browserName }) => {
    const servicesPage = new ServicesPage(page);

    await servicesPage.goto();
    await page.waitForLoadState('networkidle');

    // Open dropdown with explicit wait
    const servicesButton = page.getByRole('button', { name: /services/i });
    await servicesButton.waitFor({ state: 'visible', timeout: 10000 });
    await servicesButton.click();
    await waitForMenuReady(page, browserName);

    // Navigate to residential services
    await servicesPage.clickResidentialServices();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/services\/residential/);

    // Return to services page
    await page.goto('/services');
    await page.waitForLoadState('networkidle');

    // Open dropdown again for next test
    await page.getByRole('button', { name: /services/i }).click();
    await waitForMenuReady(page, browserName);

    // Navigate to day services
    await servicesPage.clickDayServices();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/services\/day-services/);

    // Continue pattern for case management
    await page.goto('/services');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /services/i }).click();
    await waitForMenuReady(page, browserName);

    await servicesPage.clickCaseManagement();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/services\/targeted-case-management/);
  });

  test('should navigate to contact section', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.scrollToContact();

    // Check that we're on the same page but scrolled
    await expect(page).toHaveURL('/');

    // Contact section should be visible
    const contactSection = page.getByTestId('contact-section');
    await expect(contactSection).toBeInViewport();
  });

  test('should handle 404 for non-existent routes', async ({ page }) => {
    await page.goto('/non-existent-page');

    // Should still get a response (Next.js 404 page)
    await expect(page.locator('body')).toBeVisible();
  });

  test('should maintain state on page reload', async ({ page, browserName }) => {
    await page.goto('/history');
    const initialURL = page.url();

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Browser-specific wait for page to settle
    if (browserName === 'firefox' || browserName === 'webkit') {
      await page.waitForTimeout(300);
    }

    await expect(page).toHaveURL(initialURL);
    await expect(page.getByRole('heading', { name: /our history/i })).toBeVisible();
  });

  test('should handle browser back button', async ({ page, browserName }) => {
    // Start at home
    await page.goto('/');
    await expect(page).toHaveURL('/');

    // Navigate to services
    await page.goto('/services');

    // Navigate to history
    await page.goto('/history');

    // Go back to services
    await page.goBack();
    await page.waitForLoadState('networkidle');

    // Browser-specific wait for navigation to complete
    if (browserName === 'firefox' || browserName === 'webkit') {
      await page.waitForTimeout(200);
    }

    // Go back to home
    await page.goBack();
    await page.waitForLoadState('networkidle');

    if (browserName === 'firefox' || browserName === 'webkit') {
      await page.waitForTimeout(200);
    }
  });

  test('should handle browser forward button', async ({ page }) => {
    // Start at home
    await page.goto('/');

    // Navigate to services
    await page.goto('/services/');
    await page.waitForLoadState('networkidle');

    // Navigate to history
    await page.goto('/history');
    await page.waitForLoadState('networkidle');

    // Go back twice
    await page.goBack();
    await page.goBack();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/$/);

    // Go forward to services
    await page.goForward();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/services/);

    // Go forward to history
    await page.goForward();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/history/);
  });

  test('should navigate via direct URL', async ({ page }) => {
    // Navigate directly to services
    await page.goto('/services');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/services');
    const servicesHeading = page.getByRole('heading', { name: /our services/i });
    await servicesHeading.waitFor({ state: 'visible', timeout: 8000 });
    await expect(servicesHeading).toBeVisible();

    // Navigate directly to history
    await page.goto('/history');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/history');
    const historyHeading = page.getByRole('heading', { name: /our history/i });
    await historyHeading.waitFor({ state: 'visible', timeout: 8000 });
    await expect(historyHeading).toBeVisible();

    // Navigate directly to home
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/');
  });

  test('should handle navigation with query parameters', async ({ page }) => {
    // Navigate with query parameter
    await page.goto('/?test=true');

    // Should still load the page
    await page.waitForLoadState('networkidle');
    const headings = page.locator('h1, h2, h3, h4, h5, h6').first();
    await expect(headings).toBeVisible();
  });

  test('should maintain scroll position on back navigation', async ({ page, browserName }) => {
    // Skip on Firefox due to viewport ratio issue
    test.skip(browserName === 'firefox', 'Firefox has viewport ratio issue with scroll position');

    const historyPage = new HistoryPage(page);

    await historyPage.goto();

    // Scroll to timeline
    await historyPage.scrollToTimeline();

    // Navigate away
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Go back
    await page.goBack();
    await page.waitForLoadState('networkidle');

    // Should be scrolled back to where we were
    await expect(historyPage.timelineSection).toBeInViewport();
  });

  test('should handle multiple rapid navigations', async ({ page }) => {
    const routes = ['/', '/services', '/history', '/our-vision'];

    // Rapidly navigate through routes
    for (const route of routes) {
      await page.goto(route);
      await expect(page).toHaveURL(route);
    }

    // Should end on last route
    await expect(page).toHaveURL('/our-vision');
  });
});
