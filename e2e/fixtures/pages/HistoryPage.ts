import type { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the History Page
 */
export class HistoryPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly subheading: Locator;
  readonly founderSection: Locator;
  readonly timelineSection: Locator;
  readonly impactStatsSection: Locator;
  readonly backToHomeLink: Locator;
  readonly timelineEvents: Locator;
  readonly founderName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByTestId('history-heading');
    this.subheading = page.getByTestId('history-subheading');
    this.founderSection = page.getByTestId('founder-section');
    this.timelineSection = page.getByTestId('timeline-section');
    this.impactStatsSection = page.getByTestId('impact-stats-section');
    this.backToHomeLink = page.getByTestId('back-to-home-link');
    this.timelineEvents = page.locator('[data-testid^="timeline-event-"]');
    this.founderName = page.getByTestId('founder-name');
  }

  /**
   * Navigate to history page
   */
  async goto() {
    await this.page.goto('/history');
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
   * Get count of timeline events
   */
  async getTimelineEventCount(): Promise<number> {
    return await this.timelineEvents.count();
  }

  /**
   * Scroll to timeline section
   */
  async scrollToTimeline() {
    await this.timelineSection.scrollIntoViewIfNeeded();
  }

  /**
   * Scroll to impact stats section
   */
  async scrollToImpactStats() {
    await this.impactStatsSection.scrollIntoViewIfNeeded();
  }

  /**
   * Check if founder name is visible
   */
  async isFounderNameVisible(): Promise<boolean> {
    return await this.founderName.isVisible();
  }

  /**
   * Check if all timeline events are visible
   */
  async areTimelineEventsVisible(): Promise<boolean> {
    const count = await this.timelineEvents.count();
    if (count === 0) return false;

    for (let i = 0; i < count; i++) {
      if (!(await this.timelineEvents.nth(i).isVisible())) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if impact stats are visible
   */
  async areImpactStatsVisible(): Promise<boolean> {
    return await this.impactStatsSection.isVisible();
  }
}
