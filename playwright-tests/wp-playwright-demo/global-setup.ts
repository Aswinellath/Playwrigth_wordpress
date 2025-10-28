import { chromium } from '@playwright/test';
import * as fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

async function globalSetup() {
  // Load environment variables
  dotenv.config();

  // Verify environment variables
  if (!process.env.BASE_URL || !process.env.ADMIN_USER || !process.env.ADMIN_PASS) {
    throw new Error('Required environment variables are not set');
  }

  console.log('Starting global setup...');
  console.log('BASE_URL:', process.env.BASE_URL);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(`${process.env.BASE_URL}/wp-login.php`);
    await page.fill('#user_login', process.env.ADMIN_USER);
    await page.fill('#user_pass', process.env.ADMIN_PASS);
    await page.click('#wp-submit');
    await page.waitForURL(/wp-admin/);

    // Ensure the directory exists
    const storageStatePath = path.join(process.cwd(), 'storageState.json');
    
    await page.context().storageState({ path: storageStatePath });
    console.log('Storage state saved to:', storageStatePath);
  } catch (error) {
    console.error('Error during setup:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;