import { test, expect } from '@playwright/test';
import { ConsoleMonitor, NetworkMonitor } from '../../helpers/utils';

/**
 * Smoke Tests - Homepage
 * Critical path tests that must pass before release
 */

test.describe('Homepage - Smoke Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check that page loaded
    await expect(page).toHaveTitle(/honey bee/i);

    // Check that main content is visible
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should render hero section', async ({ page }) => {
    await page.goto('/');

    // Check for hero heading
    const heroHeading = page.getByTestId('hero-heading');
    await expect(heroHeading).toBeVisible();

    // Check that hero heading contains expected text (H1 contains "Supporting Adults...")
    await expect(heroHeading).toContainText(/supporting adults/i);

    // Check that hero description contains company name
    await expect(page.getByTestId('hero-description')).toContainText(/honey bee community services/i);
  });

  test('should have no console errors', async ({ page }) => {
    const consoleMonitor = new ConsoleMonitor(page);

    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Check for console errors
    const errors = consoleMonitor.getErrors();
    expect(errors.length).toBe(0);
  });

  test('should have no failed network requests', async ({ page }) => {
    const networkMonitor = new NetworkMonitor(page);

    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Check for failed requests
    const failedRequests = networkMonitor.getFailedRequests();
    expect(failedRequests.length).toBe(0);
  });

  test('should display contact section', async ({ page }) => {
    await page.goto('/');

    // Scroll to contact section
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    // Check that contact section is visible
    await expect(contactSection).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');

    // Check that navigation exists
    const nav = page.getByTestId('main-navigation');
    await expect(nav).toBeVisible();

    // Check for home link in main navigation (not footer)
    const homeLink = nav.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();
  });

  test('should load all images without errors', async ({ page }) => {
    const networkMonitor = new NetworkMonitor(page);

    await page.goto('/');

    // Wait for all resources to load
    await page.waitForLoadState('networkidle');

    // Check that no image requests failed
    const failedRequests = networkMonitor.getFailedRequests();
    const failedImageRequests = failedRequests.filter(req =>
      req.url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
    );

    expect(failedImageRequests.length).toBe(0);
  });

  test('should have proper viewport dimensions', async ({ page }) => {
    await page.goto('/');

    // Check viewport size
    const viewportSize = page.viewportSize();
    expect(viewportSize).toBeTruthy();
    expect(viewportSize?.width).toBeGreaterThan(0);
    expect(viewportSize?.height).toBeGreaterThan(0);
  });

  test('should respond with 200 status code', async ({ request }) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);
  });

  test('should load within reasonable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');

    // Wait for network to be idle
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Page should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });
});
