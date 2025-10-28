import { test, expect } from '@playwright/test';

test('check env variables', async ({ page }) => {
  console.log('Base URL:', process.env.BASE_URL);
  console.log('Admin User:', process.env.ADMIN_USER);

  await page.goto(process.env.BASE_URL!);
  await expect(page).toHaveTitle(/WordPress/);
});
