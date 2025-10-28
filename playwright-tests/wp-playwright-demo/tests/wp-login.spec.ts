import { test, expect } from '@playwright/test';

test('Admin can log in to WordPress dashboard', async ({ page }) => {
  const baseURL = process.env.BASE_URL!;
  const adminUser = process.env.ADMIN_USER!;
  const adminPass = process.env.ADMIN_PASS!;

  // Navigate to login page
  await page.goto(`${baseURL}/wp-login.php`);

  // Fill login form
  await page.fill('#user_login', adminUser);
  await page.fill('#user_pass', adminPass);
  await page.click('#wp-submit');

  // Wait for dashboard load
  await expect(page).toHaveURL(/wp-admin/);
  await expect(page.locator('#wpadminbar')).toBeVisible();

  console.log('✅ Logged in successfully as admin');
});
