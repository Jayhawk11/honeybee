import { test } from '@playwright/test';

/**
 * FAQ Baseline Screenshots
 * Capture visual state before refactoring
 */

test('capture FAQ baseline screenshots', async ({ page, browserName }) => {
  await page.goto('/');

  // Scroll to FAQ section
  const faqSection = page.getByTestId('faq-section');
  await faqSection.scrollIntoViewIfNeeded();

  // Wait for animations to complete
  await page.waitForTimeout(500);

  // Take full section screenshot
  await faqSection.screenshot({
    path: `refactoring-screenshots/faq-baseline-${browserName}.png`,
    animations: 'disabled'
  });

  // Expand first FAQ item
  const firstFAQ = page.getByText(/What services does HBCS provide/i);
  await firstFAQ.click();
  await page.waitForTimeout(500);

  // Screenshot with expanded FAQ
  await faqSection.screenshot({
    path: `refactoring-screenshots/faq-expanded-${browserName}.png`,
    animations: 'disabled'
  });

  // Type in search
  const searchInput = page.getByLabel('Search FAQ');
  await searchInput.fill('cost');
  await page.waitForTimeout(300);

  // Screenshot with search
  await faqSection.screenshot({
    path: `refactoring-screenshots/faq-search-${browserName}.png`,
    animations: 'disabled'
  });
});
