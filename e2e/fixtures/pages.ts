import { test as base } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { HistoryPage } from './pages/HistoryPage';
import { OurVisionPage } from './pages/OurVisionPage';

/**
 * Base test fixtures with page objects
 */
export type PageObjects = {
  homePage: HomePage;
  servicesPage: ServicesPage;
  historyPage: HistoryPage;
  ourVisionPage: OurVisionPage;
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }: { page: any }, use: any) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  servicesPage: async ({ page }: { page: any }, use: any) => {
    const servicesPage = new ServicesPage(page);
    await use(servicesPage);
  },
  historyPage: async ({ page }: { page: any }, use: any) => {
    const historyPage = new HistoryPage(page);
    await use(historyPage);
  },
  ourVisionPage: async ({ page }: { page: any }, use: any) => {
    const ourVisionPage = new OurVisionPage(page);
    await use(ourVisionPage);
  },
});

export { expect } from '@playwright/test';
