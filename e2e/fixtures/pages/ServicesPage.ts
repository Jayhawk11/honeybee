import type { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Services Page
 */
export class ServicesPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly serviceCards: Locator;
  readonly quickFactsSection: Locator;
  readonly contactSection: Locator;
  readonly contactButton: Locator;
  readonly residentialServiceLink: Locator;
  readonly dayServicesLink: Locator;
  readonly caseManagementLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByTestId('services-heading');
    this.serviceCards = page.locator('a[href^="/services/"]');
    this.quickFactsSection = page.getByTestId('quick-facts-section');
    this.contactSection = page.getByTestId('services-cta');
    this.contactButton = page.getByTestId('services-cta-button');
    this.residentialServiceLink = page.getByTestId('nav-servicesresidential');
    this.dayServicesLink = page.getByTestId('nav-serviceday-services');
    this.caseManagementLink = page.getByTestId('nav-servicestargeted-case-management');
  }

  /**
   * Navigate to services page
   */
  async goto() {
    await this.page.goto('/services');
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get count of service cards
   */
  async getServiceCardCount(): Promise<number> {
    return await this.serviceCards.count();
  }

  /**
   * Click on residential services
   */
  async clickResidentialServices() {
    await this.residentialServiceLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.residentialServiceLink.click();
  }

  /**
   * Click on day services
   */
  async clickDayServices() {
    await this.dayServicesLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.dayServicesLink.click();
  }

  /**
   * Click on case management
   */
  async clickCaseManagement() {
    await this.caseManagementLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.caseManagementLink.click();
  }

  /**
   * Click contact button
   */
  async clickContact() {
    await this.contactButton.click();
  }

  /**
   * Check if quick facts are visible
   */
  async areQuickFactsVisible(): Promise<boolean> {
    return await this.quickFactsSection.isVisible();
  }

  /**
   * Check if all service cards have images
   */
  async doServiceCardsHaveImages(): Promise<boolean> {
    const count = await this.serviceCards.count();
    for (let i = 0; i < count; i++) {
      const card = this.serviceCards.nth(i);
      const image = card.locator('img');
      if (!(await image.isVisible())) {
        return false;
      }
    }
    return true;
  }
}
