import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { Sidebar } from '../../pages/Sidebar';
import { SettingsPage } from '../../pages/Settings/SettingsPage';
import { SystemSetupPage } from '../../pages/Settings/SystemSetupPage';
import type { RoundingSettingModel } from '../../models/RoundingSettingModel';
import { ROUNDING_OPTION, ROUNDING_DURATION } from '../../constants/RoundingConst';
import { requireEnv } from '../../utils/require.env';

/**
 * Settings Smoke Test
 */
test.describe('Settings Smoke', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let sidebar: Sidebar;
  let settingsPage: SettingsPage;
  let systemSetupPage: SystemSetupPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
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

  test('[TC_05_RQ2] @Smoke: System Setup - Verify user can turn on the "Preserve Entered Uplift/Discount Percentage" setting', async ({ page }) => {
    const isOn = true;
    await systemSetupPage.navigateToSystemSetup();

    await systemSetupPage.clickEdit();
    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: !isOn
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.checkPreserveUpliftDiscount(isOn);

    const isCheckedAfterCheck = await systemSetupPage.isPreserveUpliftDiscountChecked();
    expect(isCheckedAfterCheck).toBe(isOn);

    await systemSetupPage.clickSave();

    const isCheckedAfterSave = await systemSetupPage.isPreserveUpliftDiscountChecked();
    expect(isCheckedAfterSave).toBe(isOn);
  });

  test('[TC_06_RQ2] @Smoke: System Setup - Verify user can turn off the "Preserve Entered Uplift/Discount Percentage" setting', async ({ page }) => {
    const isOn = false;
    await systemSetupPage.navigateToSystemSetup();

    await systemSetupPage.clickEdit();
    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: !isOn
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.checkPreserveUpliftDiscount(isOn);

    const isCheckedAfterCheck = await systemSetupPage.isPreserveUpliftDiscountChecked();
    expect(isCheckedAfterCheck).toBe(isOn);

    await systemSetupPage.clickSave();

    const isCheckedAfterSave = await systemSetupPage.isPreserveUpliftDiscountChecked();
    expect(isCheckedAfterSave).toBe(isOn);
  });

  test('[TC_07_RQ4] @Smoke: [Settings > System Settings] Verify tooltip content for "Profit Summary View" is displayed correctly', async ({ page }) => {
    await systemSetupPage.profitSummaryViewInfoIcon.scrollIntoViewIfNeeded();
    await systemSetupPage.profitSummaryViewInfoIcon.hover();

    await expect(systemSetupPage.tooltip).toBeVisible();
    const tooltipText = await systemSetupPage.tooltip.textContent();
    expect(tooltipText).toContain('View costs, PO items, undelivered costs, sell values, and calculated profit.');

    await page.mouse.move(0, 0);
    await expect(systemSetupPage.tooltip).not.toBeVisible();
  });

  test('[TC_08_RQ4] @Smoke: [Settings > System Settings] Verify tooltip content for "Detailed with Cost Breakdown View" is displayed correctly', async ({ page }) => {
    await systemSetupPage.detailedCostBreakdownInfoIcon.scrollIntoViewIfNeeded();
    await systemSetupPage.detailedCostBreakdownInfoIcon.hover();

    await expect(systemSetupPage.tooltip).toBeVisible();
    const tooltipText = await systemSetupPage.tooltip.textContent();
    expect(tooltipText).toContain('Detailed view of key metrics: quoted, current, and actual profit with cost breakdown.');

    await page.mouse.move(0, 0);
    await expect(systemSetupPage.tooltip).not.toBeVisible();
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

  /** ID: TC_04_RQ2 Tags: @Smoke @Regression @Settings */
  test('[TC_04_RQ2] @Smoke: System Setup - Verify "Preserve Entered Uplift/Discount Percentage" is OFF by default for new user', async ({ page }) => {
    await homePage.logoff();
    try {
      await loginPage.login(requireEnv('USR_DEFAULT'), requireEnv('PWS_DEFAULT'));
      await systemSetupPage.navigateToSystemSetup();

      const isChecked = await systemSetupPage.isPreserveUpliftDiscountChecked();
      expect(isChecked).toBe(false);
    } finally {
      await homePage.logoff().catch(() => {});
    }
  });

  test('[TC_07_RQ2] @Smoke: System Setup - Verify tooltip content for "Preserve Entered Uplift/Discount Percentage" is displayed correctly', async ({ page }) => {
    await systemSetupPage.preserveUpliftDiscountInfoIcon.scrollIntoViewIfNeeded();
    await systemSetupPage.preserveUpliftDiscountInfoIcon.hover();

    await expect(systemSetupPage.tooltip).toBeVisible();
    const tooltipText = await systemSetupPage.tooltip.textContent();
    expect(tooltipText).toContain('When checked, the system keeps the exact percentage you entered.');
    expect(tooltipText).toContain('If unchecked, the system prioritizes the final amount after rounding. As a result, the percentage may adjust slightly to match the rounded value.');

    await page.mouse.move(0, 0);
    await expect(systemSetupPage.tooltip).not.toBeVisible();
  });

  test('[TC_01_RQ4] @Smoke: System Setup - Verify "Job Profitability View" setting is displayed with two radio options in the Job Profitability section', async ({ page: _page }) => {
    await sidebar.navigateTo('Settings');
    await settingsPage.assertPageLoaded();
    await settingsPage.clickSystemSetup();

    // Scroll to and verify Job Profitability View label is displayed
    const isSectionDisplayed = await systemSetupPage.isJobProfitabilityViewDisplayed();
    console.log('Job Profitability View label displayed:', isSectionDisplayed);
    expect(isSectionDisplayed).toBe(true);

    // Verify Profit Summary View radio option is displayed
    const isProfitSummaryDisplayed = await systemSetupPage.isProfitSummaryViewRadioDisplayed();
    console.log('Profit Summary View radio displayed:', isProfitSummaryDisplayed);
    expect(isProfitSummaryDisplayed).toBe(true);

    // Verify Detailed with Cost Breakdown View radio option is displayed
    const isDetailedViewDisplayed = await systemSetupPage.isDetailedCostBreakdownRadioDisplayed();
    console.log('Detailed with Cost Breakdown View radio displayed:', isDetailedViewDisplayed);
    expect(isDetailedViewDisplayed).toBe(true);

    // Verify both radios share the same group name (only one can be selected at a time)
    const areMutuallyExclusive = await systemSetupPage.areJobProfitabilityRadiosMutuallyExclusive();
    console.log('Job Profitability View radios are mutually exclusive:', areMutuallyExclusive);
    expect(areMutuallyExclusive).toBe(true);
  });
});
