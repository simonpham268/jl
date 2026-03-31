import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { requireEnv } from './src/utils/require.env';

// Load environment variables dynamically based on pipeline parameter
const environment = process.env.ENVIRONMENT || 'uat';
const envFile = `.env.${environment}`;
const envPath = path.resolve(__dirname, envFile);

console.log(`Loading environment configuration: ${envFile}`);
dotenv.config({ path: envPath });

// Validate that the environment file exists
if (!fs.existsSync(envPath)) {
  console.warn(`Warning: Environment file ${envFile} not found. Using system environment variables.`);
  // Fallback to .env.uat if the specified environment file doesn't exist
  const fallbackPath = path.resolve(__dirname, '.env.uat');
  if (fs.existsSync(fallbackPath)) {
    console.log(`Falling back to .env.uat`);
    dotenv.config({ path: fallbackPath });
  }
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  globalSetup: './src/globalSetup.ts',
  // globalTeardown: './src/globalTeardown.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 1, // CI: 2 worker per agent (safe for parallel jobs), Local: unlimited
  timeout: 120_000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false,
      traces: 'on-failure',
    }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: requireEnv('BASE_URL'),

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: process.env.CI ? 'only-on-failure' : 'off',
    video: process.env.CI ? 'retain-on-failure' : 'off',

    /* Use saved authentication state */
    storageState: '.auth/storageState.json',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: [
            '--start-maximized',
            '--disable-notifications',
            '--disable-geolocation',
            '--disable-infobars',
            '--disable-features=TranslateUI',
            '--disable-translate',
            '--lang=en-US'],

        },
        headless: !!process.env.CI,
      },

    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        deviceScaleFactor: undefined,
        launchOptions: {
          args: [
            '--start-maximized',
            '--disable-notifications',
            '--disable-geolocation',
            '--disable-infobars',
            '--disable-features=TranslateUI',
            '--disable-translate',
            '--lang=en-US',],

        },
        headless: !!process.env.CI,
        viewport: null
      },
    },
  ],
});
