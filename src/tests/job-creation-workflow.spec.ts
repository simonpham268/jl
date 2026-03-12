// spec: scanerio.md

import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';
import { JobCreationPage } from '../pages/JobCreationPage';
import { Sidebar } from '../pages/Sidebar';
import { requireEnv } from '../utils/require.env';

dotenv.config({ path: '.env.uat' });

test.describe('Job Creation Workflow', () => {
  let sidebar: Sidebar;
  let jobCreationPage: JobCreationPage;

  const baseUrl = requireEnv('BASE_URL');

  test.beforeEach(async ({ page }) => {
    sidebar = new Sidebar(page);
    jobCreationPage = new JobCreationPage(page);

    // Step 1: Navigate to the application (login handled by globalSetup)
    await page.goto(baseUrl);
    await page.waitForLoadState('domcontentloaded');
  });

  test('TC_LOG_JOB_001: Complete job creation workflow', async ({ page }) => {
    // Step 2: Expand Jobs in sidebar and select Log Job
    await sidebar.clickJobs();
    await sidebar.clickLogJob();
    await jobCreationPage.verifyPageLoaded();

    // Step 3: At Customer form, click dropdown and select first item
    await jobCreationPage.selectFirstCustomer();

    // Step 4: At Site form, click dropdown and select first item
    await jobCreationPage.selectFirstSite();

    // Step 5: At Description form, input "test"
    await jobCreationPage.inputDescription("test");

    // Step 6: Click on Save button
    await jobCreationPage.clickSave();

    // Step 7: Wait for navigate to /Job/Detail/ okay
    await jobCreationPage.waitForJobDetailsNavigation();

    // Step 8: Verify text show Jobs/<jobid>, and value 'New Job' on the next right
    const jobNumber = await jobCreationPage.getJobNumber();
    expect(jobNumber).toBeTruthy();

    const jobTitleText = await jobCreationPage.getJobTitleText();
    expect(jobTitleText).toContain('Jobs');
    expect(jobTitleText).toContain(jobNumber || '');

    const jobStatusText = await jobCreationPage.getJobStatusText();
    expect(jobStatusText).toContain('New Job');
  });
});