import { test, expect } from './fixtures/wp-fixture';

test('Admin can create a new page', async ({ adminPage }) => {
  await adminPage.getByRole('link', { name: 'Pages', exact: true }).click();
  await adminPage.getByLabel('Main menu', { exact: true }).getByRole('link', { name: 'Add Page' }).click();

  await adminPage.getByRole('textbox', { name: 'Add title' }).fill('Playwright Auto Page');
  await adminPage.getByRole('button', { name: 'Toggle panel: Publish' }).click();
  await adminPage.getByRole('button', { name: 'Publish', exact: true }).click();
  await expect(adminPage.locator('text=Page published')).toBeVisible();
});