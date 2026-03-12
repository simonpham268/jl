// spec: scanerio.md

import { expect, test } from '@playwright/test';
import { JobsPage } from '../pages/JobDetailsPage';
import { Sidebar } from '../pages/Sidebar';
import { requireEnv } from '../utils/require.env';

test.describe('Delete Job Workflow', () => {
  let sidebar: Sidebar;
  let jobsPage: JobsPage;
  
  const baseUrl = requireEnv('BASE_URL');

  test.beforeEach(async ({ page }) => {
    sidebar = new Sidebar(page);
    jobsPage = new JobsPage(page);
    
    // Navigate to the application (already authenticated via globalSetup)
    await page.goto(baseUrl);
    await page.waitForLoadState('domcontentloaded');
  });

  test('TC_DELETE_001: Delete job workflow', async ({ page }) => {
    // Step 1: Navigate to Jobs (already authenticated)
    await sidebar.clickAllJobs();
    await jobsPage.navigateToAllJobs();

    // Step 2: Select open tab and click on first job
    await jobsPage.clickOpenTab();
    await jobsPage.selectFirstJob();

    // Step 3: Click three dots and select Delete Job
    await jobsPage.clickThreeDots();
    await jobsPage.selectDeleteJob();

    // Step 4: Select I agree and press Delete button
    await jobsPage.clickIAgree();
    await jobsPage.clickDeleteButton();

    // Step 5: Verify get message The items were successfully deleted
    const message = await jobsPage.getSuccessMessage();
    expect(message).toContain('The items were successfully deleted');
  });
});
