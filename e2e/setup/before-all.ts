import { test as base } from '@playwright/test';

/**
 * Global setup before all tests
 */
export const test = base.extend<{}, { globalSetup: void }>({
  globalSetup: [async ({}, use) => {
    // Run once before all tests
    console.log('Setting up E2E tests...');

    // Clear any existing test data or cookies if needed
    // Set test environment variables if needed

    await use();

    // Cleanup after all tests
    console.log('Cleaning up E2E tests...');
  }, { scope: 'worker' }],
});

/**
 * Global test fixtures
 */
export const expect = base.expect;
