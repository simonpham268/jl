import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from './pages/LoginPage';
import { requireEnv } from './utils/require.env';

// Load environment variables dynamically based on pipeline parameter
const environment = process.env.ENVIRONMENT || process.env.NODE_ENV || 'uat';
const envFile = `.env.${environment}`;
const envPath = path.resolve(__dirname, `../${envFile}`);

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

    // Setup authentication
    console.log('Setting up authentication...');
    const baseUrl = requireEnv('BASE_URL');
    const username = requireEnv('USR');
    const password = requireEnv('PWD');

    const browser = await chromium.launch();
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);

    try {
        await loginPage.goToBaseURL(baseUrl);
        await loginPage.login(username, password);

        await page.waitForURL('**/Dashboard**', { timeout: 60000 }).catch(() => {
            return page.waitForURL('**/', { timeout: 60000 });
        });

        console.log('Login successful, saving authentication state...');

        const storageStatePath = path.join(authDir, 'storageState.json');
        await page.context().storageState({ path: storageStatePath });

        console.log('Authentication state saved successfully');

    } catch (error) {
        console.error('Failed to setup authentication:', error);
        throw error;
    } finally {
        await browser.close();
    }
}
