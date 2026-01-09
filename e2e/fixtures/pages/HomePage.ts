import type { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Home Page
 */
export class HomePage {
  readonly page: Page;
  readonly heroSection: Locator;
  readonly servicesSection: Locator;
  readonly gallerySection: Locator;
  readonly aboutSection: Locator;
  readonly testimonialsSection: Locator;
  readonly contactSection: Locator;
  readonly contactButton: Locator;
  readonly serviceCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroSection = page.getByTestId('hero-section');
    this.servicesSection = page.locator('[data-testid="services-section"]');
    this.gallerySection = page.locator('[data-testid="gallery-section"]');
    this.aboutSection = page.locator('[data-testid="about-section"]');
    this.testimonialsSection = page.locator('[data-testid="testimonials-section"]');
    this.contactSection = page.getByTestId('contact-section');
    this.contactButton = page.getByRole('link', { name: /contact/i });
    this.serviceCards = page.locator('.service-card, [class*="service"]');
  }

  /**
   * Navigate to home page
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if hero section is visible
   */
  async isHeroVisible(): Promise<boolean> {
    return await this.heroSection.isVisible();
  }

  /**
   * Click on contact button
   */
  async clickContact() {
    await this.contactButton.first().click();
  }

  /**
   * Scroll to contact section
   */
  async scrollToContact() {
    await this.contactSection.scrollIntoViewIfNeeded();
  }

  /**
   * Check if all main sections are present
   */
  async areAllSectionsPresent(): Promise<boolean> {
    try {
      await Promise.all([
        this.heroSection.waitFor({ state: 'visible', timeout: 5000 }),
        this.servicesSection.waitFor({ state: 'visible', timeout: 5000 }),
        this.gallerySection.waitFor({ state: 'visible', timeout: 5000 }),
        this.aboutSection.waitFor({ state: 'visible', timeout: 5000 }),
      ]);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check for console errors
   */
  async checkForErrors(): Promise<string[]> {
    const errors: string[] = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await this.page.waitForLoadState('networkidle');
    return errors;
  }
}
