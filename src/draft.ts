import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
import { saveAuthData } from './utils/auth';
import { requireEnv } from './utils/require.env';

export default async function globalSetup() {
    // Clean up test result directories
    const folders = ['allure-results', 'allure-report', 'storage'];
    for (const folder of folders) {
        if (fs.existsSync(folder)) {
            fs.rmSync(folder, { recursive: true, force: true });
        }
    }

    // Authenticate both main and sub contractors
    await loginAndSaveCookies('main', requireEnv('MAIN_URL'), requireEnv('MAIN_USR'), requireEnv('MAIN_PWD'));

    await loginAndSaveCookies('sub', requireEnv('SUB_URL'), requireEnv('SUB_USR'), requireEnv('SUB_PWD'));
}

async function loginAndSaveCookies(
    type: 'main' | 'sub',
    baseURL: string,
    username: string,
    password: string
) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        console.log(`Logging in as ${type} (${username})...`);

        // Navigate to login page
        await page.goto(`${baseURL}`, { waitUntil: 'networkidle' });

        // Fill in credentials
        await page.fill('#UserName', username);
        await page.fill('#Password', password);

        // Click login button
        await page.click('#loginButton');

        // Wait for navigation to complete
        await page.waitForLoadState('networkidle');

        // Verify successful login
        const currentUrl = page.url();
        if (currentUrl.includes('login')) {
            throw new Error(`Login failed for ${type} - still on login page`);
        }

        // Save cookies
        const cookies = await context.cookies([
            requireEnv('MAIN_URL')
        ]);

        // Get CSRF token
        const __requestverificationtoken = await page.locator('input[name="__RequestVerificationToken"]').getAttribute('value');
        if (!__requestverificationtoken) {
            throw new Error(`Missing __RequestVerificationToken for ${type}`);
        }

        const authData = {
            cookies,
            __requestverificationtoken
        };

        // Save auth data for this contractor type
        saveAuthData(authData, type);
        console.log(`${type} authentication successful`);
    } catch (error) {
        console.error(`${type} authentication failed:`, error);
        throw error;
    } finally {
        await context.close();
        await browser.close();
    }}