import type { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Our Vision Page
 */
export class OurVisionPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly backToHomeLink: Locator;
  readonly mainContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /our vision/i });
    this.backToHomeLink = page.getByRole('link', { name: /back to home/i });
    this.mainContent = page.locator('main');
  }

  /**
   * Navigate to our vision page
   */
  async goto() {
    await this.page.goto('/our-vision');
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Click back to home link
   */
  async clickBackToHome() {
    await this.backToHomeLink.click();
  }

  /**
   * Check if heading is visible
   */
  async isHeadingVisible(): Promise<boolean> {
    return await this.heading.isVisible();
  }

  /**
   * Check if main content is loaded
   */
  async isContentLoaded(): Promise<boolean> {
    return await this.mainContent.isVisible();
  }
}
