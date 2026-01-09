import { FullConfig } from '@playwright/test';

/**
 * Global Setup for E2E Tests
 * Runs once before all tests
 */

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting E2E test suite...');

  // Clean up any previous test artifacts
  if (config.projects) {
    console.log(`📊 Found ${config.projects.length} test projects`);
  }
}

export default globalSetup;
