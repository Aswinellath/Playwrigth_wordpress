import { test, expect } from '@playwright/test';

test('Admin can create a new post', async ({ page }) => {
  const baseURL = process.env.BASE_URL!;
  const adminUser = process.env.ADMIN_USER!;
  const adminPass = process.env.ADMIN_PASS!;

  // Login
  await page.goto(`${baseURL}/wp-login.php`);
  await page.fill('#user_login', adminUser);
  await page.fill('#user_pass', adminPass);
  await page.click('#wp-submit');
  await expect(page).toHaveURL(/wp-admin/);

  // Navigate to Add New Post
  await page.getByRole('link', { name: 'Posts', exact: true }).click();
  await page.getByLabel('Main menu', { exact: true }).getByRole('link', { name: 'Add Post' }).click();
  await page.getByRole('textbox', { name: 'Add title' }).fill('Playwright Test Post');
  await page.getByRole('button', { name: 'Publish', exact: true }).click();
  await page.click('button:has-text("Publish")'); // Confirm publish
  

  // Verify publish success
  //   await expect(page.locator('text=Post published')).toBeVisible();
  await expect(page.locator('#message')).toContainText('Post published.');
  
});
