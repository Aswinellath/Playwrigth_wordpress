import { Page } from '@playwright/test';

export async function loginAsAdmin(page: Page) {
  const baseURL = process.env.BASE_URL!;
  const username = process.env.ADMIN_USER!;
  const password = process.env.ADMIN_PASS!;

  await page.goto(`${baseURL}/wp-login.php`);
  await page.fill('#user_login', username);
  await page.fill('#user_pass', password);
  await page.click('#wp-submit');
  await page.waitForURL(/wp-admin/);
}
