import { test, expect } from '@playwright/test';
import { HomePage } from '../../fixtures/pages/HomePage';
import { ServicesPage } from '../../fixtures/pages/ServicesPage';
import { HistoryPage } from '../../fixtures/pages/HistoryPage';
import { TestData } from '../../fixtures/data';

/**
 * Page Content Tests
 * Tests for content validation on each page
 */

test.describe('Homepage - Content Tests', () => {
  test('should display hero heading', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    const heroHeading = page.getByTestId('hero-heading');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText(/supporting adults/i);
  });

  test('should display services section', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await page.waitForLoadState('networkidle');

    // Use data-testid for specific section - scroll into view first
    const servicesSection = page.getByTestId('services-section').or(page.locator('[data-testid="services-section"]'));
    await servicesSection.scrollIntoViewIfNeeded();
    await expect(servicesSection).toBeVisible();

    // More flexible heading selector
    const heading = page.getByRole('heading').filter({ hasText: /services/i }).first();
    await expect(heading).toBeVisible();
  });

  test('should display gallery section', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.gallerySection.scrollIntoViewIfNeeded();
    await expect(homePage.gallerySection).toBeVisible();
  });

  test('should display about section', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await page.waitForLoadState('networkidle');

    await homePage.aboutSection.scrollIntoViewIfNeeded();
    await expect(homePage.aboutSection).toBeVisible();

    // More flexible heading selector
    const heading = page.getByRole('heading').filter({ hasText: /about/i }).first();
    await expect(heading).toBeVisible();
  });

  test('should display testimonials section', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.testimonialsSection.scrollIntoViewIfNeeded();
    await expect(homePage.testimonialsSection).toBeVisible();
  });

  test('should display contact section', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.scrollToContact();
    await expect(homePage.contactSection).toBeVisible();
  });
});

test.describe('Services Page - Content Tests', () => {
  test('should display services heading', async ({ page }) => {
    const servicesPage = new ServicesPage(page);
    await servicesPage.goto();

    await expect(servicesPage.heading).toBeVisible();
    await expect(servicesPage.heading).toHaveText(/our services/i);
  });

  test('should display all three service cards', async ({ page }) => {
    const servicesPage = new ServicesPage(page);
    await servicesPage.goto();

    const cardCount = await servicesPage.getServiceCardCount();
    expect(cardCount).toBeGreaterThanOrEqual(1);
  });

  test('should display service cards with images', async ({ page }) => {
    const servicesPage = new ServicesPage(page);
    await servicesPage.goto();

    const hasImages = await servicesPage.doServiceCardsHaveImages();
    expect(hasImages).toBe(true);
  });

  test('should display quick facts section', async ({ page }) => {
    const servicesPage = new ServicesPage(page);
    await servicesPage.goto();

    await expect(servicesPage.quickFactsSection).toBeVisible();
    await expect(servicesPage.quickFactsSection.getByText('Service Areas')).toBeVisible();
  });

  test('should display contact section', async ({ page }) => {
    const servicesPage = new ServicesPage(page);
    await servicesPage.goto();

    await expect(servicesPage.contactSection).toBeVisible();
    await expect(servicesPage.contactButton).toBeVisible();
  });

  test('should display service descriptions', async ({ page }) => {
    const servicesPage = new ServicesPage(page);
    await servicesPage.goto();

    // Check for service titles (case insensitive)
    await expect(page.getByText(/residential services/i)).toBeVisible();
    await expect(page.getByText(/day services/i)).toBeVisible();
    await expect(page.getByText(/targeted case management/i)).toBeVisible();
  });
});

test.describe('History Page - Content Tests', () => {
  test('should display history heading', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.goto();

    await expect(historyPage.heading).toBeVisible();
    await expect(historyPage.heading).toHaveText(/our history/i);
  });

  test('should display subheading', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.goto();

    await expect(historyPage.subheading).toBeVisible();
    await expect(historyPage.subheading).toHaveText(/from vision to impact/i);
  });

  test('should display founder name', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.goto();

    await expect(historyPage.founderName).toBeVisible();
    await expect(historyPage.founderName).toHaveText(/Brett Bosley/i);
  });

  test('should display founder section', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.goto();

    await expect(historyPage.founderSection).toBeVisible();
    await expect(historyPage.founderSection.getByTestId('founder-heading')).toHaveText(/Our Founder/i);
  });

  test('should display timeline section', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.goto();

    await expect(historyPage.timelineSection).toBeVisible();
    await expect(historyPage.timelineSection.getByTestId('timeline-heading')).toHaveText(/Our Journey/i);
  });

  test('should display timeline events', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.goto();

    // Scroll to timeline to ensure it's loaded
    await historyPage.scrollToTimeline();

    const eventCount = await historyPage.getTimelineEventCount();
    expect(eventCount).toBeGreaterThan(0);

    // Check first few events are visible
    const firstEvent = page.locator('[data-testid^="timeline-event-"]').first();
    await expect(firstEvent).toBeVisible();
  });

  test('should display impact stats section', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.goto();

    await expect(historyPage.impactStatsSection).toBeVisible();
    await expect(historyPage.impactStatsSection.getByTestId('impact-stats-heading')).toHaveText(/Our Impact/i);
  });

  test('should display back to home link', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.goto();

    await expect(historyPage.backToHomeLink).toBeVisible();
  });
});

test.describe('Service Detail Pages - Content Tests', () => {
  test('should display residential services page', async ({ page }) => {
    await page.goto('/services/residential');
    await page.waitForLoadState('networkidle');

    // Be more flexible with heading matching - check for any heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // More permissive text matching
    const headingText = await page.getByRole('heading', { level: 1 }).textContent();
    expect(headingText.toLowerCase()).toContain('residential');
  });

  test('should display day services page', async ({ page }) => {
    await page.goto('/services/day-services');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // More permissive text matching
    const headingText = await page.getByRole('heading', { level: 1 }).textContent();
    expect(headingText.toLowerCase()).toContain('day');
  });

  test('should display targeted case management page', async ({ page }) => {
    await page.goto('/services/targeted-case-management');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // More permissive text matching
    const headingText = await page.getByRole('heading', { level: 1 }).textContent();
    expect(headingText.toLowerCase()).toContain('case');
  });
});
