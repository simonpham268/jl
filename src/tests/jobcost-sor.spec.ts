/** ID: TC_36_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
import { test, expect } from '../fixtures/combined.fixture';
import { LoginPage } from '../pages/LoginPage';
import { JobDetailsPage } from '../pages/Jobs/JobDetailsPage';
import { SystemSetupPage } from '../pages/Settings/SystemSetupPage';
import type { RoundingSettingModel } from '../models/RoundingSettingModel';
import { ROUNDING_OPTION, ROUNDING_DURATION } from '../constants/RoundingConst';
import { ScheduleOfRatesCostModal } from '../modals/ScheduleOfRatesCostModal';
import { PriceType, type ScheduleOfRatesCostModel } from '../models/CostModel';
import { createBasicApiJobData } from '../data/apiData/job.api.data';
import { roundTo2Decimals } from '../utils/RoundingUtils';
import { ROUTE } from '../constants/RouteConst';
import { requireEnv } from '../utils/require.env';

test.describe('[Jobs > Schedule of Rates] Preserve entered uplift and discount percentages', () => {
  let loginPage: LoginPage;
  let jobDetailsPage: JobDetailsPage;
  let systemSetupPage: SystemSetupPage;
  let sorCostModal: ScheduleOfRatesCostModal;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    jobDetailsPage = new JobDetailsPage(page);
    systemSetupPage = new SystemSetupPage(page);
    sorCostModal = new ScheduleOfRatesCostModal(page);
    await loginPage.goToBaseURL();
  });

  test('TC_08_RQ2 @Smoke [Job > Costs / SOR Items] Verify Sell value is correctly calculated and rounded when Uplift % is entered', async ({ jobService }) => {
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

    await jobDetailsPage.clickEditSellingRate();

    await jobDetailsPage.selectSellingRateOption('Schedule of Rates');
    await expect(jobDetailsPage.getSellingRateQuickViewItem('Schedule of Rates')).toContainText('Chargeable');
    await jobDetailsPage.saveSellingRateModal();

    await sorCostModal.clickAddScheduleOfRates();

    const sorCostModel: ScheduleOfRatesCostModel = {
      description: `SOR ${Date.now()}`,
      costPerHour: 16.77,
      priceType: PriceType.FIX_PRICE,
      upliftPercent: 10,
      scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
      scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
      priceUsingRateSplit: {
        description: '',
        cost: 0,
        sell: 16.77,
      },
    };

    const expectedSellPerHour = roundTo2Decimals(
      sorCostModel.costPerHour * (1 + sorCostModel.upliftPercent / 100),
      roundingConfig.roundingOption ?? ROUNDING_OPTION.NO_ROUNDING
    ).toFixed(2);

    await sorCostModal.fillAddScheduleOfRatesCostModal(sorCostModel);

    const actualSellPerHour = await sorCostModal.getSellPerHour();
    expect(actualSellPerHour).toBe(expectedSellPerHour);

    await sorCostModal.saveModal();
    await sorCostModal.clickEditScheduleOfRatesRecord(sorCostModel.description);

    const editSellPerHour = await sorCostModal.getSellPerHour('Edit');
    expect(editSellPerHour).toBe(expectedSellPerHour);
  });

  test('TC_09_RQ2 @Smoke [Job > Costs / SOR Items] Verify Uplift % value is preserved after saving when "Preserve Entered Uplift/Discount Percentage" setting is on', async ({ jobService }) => {
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

    await jobDetailsPage.clickEditSellingRate();

    await jobDetailsPage.selectSellingRateOption('Schedule of Rates');
    await expect(jobDetailsPage.getSellingRateQuickViewItem('Schedule of Rates')).toContainText('Chargeable');
    await jobDetailsPage.saveSellingRateModal();

    await sorCostModal.clickAddScheduleOfRates();

    const costPerHour = parseFloat((Math.random() * 50 + 10).toFixed(2));
    const upliftPercent = Math.floor(Math.random() * 20) + 5;

    const sorCostModel: ScheduleOfRatesCostModel = {
      description: `SOR ${Date.now()}`,
      costPerHour,
      priceType: PriceType.FIX_PRICE,
      upliftPercent,
      scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
      scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
      priceUsingRateSplit: {
        description: '',
        cost: 0,
        sell: costPerHour,
      },
    };

    const expectedSellPerHour = roundTo2Decimals(
      sorCostModel.costPerHour * (1 + sorCostModel.upliftPercent / 100),
      roundingConfig.roundingOption ?? ROUNDING_OPTION.NO_ROUNDING
    ).toFixed(2);

    await sorCostModal.fillAddScheduleOfRatesCostModal(sorCostModel);

    const actualSellPerHour = await sorCostModal.getSellPerHour();
    expect(actualSellPerHour).toBe(expectedSellPerHour);

    await sorCostModal.saveModal();
    await sorCostModal.clickEditScheduleOfRatesRecord(sorCostModel.description);

    const actualUplift = await sorCostModal.getUpliftPercent('Edit');
    expect(parseFloat(actualUplift)).toBe(sorCostModel.upliftPercent);

    const editSellPerHour = await sorCostModal.getSellPerHour('Edit');
    expect(editSellPerHour).toBe(expectedSellPerHour);
  });

  test('TC_10_RQ2 @Smoke', async ({ jobService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: false,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(createBasicApiJobData());
    if (!response.body) throw new Error('No response body from createJob');
    if (!response.body.redirectUrl) throw new Error('Missing redirectUrl in job response');

    await jobDetailsPage.navigateToJob(response.body.redirectUrl);
    await jobDetailsPage.switchToTab('Costs');

    await jobDetailsPage.clickEditSellingRate();

    await jobDetailsPage.selectSellingRateOption('Schedule of Rates');
    await expect(jobDetailsPage.getSellingRateQuickViewItem('Schedule of Rates')).toContainText('Chargeable');
    await jobDetailsPage.saveSellingRateModal();

    await sorCostModal.clickAddScheduleOfRates();

    const costPerHour = parseFloat((Math.random() * 50 + 10).toFixed(2));
    const upliftPercent = Math.floor(Math.random() * 20) + 5;

    const sorCostModel: ScheduleOfRatesCostModel = {
      description: `SOR ${Date.now()}`,
      costPerHour,
      priceType: PriceType.FIX_PRICE,
      upliftPercent,
      scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
      scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
      priceUsingRateSplit: {
        description: '',
        cost: 0,
        sell: costPerHour,
      },
    };

    const expectedSellPerHour = roundTo2Decimals(
      sorCostModel.costPerHour * (1 + sorCostModel.upliftPercent / 100),
      roundingConfig.roundingOption ?? ROUNDING_OPTION.NO_ROUNDING
    ).toFixed(2);

    await sorCostModal.fillAddScheduleOfRatesCostModal(sorCostModel);

    const actualSellPerHour = await sorCostModal.getSellPerHour();
    expect(actualSellPerHour).toBe(expectedSellPerHour);

    await sorCostModal.saveModal();
    await sorCostModal.clickEditScheduleOfRatesRecord(sorCostModel.description);

    // Sell Per Hour should remain as the rounded value after save
    const editSellPerHour = await sorCostModal.getSellPerHour('Edit');
    expect(editSellPerHour).toBe(expectedSellPerHour);

    // With preserveUplift OFF, Uplift % must be recalculated from the rounded Sell Per Hour:
    // Uplift % = ((roundedSell - cost) / cost) * 100
    const roundedSell = parseFloat(expectedSellPerHour);
    const expectedRecalculatedUplift = parseFloat(
      (((roundedSell - costPerHour) / costPerHour) * 100).toFixed(2)
    );

    const actualUplift = await sorCostModal.getUpliftPercent('Edit');
    expect(parseFloat(actualUplift)).toBe(expectedRecalculatedUplift);
  });
});
