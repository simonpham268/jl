/** ID: 0000 Tags: @Regression @Labour @Jobs */
import { test, expect } from '../fixtures/combined.fixture';
import { LoginPage } from '../pages/LoginPage';
import { JobDetailsPage } from '../pages/Jobs/JobDetailsPage';
import { SystemSetupPage } from '../pages/Settings/SystemSetupPage';
import type { RoundingSettingModel } from '../models/RoundingSettingModel';
import { ROUNDING_OPTION, ROUNDING_DURATION } from '../constants/RoundingConst';
import { LabourCostModal } from '../modals/LabourCostModal';
import { OvertimeCostModal } from '../modals/OvertimeCostModal';
import { MileageCostModal } from '../modals/MileageCostModal';
import { TravelCostModal } from '../modals/TravelCostModal';
import { MaterialCostModal } from '../modals/MaterialCostModal';
import { ExpensesCostModal } from '../modals/ExpensesCostModal';
import { PriceType, type LabourCostModel, type OvertimeCostModel, type MileageCostModel, type TravelCostModel, type MaterialCostModel, type ExpensesCostModel } from '../models/CostModel';
import { createBasicApiJobData } from '../data/apiData/job.api.data';
import { roundTo2Decimals } from '../utils/RoundingUtils';
import { ROUTE } from '../constants/RouteConst';

test.describe('[Jobs > Labour] Preserve entered uplift percentage', () => {
  let loginPage: LoginPage;
  let jobDetailsPage: JobDetailsPage;
  let systemSetupPage: SystemSetupPage;
  let labourCostPage: LabourCostModal;
  let overtimeCostPage: OvertimeCostModal;
  let mileageCostModal: MileageCostModal;
  let travelCostModal: TravelCostModal;
  let materialCostModal: MaterialCostModal;
  let expensesCostModal: ExpensesCostModal;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    jobDetailsPage = new JobDetailsPage(page);
    systemSetupPage = new SystemSetupPage(page);
    labourCostPage = new LabourCostModal(page);
    overtimeCostPage = new OvertimeCostModal(page);
    mileageCostModal = new MileageCostModal(page);
    travelCostModal = new TravelCostModal(page);
    materialCostModal = new MaterialCostModal(page);
    expensesCostModal = new ExpensesCostModal(page);
    await loginPage.goToBaseURL();
  });

  test('TC_28_RQ2 @Smoke : [Jobs > Labour] Preserve entered uplift percentage of Labour when  uplift is authoritative', async ({ jobService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
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
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
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

  test('TC_30_RQ2 @Smoke : [Jobs > Travel] Preserve entered uplift percentage of Travel when uplift is authoritative', async ({ jobService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
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
    await travelCostModal.clickAddTravel();

    const travelCostModel: TravelCostModel = {
      description: `Travel ${Date.now()}`,
      costPerHour: parseFloat((Math.random() * 99 + 1).toFixed(2)),
      priceType: PriceType.FIX_PRICE,
      upliftPercent: Math.floor(Math.random() * 50) + 1,
    };

    const expectedSellPerHour = roundTo2Decimals(
      travelCostModel.costPerHour * (1 + travelCostModel.upliftPercent / 100),
      roundingConfig.roundingOption ?? ROUNDING_OPTION.NO_ROUNDING
    ).toFixed(2);
    console.log(`Test data - Cost Per Hour: ${travelCostModel.costPerHour}, Uplift Percent: ${travelCostModel.upliftPercent}, Expected Sell Per Hour: ${expectedSellPerHour}`);

    await travelCostModal.fillAddTravelCostModal(travelCostModel);

    const actualSellPerHour = await travelCostModal.getSellPerHour();
    expect(actualSellPerHour).toBe(expectedSellPerHour);

    await travelCostModal.saveModal();
    await travelCostModal.clickEditTravelRecord(travelCostModel.description);

    const actualUplift = await travelCostModal.getUpliftPercent('Edit');
    expect(parseFloat(actualUplift)).toBe(travelCostModel.upliftPercent);

    const editSellPerHour = await travelCostModal.getSellPerHour('Edit');
    expect(editSellPerHour).toBe(expectedSellPerHour);
  });

   test('TC_31_RQ2 @Smoke : [Jobs > Mileage] Preserve entered uplift percentage of Mileage when uplift is authoritative', async ({ jobService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
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
    await mileageCostModal.clickAddMileage();

    const mileageCostModel: MileageCostModel = {
      description: `Mileage ${Date.now()}`,
      costPerHour: parseFloat((Math.random() * 99 + 1).toFixed(2)),
      priceType: PriceType.FIX_PRICE,
      upliftPercent: Math.floor(Math.random() * 50) + 1,
    };

    const expectedSellPerHour = roundTo2Decimals(
      mileageCostModel.costPerHour * (1 + mileageCostModel.upliftPercent / 100),
      roundingConfig.roundingOption ?? ROUNDING_OPTION.NO_ROUNDING
    ).toFixed(2);
    console.log(`Test data - Cost Per Hour: ${mileageCostModel.costPerHour}, Uplift Percent: ${mileageCostModel.upliftPercent}, Expected Sell Per Hour: ${expectedSellPerHour}`);

    await mileageCostModal.fillAddMileageCostModal(mileageCostModel);

    const actualSellPerHour = await mileageCostModal.getSellPerHour();
    expect(actualSellPerHour).toBe(expectedSellPerHour);

    await mileageCostModal.saveModal();
    await mileageCostModal.clickEditMileageRecord(mileageCostModel.description);

    const actualUplift = await mileageCostModal.getUpliftPercent('Edit');
    expect(parseFloat(actualUplift)).toBe(mileageCostModel.upliftPercent);

    const editSellPerHour = await mileageCostModal.getSellPerHour('Edit');
    expect(editSellPerHour).toBe(expectedSellPerHour);
  });

  test('TC_32_RQ2 @Smoke : [Jobs > Material] Preserve entered uplift percentage of Material when uplift is authoritative', async ({ jobService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
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
    await materialCostModal.clickAddMaterial();

    const materialCostModel: MaterialCostModel = {
      description: `Material ${Date.now()}`,
      costPerHour: parseFloat((Math.random() * 99 + 1).toFixed(2)),
      priceType: PriceType.FIX_PRICE,
      upliftPercent: Math.floor(Math.random() * 50) + 1,
    };

    const expectedSellPerHour = roundTo2Decimals(
      materialCostModel.costPerHour * (1 + materialCostModel.upliftPercent / 100),
      roundingConfig.roundingOption ?? ROUNDING_OPTION.NO_ROUNDING
    ).toFixed(2);
    console.log(`Test data - Cost Per Hour: ${materialCostModel.costPerHour}, Uplift Percent: ${materialCostModel.upliftPercent}, Expected Sell Per Hour: ${expectedSellPerHour}`);

    await materialCostModal.fillAddMaterialCostModal(materialCostModel);

    const actualSellPerHour = await materialCostModal.getSellPerHour();
    expect(actualSellPerHour).toBe(expectedSellPerHour);

    await materialCostModal.saveModal();
    await materialCostModal.clickEditMaterialRecord(materialCostModel.description);

    const actualUplift = await materialCostModal.getUpliftPercent('Edit');
    expect(parseFloat(actualUplift)).toBe(materialCostModel.upliftPercent);

    const editSellPerHour = await materialCostModal.getSellPerHour('Edit');
    expect(editSellPerHour).toBe(expectedSellPerHour);
  });

  test('TC_33_RQ2 @Smoke : [Jobs > Expenses] Preserve entered uplift percentage of Expenses when uplift is authoritative', async ({ jobService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
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
    await expensesCostModal.clickAddExpenses();

    const expensesCostModel: ExpensesCostModel = {
      description: `Expenses ${Date.now()}`,
      costPerHour: parseFloat((Math.random() * 99 + 1).toFixed(2)),
      priceType: PriceType.FIX_PRICE,
      upliftPercent: Math.floor(Math.random() * 50) + 1,
    };

    const expectedSellPerHour = roundTo2Decimals(
      expensesCostModel.costPerHour * (1 + expensesCostModel.upliftPercent / 100),
      roundingConfig.roundingOption ?? ROUNDING_OPTION.NO_ROUNDING
    ).toFixed(2);
    console.log(`Test data - Cost Per Hour: ${expensesCostModel.costPerHour}, Uplift Percent: ${expensesCostModel.upliftPercent}, Expected Sell Per Hour: ${expectedSellPerHour}`);

    await expensesCostModal.fillAddExpensesCostModal(expensesCostModel);

    const actualSellPerHour = await expensesCostModal.getSellPerHour();
    expect(actualSellPerHour).toBe(expectedSellPerHour);

    await expensesCostModal.saveModal();
    await expensesCostModal.clickEditExpensesRecord(expensesCostModel.description);

    const actualUplift = await expensesCostModal.getUpliftPercent('Edit');
    expect(parseFloat(actualUplift)).toBe(expensesCostModel.upliftPercent);

    const editSellPerHour = await expensesCostModal.getSellPerHour('Edit');
    expect(editSellPerHour).toBe(expectedSellPerHour);
  });
});
