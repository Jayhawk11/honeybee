# E2E Testing with Playwright

This directory contains end-to-end tests for the HBCS website using Playwright.

## Table of Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [Debugging Tests](#debugging-tests)
- [CI/CD](#cicd)
- [Best Practices](#best-practices)

## Installation

Playwright is already configured in the project. To set it up:

```bash
# Install dependencies (if not already installed)
npm install --legacy-peer-deps

# Install Playwright browsers (one-time setup)
npm run test:e2e:install
```

## Running Tests

### Run All Tests

```bash
npm run test:e2e
```

### Run Specific Test Suite

```bash
# Run smoke tests only
npx playwright test e2e/tests/smoke

# Run accessibility tests only
npx playwright test e2e/tests/accessibility

# Run specific test file
npx playwright test e2e/tests/smoke/homepage.spec.ts
```

### Run Tests in UI Mode (Interactive)

```bash
npm run test:e2e:ui
```

This opens the Playwright Test UI where you can:
- Select specific tests to run
- Watch tests execute in real-time
- Inspect the DOM during test execution
- Use the time machine to step through test actions

### Run Tests in Debug Mode

```bash
npm run test:e2e:debug
```

This launches the Playwright Inspector with breakpoints at each step.

### Run Tests Headed (With Browser UI)

```bash
npm run test:e2e:headed
```

### View Test Report

After tests run, view the HTML report:

```bash
npm run test:e2e:report
```

## Test Structure

```
e2e/
├── fixtures/           # Page objects and test data
│   ├── pages/         # Page object models
│   │   ├── HomePage.ts
│   │   ├── ServicesPage.ts
│   │   ├── HistoryPage.ts
│   │   └── OurVisionPage.ts
│   ├── data.ts        # Test data and constants
│   ├── pages.ts       # Page object fixtures
│   └── auth.ts       # Authentication helpers (future use)
├── tests/             # Test files
│   ├── smoke/         # Critical path tests (must pass)
│   ├── happy-path/    # User journey tests
│   ├── regression/    # Bug prevention tests
│   └── accessibility/ # WCAG compliance tests
├── helpers/           # Utility functions
│   └── utils.ts      # Custom assertions, monitors, helpers
└── setup/             # Global setup/teardown
    └── before-all.ts  # Global test configuration
```

### Test Categories

#### Smoke Tests (`tests/smoke/`)
- Critical path tests that must pass before release
- Fast, focused on core functionality
- Examples: Homepage loads, navigation works, no console errors

#### Happy Path Tests (`tests/happy-path/`)
- User journey tests through common workflows
- Tests typical user behavior
- Examples: Navigate to services, click through service details

#### Regression Tests (`tests/regression/`)
- Tests for specific features and bug prevention
- Page content validation
- Responsive design testing

#### Accessibility Tests (`tests/accessibility/`)
- WCAG 2.1 AA compliance using axe-core
- Keyboard navigation
- Screen reader compatibility
- Color contrast

## Writing Tests

### Using Page Objects

Page objects provide a clean abstraction for page interactions:

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../fixtures/pages/HomePage';

test('homepage should display hero section', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await expect(homePage.heroSection).toBeVisible();
});
```

### Using Custom Fixtures

Custom fixtures are defined in `fixtures/pages.ts`:

```typescript
import { test } from '../fixtures/pages';

test('should navigate to services', async ({ homePage }) => {
  await homePage.goto();
  await homePage.clickServices();
  // ...
});
```

### Using Test Data

Test data is centralized in `fixtures/data.ts`:

```typescript
import { test } from '@playwright/test';
import { TestData } from '../fixtures/data';

test('should use test data', async ({ page }) => {
  await page.goto(TestData.routes.home);
  await expect(page).toHaveTitle(TestData.pageContent.home.title);
});
```

### Using Utility Helpers

Custom helpers in `helpers/utils.ts`:

```typescript
import { test } from '@playwright/test';
import { ConsoleMonitor, NetworkMonitor } from '../helpers/utils';

test('should have no errors', async ({ page }) => {
  const consoleMonitor = new ConsoleMonitor(page);
  const networkMonitor = new NetworkMonitor(page);

  await page.goto('/');

  expect(consoleMonitor.getErrors()).toEqual([]);
  expect(networkMonitor.hasFailedRequests()).toBe(false);
});
```

## Debugging Tests

### Step-by-Step Debugging

```bash
npm run test:e2e:debug
```

This opens the Playwright Inspector with:
- Step-through execution
- Live DOM inspection
- Console access
- Network requests monitoring

### Screenshots on Failure

Playwright automatically takes screenshots on test failure. Find them in:
- `test-results/<test-name>/`

### Video Recording

Videos are recorded on test failure (configured in `playwright.config.ts`). Find them in:
- `test-results/videos/`

### Trace Viewing

Traces provide detailed execution information:

```bash
npx playwright show-trace test-results/traces/<trace-file>.zip
```

### UI Mode for Interactive Debugging

```bash
npm run test:e2e:ui
```

Features:
- Select specific tests to run
- Watch test execution in real-time
- Time machine to step through actions
- Inspect page state at any point

## CI/CD

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Manual workflow dispatch

### GitHub Actions Workflow

The CI pipeline is defined in `.github/workflows/e2e-tests.yml`:

1. **Full E2E Tests**: Runs all tests across multiple browsers
2. **Smoke Tests**: Quick critical path tests only

### Artifacts

On test failure, the following artifacts are uploaded:
- HTML test reports (30-day retention)
- Screenshots (7-day retention)
- Videos (7-day retention)
- Traces (7-day retention)

### Running Tests Locally Before Pushing

```bash
# Run smoke tests (fast)
npx playwright test --project=chromium e2e/tests/smoke

# Run full test suite (slower)
npm run test:e2e
```

## Best Practices

### 1. Use Page Objects

✅ **Good:**
```typescript
await homePage.goto();
await homePage.clickContact();
```

❌ **Bad:**
```typescript
await page.goto('/');
await page.getByRole('button', { name: 'Contact' }).click();
```

### 2. Use Semantic Selectors

✅ **Good:**
```typescript
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Email address').fill('test@example.com');
```

❌ **Bad:**
```typescript
await page.locator('.btn-submit').click();
await page.locator('#email-input').fill('test@example.com');
```

### 3. Avoid Hard Waits

✅ **Good:**
```typescript
await expect(page.getByRole('heading')).toBeVisible();
```

❌ **Bad:**
```typescript
await page.waitForTimeout(5000);
```

### 4. Test User Behavior, Not Implementation

✅ **Good:**
```typescript
await page.getByText('Contact Us').click();
await expect(page).toHaveURL('/#contact');
```

❌ **Bad:**
```typescript
await page.locator('.contact-link').evaluate((el) => el.click());
expect(page.url()).toContain('#contact');
```

### 5. Use Data-Test IDs When Necessary

Add `data-testid` attributes for elements that lack good semantic selectors:

```html
<button data-testid="contact-submit">Submit</button>
```

```typescript
await page.getByTestId('contact-submit').click();
```

### 6. Keep Tests Isolated

Each test should be independent and not rely on other tests:

✅ **Good:**
```typescript
test('should navigate to services', async ({ page }) => {
  await page.goto('/');
  // Complete test...
});

test('should navigate to history', async ({ page }) => {
  await page.goto('/');
  // Complete test...
});
```

❌ **Bad:**
```typescript
test('should navigate to services', async ({ page }) => {
  await page.goto('/');
  await page.goto('/services');
});

test('should navigate to history', async ({ page }) => {
  // Assumes page is already at /services
  await page.goto('/history');
});
```

### 7. Use Descriptive Test Names

✅ **Good:**
```typescript
test('should display error message when email is invalid', async ({ page }) => {
  // ...
});
```

❌ **Bad:**
```typescript
test('form test 1', async ({ page }) => {
  // ...
});
```

### 8. Test for Accessibility

Always include accessibility checks for new features:

```typescript
import AxeBuilder from '@axe-core/playwright';

test('should be accessible', async ({ page }) => {
  await page.goto('/new-feature');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

## Configuration

The Playwright configuration is in `playwright.config.ts`:

- **Browsers**: Chromium, Firefox, WebKit
- **Viewports**: Mobile (375x667), Tablet (768x1024), Desktop (1280x720)
- **Reporters**: HTML, JSON, JUnit
- **Retries**: 2 on CI, 0 locally
- **Timeouts**: Default 30s
- **Artifacts**: Screenshots, videos, traces on failure

## Troubleshooting

### Tests Fail Locally But Pass in CI

- Check if you have browsers installed: `npm run test:e2e:install`
- Ensure dev server is running: `npm run dev`
- Check for environment-specific behavior

### Tests Fail in CI But Pass Locally

- Check CI logs for specific error messages
- Review artifacts (screenshots, videos, traces)
- Check for timing issues (add `await expect(...).toBeVisible()`)
- Ensure data-testid attributes are present in production build

### Browser Not Installed Error

```bash
npm run test:e2e:install
```

### Slow Test Execution

- Use `--project=chromium` to test one browser only
- Run specific test suites instead of all tests
- Use `--workers=N` to control parallelism

### Flaky Tests

- Add proper waits: `await expect(element).toBeVisible()`
- Use `waitForLoadState('networkidle')` for page navigation
- Avoid hard-coded timeouts
- Check for race conditions with dynamic content

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [axe-core Documentation](https://www.deque.com/axe/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Support

For questions or issues with E2E tests:
1. Check this README
2. Review Playwright documentation
3. Check existing tests for patterns
4. Ask in team channel
