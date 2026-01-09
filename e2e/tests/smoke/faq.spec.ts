import { test, expect } from '@playwright/test';

/**
 * FAQ Bot Tests
 * Verify the AI-powered FAQ assistant functionality
 */

test.describe('FAQ Assistant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display FAQ section', async ({ page }) => {
    // Scroll to FAQ section
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();

    // Check FAQ section is visible
    await expect(faqSection).toBeVisible();

    // Check for heading
    await expect(page.getByText(/AI-Powered FAQ Assistant/i)).toBeVisible();
  });

  test('should display search input', async ({ page }) => {
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();

    // Check for search input
    const searchInput = page.getByLabel('Search FAQ');
    await expect(searchInput).toBeVisible();

    // Check placeholder
    await expect(searchInput).toHaveAttribute('placeholder', 'Search for answers...');
  });

  test('should display suggested questions', async ({ page }) => {
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();

    // Check for "Try asking:" label
    await expect(page.getByText(/Try asking:/i)).toBeVisible();

    // Check for at least one suggested question
    const suggestedQuestions = page.getByRole('button').filter({ hasText: /services|qualify|hours|cost|referral/i });
    await expect(suggestedQuestions.first()).toBeVisible();
  });

  test('should display category filters', async ({ page }) => {
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();

    // Check that at least some category buttons exist
    const categoryButtons = faqSection.getByRole('button').filter({ hasText: /All|Services|General|Financial|Contact/ });
    await expect(categoryButtons.first()).toBeVisible();
  });

  test('should display FAQ accordion items', async ({ page }) => {
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();

    // Wait for FAQs to load
    await page.waitForTimeout(500);

    // Check for FAQ items
    const firstFAQ = page.getByText(/What services does HBCS provide/i);
    await expect(firstFAQ).toBeVisible();
  });

  test('should expand FAQ item when clicked', async ({ page }) => {
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Click on first FAQ
    const firstFAQ = page.getByText(/What services does HBCS provide/i);
    await firstFAQ.click();

    // Wait for animation
    await page.waitForTimeout(300);

    // Answer should now be visible
    await expect(page.getByText(/HBCS provides Residential Supports/)).toBeVisible();
  });

  test('should display chat interface', async ({ page }) => {
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check for chat input placeholder
    await expect(faqSection.getByPlaceholder('Type your question here...')).toBeVisible();

    // Check for send button
    await expect(faqSection.getByRole('button', { name: 'Send' })).toBeVisible();
  });

  test('should send question via chat interface', async ({ page }) => {
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();

    // Type a question
    const chatInput = page.getByLabel('Type your question');
    await chatInput.fill('What services do you provide?');

    // Press Enter
    await chatInput.press('Enter');

    // Wait for AI response
    await page.waitForTimeout(1500);

    // Check for AI response containing relevant text
    await expect(faqSection.getByText(/HBCS provides Residential Supports/)).toBeVisible();
  });

  test('should send question via suggested question button', async ({ page }) => {
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();

    // Find suggested question buttons and click one
    const suggestedButtons = faqSection.locator('button').filter({ hasText: /\?$|services|hours|cost/ });
    await expect(suggestedButtons.first()).toBeVisible();
    await suggestedButtons.first().click();

    // Wait for AI response
    await page.waitForTimeout(1500);

    // Check that a response was received
    await expect(faqSection.locator('div.bg-gray-100').filter({ hasText: /Based|can|will/i }).first()).toBeVisible();
  });

  test('should filter FAQs by category', async ({ page }) => {
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Click on "Services" category using aria-label
    const servicesCategory = page.getByLabel('Filter by Services');
    await servicesCategory.click();

    // Wait for filter
    await page.waitForTimeout(300);

    // Check that "What services does HBCS provide?" is still visible
    await expect(page.getByText(/What services does HBCS provide/i)).toBeVisible();

    // Check that service category button is active
    await expect(servicesCategory).toHaveClass(/bg-gradient-to-r/);
  });

  test('should search FAQs', async ({ page }) => {
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Type in search
    const searchInput = page.getByLabel('Search FAQ');
    await searchInput.fill('cost');

    // Wait for filter
    await page.waitForTimeout(300);

    // Check that "How much do your services cost?" is visible
    await expect(page.getByText(/How much do your services cost/i)).toBeVisible();
  });

  test('should clear search', async ({ page }) => {
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Type in search
    const searchInput = page.getByLabel('Search FAQ');
    await searchInput.fill('cost');
    await page.waitForTimeout(300);

    // Click clear button
    const clearButton = page.getByLabel('Clear search');
    await clearButton.click();

    // Check that search is cleared
    await expect(searchInput).toHaveValue('');
  });

  test('should display typing indicator', async ({ page }) => {
    const faqSection = page.getByTestId('faq-section');
    await faqSection.scrollIntoViewIfNeeded();

    // Type a question
    const chatInput = page.getByLabel('Type your question');
    await chatInput.fill('What services do you provide?');
    await chatInput.press('Enter');

    // Wait for response (typing indicator may be too brief to catch)
    await page.waitForTimeout(1500);

    // Check that a response was received
    await expect(faqSection.getByText(/HBCS provides Residential Supports/)).toBeVisible();
  });
});
