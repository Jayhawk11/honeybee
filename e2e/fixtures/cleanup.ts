import { test as base, Page } from '@playwright/test';

/**
 * Clean page state before each test
 */
export async function cleanPageState(page: Page): Promise<void> {
  // Clear browser storage
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  // Clear cookies
  await page.context().clearCookies();

  // Reset scroll position
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });

  // Close any open modals or dropdowns
  await page.evaluate(() => {
    // Close any visible dropdowns or modals
    const dropdowns = document.querySelectorAll('[role="menu"][aria-expanded="true"]');
    dropdowns.forEach(dropdown => {
      (dropdown as HTMLElement).setAttribute('aria-expanded', 'false');
    });
  });
}

export { expect } from '@playwright/test';
export * from '@playwright/test';
