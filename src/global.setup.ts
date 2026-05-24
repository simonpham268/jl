import { chromium, request } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { ADMIN_ROUTES } from './constants';
import { AUTH_ENDPOINTS, PETSTORE_CONFIG } from './petstore';
import { requireEnv } from './utils/env';

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
    const aitUsername = requireEnv('AIT_ADMIN_USERNAME');
    const aitPassword = requireEnv('AIT_ADMIN_PASSWORD');
    const aitBrowser = await chromium.launch();
    const aitContext = await aitBrowser.newContext();
    const aitPage = await aitContext.newPage();

    await aitPage.goto(`${aitBaseUrl}${ADMIN_ROUTES.BASE}`);
    await aitPage.getByPlaceholder('Enter username').fill(aitUsername);
    await aitPage.getByPlaceholder('Password').fill(aitPassword);
    await aitPage.getByRole('button', { name: 'Login' }).click();
    await aitPage
      .getByRole('link', { name: 'Rooms' })
      .waitFor({ state: 'visible' });

    const aitAuthPath = path.join(authDir, 'ait-admin.json');
    await aitContext.storageState({ path: aitAuthPath });
    await aitBrowser.close();
    console.log(
      'automationintesting.online admin auth state saved:',
      aitAuthPath,
    );
  } catch (err) {
    console.error(
      'Failed to setup automationintesting.online admin auth:',
      err,
    );
    throw err;
  }

  // Petstore: API login (Bearer JWT) and save token to JSON file (no storageState)
  try {
    const petstoreBaseUrl = requireEnv('PETSTORE_BASE_URL');
    const username = requireEnv('PETSTORE_USERNAME');
    const password = requireEnv('PETSTORE_PASSWORD');

    const apiContext = await request.newContext({ baseURL: petstoreBaseUrl });
    const response = await apiContext.post(AUTH_ENDPOINTS.LOGIN, {
      data: { username, password },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok()) {
      throw new Error(
        `Petstore login failed: ${response.status()} ${await response.text()}`,
      );
    }

    const body = (await response.json()) as { token: string };
    if (!body.token)
      throw new Error('Petstore login response missing `token` field');

    const tokenPath = path.join(__dirname, '..', PETSTORE_CONFIG.tokenFile);
    fs.writeFileSync(tokenPath, JSON.stringify({ token: body.token }, null, 2));
    await apiContext.dispose();
    console.log('Petstore JWT token saved:', tokenPath);
  } catch (err) {}
}
