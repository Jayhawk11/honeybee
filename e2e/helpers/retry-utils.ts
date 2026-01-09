/**
 * E2E Test Helpers
 * Common utilities for reducing flakiness and improving test reliability
 */

/**
 * Retry wrapper for flaky network operations
 * Retries the given operation up to maxRetries times with exponential backoff
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number;
    baseDelay?: number;
    retryCondition?: (error: Error) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 500,
    retryCondition = () => true
  } = options;

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      // Check if we should retry this error
      if (!retryCondition(lastError) || attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

/**
 * Retry condition for network-related errors
 */
export function isNetworkError(error: Error): boolean {
  const networkErrorPatterns = [
    'network error',
    'timeout',
    'fetch failed',
    'connection refused',
    'ETIMEDOUT',
    'ENOTFOUND'
  ];

  const errorMessage = error.message.toLowerCase();
  return networkErrorPatterns.some(pattern =>
    errorMessage.includes(pattern)
  );
}

/**
 * Retry condition for timeout errors
 */
export function isTimeoutError(error: Error): boolean {
  const timeoutPatterns = [
    'timeout',
    'timed out',
    'exceeded'
  ];

  const errorMessage = error.message.toLowerCase();
  return timeoutPatterns.some(pattern =>
    errorMessage.includes(pattern)
  );
}

/**
 * Safe navigation with retry
 * Handles network flakiness during page navigation
 */
export async function safeNavigate(
  page: any,
  url: string,
  options: {
    maxRetries?: number;
    waitForState?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
  } = {}
): Promise<void> {
  const { maxRetries = 3, waitForState = 'networkidle' } = options;

  return retryOperation(
    async () => {
      await page.goto(url, { waitUntil: waitForState });
    },
    {
      maxRetries,
      retryCondition: isTimeoutError
    }
  );
}

/**
 * Safe click with retry
 * Handles element detachment and click interference
 */
export async function safeClick(
  element: any,
  options: {
    maxRetries?: number;
    force?: boolean;
    timeout?: number;
  } = {}
): Promise<void> {
  const { maxRetries = 3, force = false, timeout = 5000 } = options;

  return retryOperation(
    async () => {
      await element.click({ force, timeout });
    },
    {
      maxRetries,
      retryCondition: (error) =>
        error.message.includes('detached') ||
        error.message.includes('not visible') ||
        error.message.includes('obscured')
    }
  );
}

/**
 * Wait for element with timeout and retry
 */
export async function safeWaitForElement(
  element: any,
  state: 'attached' | 'detached' | 'visible' | 'hidden',
  options: {
    maxRetries?: number;
    timeout?: number;
  } = {}
): Promise<void> {
  const { maxRetries = 3, timeout = 5000 } = options;

  return retryOperation(
    async () => {
      await element.waitFor({ state, timeout });
    },
    {
      maxRetries,
      retryCondition: () => true
    }
  );
}

/**
 * Wait for network idle with timeout
 */
export async function safeWaitForNetworkIdle(
  page: any,
  options: {
    maxRetries?: number;
    timeout?: number;
  } = {}
): Promise<void> {
  const { maxRetries = 3, timeout = 10000 } = options;

  return retryOperation(
    async () => {
      await page.waitForLoadState('networkidle', { timeout });
    },
    {
      maxRetries,
      retryCondition: isTimeoutError
    }
  );
}

/**
 * Browser-specific wait times
 */
export const browserWaitTimes: Record<string, {
  navigation: number;
  interaction: number;
  scroll: number;
  animation: number;
}> = {
  chromium: {
    navigation: 100,
    interaction: 50,
    scroll: 100,
    animation: 200,
  },
  firefox: {
    navigation: 300,
    interaction: 100,
    scroll: 200,
    animation: 300,
  },
  webkit: {
    navigation: 500,
    interaction: 200,
    scroll: 500,
    animation: 500,
  },
};

/**
 * Get wait times for current browser
 */
export function getWaitTimes(browserName: string) {
  return browserWaitTimes[browserName] || browserWaitTimes.chromium;
}

/**
 * Wait for browser-specific time
 */
export async function browserWait(
  browserName: string,
  type: 'navigation' | 'interaction' | 'scroll' | 'animation'
): Promise<void> {
  const waitTimes = getWaitTimes(browserName);
  await new Promise(resolve => setTimeout(resolve, waitTimes[type]));
}
