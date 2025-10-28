import { test as base, expect, Page } from '@playwright/test';
import { loginAsAdmin } from '../utils/login';

type WPFixtures = {
  adminPage: Page;
};

export const test = base.extend<WPFixtures>({
  adminPage: async ({ page }, use) => {
    await loginAsAdmin(page);
    await use(page);
  },
});

export { expect };
