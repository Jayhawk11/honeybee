import type { Page, Locator } from '@playwright/test';

/**
 * Custom assertion helpers
 */
export class AssertionHelpers {
  /**
   * Assert that element is visible within timeout
   */
  static async assertVisible(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Assert that element is not visible
   */
  static async assertNotVisible(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Assert that element is enabled
   */
  static async assertEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  /**
   * Assert that element has text
   */
  static async assertHasText(locator: Locator, text: string | RegExp): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      const elementText = await locator.textContent();
      if (typeof text === 'string') {
        return elementText?.includes(text) ?? false;
      } else {
        return text.test(elementText ?? '');
      }
    } catch {
      return false;
    }
  }

  /**
   * Assert that element count matches expected
   */
  static async assertCount(locator: Locator, expected: number): Promise<boolean> {
    const count = await locator.count();
    return count === expected;
  }
}

/**
 * Console error monitoring
 */
export class ConsoleMonitor {
  private errors: string[] = [];

  constructor(private page: Page) {
    this.setupListeners();
  }

  private setupListeners(): void {
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        this.errors.push(msg.text());
      }
    });
  }

  /**
   * Get collected errors
   */
  getErrors(): string[] {
    return [...this.errors];
  }

  /**
   * Clear collected errors
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * Check if there are any errors
   */
  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  /**
   * Get error count
   */
  getErrorCount(): number {
    return this.errors.length;
  }
}

/**
 * Network request monitoring
 */
export class NetworkMonitor {
  private requests: Map<string, { status: number; url: string }> = new Map();

  constructor(private page: Page) {
    this.setupListeners();
  }

  private setupListeners(): void {
    this.page.on('response', async (response) => {
      const url = response.url();
      const status = response.status();
      this.requests.set(url, { status, url });
    });
  }

  /**
   * Get all requests
   */
  getRequests(): Array<{ status: number; url: string }> {
    return Array.from(this.requests.values());
  }

  /**
   * Get failed requests (4xx, 5xx)
   */
  getFailedRequests(): Array<{ status: number; url: string }> {
    return this.getRequests().filter((req) => req.status >= 400);
  }

  /**
   * Check if there are any failed requests
   */
  hasFailedRequests(): boolean {
    return this.getFailedRequests().length > 0;
  }

  /**
   * Get requests by status code
   */
  getRequestsByStatus(statusCode: number): Array<{ status: number; url: string }> {
    return this.getRequests().filter((req) => req.status === statusCode);
  }

  /**
   * Clear monitoring data
   */
  clear(): void {
    this.requests.clear();
  }
}

/**
 * Element interaction helpers
 */
export class ElementHelpers {
  /**
   * Wait for element to be ready (visible + enabled)
   */
  static async waitForElementReady(locator: Locator, timeout: number = 10000): Promise<void> {
    await Promise.all([
      locator.waitFor({ state: 'visible', timeout }),
      locator.waitFor({ state: 'attached', timeout }),
    ]);
  }

  /**
   * Click element when ready
   */
  static async clickWhenReady(locator: Locator, timeout: number = 10000): Promise<void> {
    await this.waitForElementReady(locator, timeout);
    await locator.click();
  }

  /**
   * Fill input field when ready
   */
  static async fillWhenReady(locator: Locator, value: string, timeout: number = 10000): Promise<void> {
    await this.waitForElementReady(locator, timeout);
    await locator.fill(value);
  }

  /**
   * Select option from dropdown
   */
  static async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  /**
   * Upload file
   */
  static async uploadFile(locator: Locator, filePath: string): Promise<void> {
    await locator.setInputFiles(filePath);
  }

  /**
   * Hover over element
   */
  static async hover(locator: Locator): Promise<void> {
    await locator.hover();
  }
}

/**
 * Wait strategies
 */
export class WaitStrategies {
  /**
   * Wait for navigation to complete
   */
  static async forNavigation(page: Page, url: string): Promise<void> {
    await page.waitForURL(url, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
  }

  /**
   * Wait for element with text to appear
   */
  static async forText(page: Page, text: string | RegExp): Promise<void> {
    await page.waitForSelector(`text=${text}`, { state: 'visible', timeout: 10000 });
  }

  /**
   * Wait for API response
   */
  static async forAPIResponse(page: Page, urlPattern: string | RegExp): Promise<void> {
    await page.waitForResponse((response) => {
      if (typeof urlPattern === 'string') {
        return response.url().includes(urlPattern);
      } else {
        return urlPattern.test(response.url());
      }
    });
  }
}
