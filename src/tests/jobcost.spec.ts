/** ID: 0000 Tags: @Regression @Labour @Jobs */
import { test, expect } from '../fixtures/combined.fixture';
import { LoginPage } from '../pages/LoginPage';
import { JobDetailsPage } from '../pages/Jobs/JobDetailsPage';
import { SystemSetupPage } from '../pages/Settings/SystemSetupPage';
import type { RoundingSettingModel } from '../models/RoundingSettingModel';
import { ROUNDING_OPTION, ROUNDING_DURATION } from '../constants/RoundingConst';
import { LabourCostModal } from '../modals/LabourCostModal';
import { OvertimeCostModal } from '../modals/OvertimeCostModal';
import { PriceType, LabourCostModel, OvertimeCostModel } from '../models/CostModel';
import { createBasicApiJobData } from '../data/apiData/job.api.data';
import { roundTo2Decimals } from '../utils/RoundingUtils';
import { NavigateUtils } from '../utils/NavigateUtils';
import { ROUTE } from '../constants/RouteConst';


test.describe('[Jobs > Labour] Preserve entered uplift percentage', () => {
  let loginPage: LoginPage;
  let jobDetailsPage: JobDetailsPage;
  let systemSetupPage: SystemSetupPage;
  let labourCostPage: LabourCostModal;
  let overtimeCostPage: OvertimeCostModal;
  let navigate: NavigateUtils;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    jobDetailsPage = new JobDetailsPage(page);
    systemSetupPage = new SystemSetupPage(page);
    navigate = new NavigateUtils(page);
    labourCostPage = new LabourCostModal(page);
    overtimeCostPage = new OvertimeCostModal(page);
    await loginPage.goToBaseURL();
  });

  test('TC_28_RQ2 @Smoke : [Jobs > Labour] Preserve entered uplift percentage of Labour when  uplift is authoritative', async ({ jobService }) => {
    await navigate.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();
    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: true,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();
 
    // Temporarily use API to create job
    const response = await jobService.createJob(createBasicApiJobData());
    if (!response.body) throw new Error('No response body from createJob');
    if (!response.body.redirectUrl) throw new Error('Missing redirectUrl in job response');

    await jobDetailsPage.navigateToJob(response.body.redirectUrl);
    await jobDetailsPage.switchToTab('Costs');
    await labourCostPage.clickAddLabour();

    const labourCostModel: LabourCostModel = {
      description: `Labour ${Date.now()}`,
      costPerHour: parseFloat((Math.random() * 99 + 1).toFixed(2)),
      priceType: PriceType.FIX_PRICE,
      upliftPercent: Math.floor(Math.random() * 50) + 1,
    };

    const expectedSellPerHour = roundTo2Decimals(
      labourCostModel.costPerHour * (1 + labourCostModel.upliftPercent / 100),
      roundingConfig.roundingOption ?? ROUNDING_OPTION.NO_ROUNDING
    ).toFixed(2);
    console.log(`Test data - Cost Per Hour: ${labourCostModel.costPerHour}, Uplift Percent: ${labourCostModel.upliftPercent}, Expected Sell Per Hour: ${expectedSellPerHour}`);
    await labourCostPage.fillAddLabourCostModal(labourCostModel);

    const actualSellPerHour = await labourCostPage.getSellPerHour();
    expect(actualSellPerHour).toBe(expectedSellPerHour);

    await labourCostPage.saveModal();
    await labourCostPage.clickEditLabourRecord(labourCostModel.description);

    const actualUplift = await labourCostPage.getUpliftPercent('Edit');
    expect(parseFloat(actualUplift)).toBe(labourCostModel.upliftPercent);

    const editSellPerHour = await labourCostPage.getSellPerHour('Edit');
    expect(editSellPerHour).toBe(expectedSellPerHour);

  });

  test('TC_29_RQ2 @Smoke : [Jobs > Overtime] Preserve entered uplift percentage of Overtime when uplift is authoritative', async ({ jobService }) => {
      await navigate.navigateTo(ROUTE.SYSTEM_SETUP);
      await systemSetupPage.clickEdit();
      const roundingConfig: RoundingSettingModel = {
        roundingOption: ROUNDING_OPTION.ROUND_UP,
        roundingDuration: ROUNDING_DURATION.MINUTES_5,
        preserveUplift: true,
      };
      await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
      await systemSetupPage.clickSave();
  
      const response = await jobService.createJob(createBasicApiJobData());
      if (!response.body) throw new Error('No response body from createJob');
      if (!response.body.redirectUrl) throw new Error('Missing redirectUrl in job response');
  
      await jobDetailsPage.navigateToJob(response.body.redirectUrl);
      await jobDetailsPage.switchToTab('Costs');
      await overtimeCostPage.clickAddOvertime();
  
      const overtimeCostModel: OvertimeCostModel = {
        description: `Overtime ${Date.now()}`,
        costPerHour: parseFloat((Math.random() * 99 + 1).toFixed(2)),
        priceType: PriceType.FIX_PRICE,
        upliftPercent: Math.floor(Math.random() * 50) + 1,
      };

      const expectedSellPerHour = roundTo2Decimals(
        overtimeCostModel.costPerHour * (1 + overtimeCostModel.upliftPercent / 100),
        roundingConfig.roundingOption ?? ROUNDING_OPTION.NO_ROUNDING
      ).toFixed(2);
      console.log(`Test data - Cost Per Hour: ${overtimeCostModel.costPerHour}, Uplift Percent: ${overtimeCostModel.upliftPercent}, Expected Sell Per Hour: ${expectedSellPerHour}`);
      await overtimeCostPage.fillAddOvertimeCostModal(overtimeCostModel);
  
      const actualSellPerHour = await overtimeCostPage.getSellPerHour();
      expect(actualSellPerHour).toBe(expectedSellPerHour);
  
      await overtimeCostPage.saveModal();
      await overtimeCostPage.clickEditOvertimeRecord(overtimeCostModel.description);
  
      const actualUplift = await overtimeCostPage.getUpliftPercent('Edit');
      expect(parseFloat(actualUplift)).toBe(overtimeCostModel.upliftPercent);
      const editSellPerHour = await overtimeCostPage.getSellPerHour('Edit');
      expect(editSellPerHour).toBe(expectedSellPerHour);
    });
});
