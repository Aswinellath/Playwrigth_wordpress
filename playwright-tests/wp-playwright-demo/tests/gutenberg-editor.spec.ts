import { test, expect } from '@playwright/test';

test('Admin can add a paragraph block in Gutenberg', async ({ page }, testInfo) => {
  const baseURL = process.env.BASE_URL!;

  // Use existing login session from storageState
  //  const baseURL = process.env.BASE_URL!;
  const adminUser = process.env.ADMIN_USER!;
  const adminPass = process.env.ADMIN_PASS!;

  // Login
  await page.goto(`${baseURL}/wp-login.php`);
  await page.fill('#user_login', adminUser);
  await page.fill('#user_pass', adminPass);
  await page.click('#wp-submit');
  await expect(page).toHaveURL(/wp-admin/);

  // Wait for editor to load
  // await expect(page.locator('text=Add title')).toBeVisible();

  // await page.getByRole('textbox', { name: 'Add title' }).fill('Playwright Gutenberg Test');
  await page.goto('https://wordpress-973242-4168275.cloudwaysapps.com/wp-admin/post-new.php');


  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  await page.getByRole('link', { name: 'Switch to block editor' }).click();
  await page.getByRole('button', { name: 'Block Inserter' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('Paragraph');
  await page.getByRole('option', { name: 'Paragraph', exact: true }).click();
  await page.screenshot({ path: 'screenshots/login.png' });
  const screenshotBuffer = await page.screenshot({fullPage: true});
  await testInfo.attach('published-post-screenshot', { body: screenshotBuffer, contentType: 'image/png' });

  // await page.goto('https://wordpress-973242-4168275.cloudwaysapps.com/wp-admin/post.php?post=351&action=edit');
  // await page.locator('iframe[name="editor-canvas"]').contentFrame().getByRole('document', { name: 'Empty block; start writing or' }).click();
  // await page.locator('iframe[name="editor-canvas"]').contentFrame().getByRole('document', { name: 'Empty block; start writing or' }).click();
  

  // Enter a post title
  // await page.fill('textarea.editor-post-title__input', 'Playwright Gutenberg Test');

  // // Click to add a block
  // await page.click('button[aria-label="Add block"]');

  // // Search for paragraph block
  // await page.fill('input[placeholder="Search"]', 'Paragraph');
  // await page.click('button[aria-label="Paragraph"]');

  // Type content inside the block
  const paragraphBlock = await page.locator('iframe[name="editor-canvas"]').contentFrame().getByRole('document', { name: 'Empty block; start writing or' });
  await paragraphBlock.click();
  await paragraphBlock.fill('This content was added by a Playwright test.');
  const screenshotBuffer2 = await page.screenshot({fullPage: true});
  await testInfo.attach('published-post-screenshot', { body: screenshotBuffer2, contentType: 'image/png' });


  // Publish the post
  // await page.click('button:has-text("Publish")');
  // await page.click('button:has-text("Publish")'); // confirm publish
  await page.getByRole('button', { name: 'Publish', exact: true }).click();
  await page.getByLabel('Editor publish').getByRole('button', { name: 'Publish', exact: true }).click();

  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    await page.getByRole('link', { name: 'View Post(opens in a new tab)' }).click(),
  ]);
  // Verify published message
  // await expect(page.getByTestId('snackbar')).toContainText('Post published.View Post↗');

  // Optionally verify content view
  // await page.getByRole('link', { name: 'View Post (opens in a new tab)' }).click();
  // await expect(page.locator('text=This content was added by a Playwright test.')).toBeVisible();
  
  const content = await page.content();
  console.log(content); // Log the entire page content

  // await page.waitForSelector('#wp--skip-link--target', { state: 'visible' }); 
  await expect(newPage.locator('#wp--skip-link--target')).toContainText('This content was added by a Playwright test.');


});
