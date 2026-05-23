import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { requireEnv } from './utils/require.env';

const AIT_ADMIN = { username: 'admin', password: 'password' };

export default async function globalSetup() {
  // Clean up test result directories
  const folders = ['allure-results', 'allure-report'];

  for (const folder of folders) {
    if (fs.existsSync(folder)) {
      fs.rmSync(folder, { recursive: true, force: true });
    }
  }

  // Create .auth directory
  const authDir = path.join(__dirname, '../.auth');

  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // AutomationInTesting.online: UI login via browser and save storage state
  try {
    const aitBaseUrl = requireEnv('AIT_BASE_URL');
    const aitBrowser = await chromium.launch();
    const aitContext = await aitBrowser.newContext();
    const aitPage = await aitContext.newPage();

    await aitPage.goto(`${aitBaseUrl}/admin`);
    await aitPage.getByPlaceholder('Enter username').fill(AIT_ADMIN.username);
    await aitPage.getByPlaceholder('Password').fill(AIT_ADMIN.password);
    await aitPage.getByRole('button', { name: 'Login' }).click();
    await aitPage.getByRole('link', { name: 'Rooms' }).waitFor({ state: 'visible' });

    const aitAuthPath = path.join(authDir, 'ait-admin.json');
    await aitContext.storageState({ path: aitAuthPath });
    await aitBrowser.close();
    console.log('automationintesting.online admin auth state saved:', aitAuthPath);
  } catch (err) {
    console.error('Failed to setup automationintesting.online admin auth:', err);
    throw err;
  }
}
