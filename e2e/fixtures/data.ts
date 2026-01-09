import type { Page } from '@playwright/test';

/**
 * Test data generators and constants
 */
export class TestData {
  /**
   * Valid test email addresses
   */
  static readonly validEmails = {
    valid: 'test@example.com',
    another: 'another.test@domain.com',
  };

  /**
   * Invalid email formats for testing validation
   */
  static readonly invalidEmails = {
    noAt: 'invalidemail.com',
    noDomain: 'test@',
    noLocal: '@domain.com',
    spaces: 'test @domain.com',
  };

  /**
   * Test phone numbers
   */
  static readonly phoneNumbers = {
    valid: '(555) 123-4567',
    valid2: '555-123-4567',
    valid3: '5551234567',
    invalid: '123',
    invalid2: 'abc-def-ghij',
  };

  /**
   * Form test data
   */
  static formData = {
    name: {
      valid: 'Test User',
      short: 'AB',
      long: 'A'.repeat(101),
    },
    email: {
      valid: 'test@example.com',
      invalid: 'invalid',
    },
    phone: {
      valid: '(555) 123-4567',
      invalid: '123',
    },
    message: {
      valid: 'This is a test message for the contact form.',
      empty: '',
      long: 'A'.repeat(501),
    },
  };

  /**
   * Page content expectations
   */
  static pageContent = {
    home: {
      title: 'Honey Bee Community Services',
      heroHeading: 'Honey Bee Community Services',
      contactButton: /contact/i,
    },
    services: {
      title: 'Our Services',
      description: 'Personalized support through Residential',
      serviceCount: 3,
    },
    history: {
      title: 'Our History',
      subtitle: 'From Vision to Impact',
      founderName: 'Brett Bosley',
    },
  };

  /**
   * Routes
   */
  static routes = {
    home: '/',
    services: '/services',
    residential: '/services/residential',
    dayServices: '/services/day-services',
    caseManagement: '/services/targeted-case-management',
    history: '/history',
    ourVision: '/our-vision',
  };

  /**
   * Viewport sizes
   */
  static viewports = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 720 },
    largeDesktop: { width: 1920, height: 1080 },
  };

  /**
   * Console error patterns to check for
   */
  static consoleErrorPatterns = [
    /error/i,
    /failed/i,
    /exception/i,
    /404/,
    /500/,
  ];

  /**
   * Performance thresholds (in ms)
   */
  static performanceThresholds = {
    firstContentfulPaint: 3000,
    largestContentfulPaint: 4000,
    timeToInteractive: 5000,
  };
}

/**
 * Utility functions for test data
 */
export const testDataUtils = {
  /**
   * Generate a random email address
   */
  randomEmail(): string {
    const random = Math.random().toString(36).substring(7);
    return `test${random}@example.com`;
  },

  /**
   * Generate a random string of specified length
   */
  randomString(length: number): string {
    return Math.random().toString(36).substring(2, 2 + length);
  },

  /**
   * Get current timestamp for unique test data
   */
  timestamp(): string {
    return Date.now().toString();
  },
};
