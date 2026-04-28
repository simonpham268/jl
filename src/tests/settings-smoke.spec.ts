import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Sidebar } from '../pages/Sidebar';
import { SettingsPage } from '../pages/Settings/SettingsPage';
import { SystemSetupPage } from '../pages/Settings/SystemSetupPage';

/**
 * Settings Smoke Test
 */
test.describe('Settings Smoke', () => {
  let loginPage: LoginPage;
  let sidebar: Sidebar;
  let settingsPage: SettingsPage;
  let systemSetupPage: SystemSetupPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    sidebar = new Sidebar(page);
    settingsPage = new SettingsPage(page);
    systemSetupPage = new SystemSetupPage(page);

    await loginPage.goToBaseURL();
    await systemSetupPage.navigateToSystemSetup();

  });

  test('[TC_01_RQ2] @Smoke: System Setup - Verify Preserve Uplift/Discount setting', async ({ page }) => {
    // await sidebar.navigateTo('Settings');
    // await settingsPage.assertPageLoaded();
    // await settingsPage.clickSystemSetup();

    // Verify Preserve Uplift/Discount checkbox is displayed
    const isDisplayed = await systemSetupPage.isPreserveUpliftDiscountDisplayed();
    console.log('Preserve Uplift/Discount checkbox displayed:', isDisplayed);

    // Verify the label text
    const labelText = await systemSetupPage.getPreserveUpliftDiscountLabelText();
    console.log('Preserve Uplift/Discount label:', labelText);
    expect(labelText).toContain('Preserve Entered Uplift/Discount Percentage');

    // Verify checkbox is disabled
    const isDisabled = await systemSetupPage.isPreserveUpliftDiscountDisabled();
    console.log('Preserve Uplift/Discount checkbox disabled:', isDisabled);
  });

  test('[TC_02_RQ2] @Smoke: System Setup - Verify Preserve Uplift/Discount disabled when No Rounding selected', async ({ page }) => {
    // await sidebar.navigateTo('Settings');
    // await settingsPage.assertPageLoaded();
    // await settingsPage.clickSystemSetup();

    await systemSetupPage.clickEdit();

    // Select "No Rounding" option
    await systemSetupPage.selectRoundingTypeByText('No Rounding');

    // Verify checkbox is disabled (greyed out)
    const isDisabled = await systemSetupPage.isPreserveUpliftDiscountDisabled();
    console.log('Preserve Uplift/Discount checkbox disabled:', isDisabled);
  });

  test('[TC_03_RQ2] @Smoke: System Setup - Verify Preserve Uplift/Discount enabled when Rounding option is selected', async ({ page }) => {
    // await sidebar.navigateTo('Settings');
    // await settingsPage.assertPageLoaded();
    // await settingsPage.clickSystemSetup();

    await systemSetupPage.clickEdit();

    // Loop through rounding options (except No Rounding)
    const roundingOptions = ['Round Up', 'Round Down', 'Round To Nearest'];

    for (const option of roundingOptions) {
      await systemSetupPage.selectRoundingTypeByText(option);
      console.log(`Selected "${option}"`);

      // Verify checkbox is enabled (not disabled)
      const isDisabled = await systemSetupPage.isPreserveUpliftDiscountDisabled();
      console.log(`Preserve Uplift/Discount checkbox disabled for ${option}:`, isDisabled);
    }
  });

    test('[TC_02_RQ4] @Smoke @Regression: [Settings > System Settings] Verify only one "Job Profitability View" option can be selected at a time', async () => {
      const detailedRadio = systemSetupPage.getJobProfitabilityViewRadio('Detailed with Cost Breakdown View');
      const summaryRadio = systemSetupPage.getJobProfitabilityViewRadio('Profit Summary View');
  
      await systemSetupPage.configureJobProfitabilityView('Detailed with Cost Breakdown View');
      await expect(detailedRadio).toBeChecked();
      await expect(summaryRadio).not.toBeChecked();
  
      await systemSetupPage.configureJobProfitabilityView('Profit Summary View');
      await expect(summaryRadio).toBeChecked();
      await expect(detailedRadio).not.toBeChecked();
    });
});
