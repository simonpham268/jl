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

  /** ID: TC_13_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
  test('TC_13_RQ2 @Smoke [Job > Costs / SOR Items] Verify Uplift % is correctly calculated from entered Sell value', async ({ jobService }) => {
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

    const priceRateSell = parseFloat((Math.random() * 50 + 5).toFixed(2));
    const sellPerUnit = parseFloat((Math.random() * 100 + 10).toFixed(2));

    await sorCostModal.fillSorModalBySellPerUnit(
      {
        scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
        scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
        priceRateSell,
      },
      sellPerUnit,
    );

    const actualUplift = await sorCostModal.getUpliftPercent('Add');
    const expectedUplift = parseFloat((((sellPerUnit - priceRateSell) / priceRateSell) * 100).toFixed(2));
    expect(parseFloat(actualUplift)).toBe(expectedUplift);
  });

  test('TC_10_RQ2 @Smoke [Job > Costs/SOR Items Tab] Verify Uplift % is recalculated from rounded Sell value when “Preserve Entered Uplift/Discount Percentage” setting is off', async ({ jobService }) => {
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

    const editSellPerHour = await sorCostModal.getSellPerHour('Edit');
    expect(editSellPerHour).toBe(expectedSellPerHour);

    const roundedSell = parseFloat(expectedSellPerHour);
    const expectedRecalculatedUplift = parseFloat(
      (((roundedSell - costPerHour) / costPerHour) * 100).toFixed(2)
    );

    const actualUplift = await sorCostModal.getUpliftPercent('Edit');
    expect(parseFloat(actualUplift)).toBe(expectedRecalculatedUplift);
  });

  /** ID: TC_16_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
  test('TC_16_RQ2 @Smoke [Job > Costs/SOR Items Tab] Verify Sell is calculated from discount %', async ({ jobService }) => {
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

    const priceRateSell = parseFloat((Math.random() * 50 + 5).toFixed(2));
    const discountPercent = Math.floor(Math.random() * 30) + 1;

    await sorCostModal.fillSorModalPriceAndDiscount(
      {
        scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
        scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
        priceRateSell,
      },
      discountPercent,
    );

    const expectedSellPerUnit = roundTo2Decimals(
      priceRateSell * (1 - discountPercent / 100),
      roundingConfig.roundingOption ?? ROUNDING_OPTION.ROUND_UP,
    ).toFixed(2);

    const actualSellPerUnit = await sorCostModal.getSellPerHour('Add');
    expect(actualSellPerUnit).toBe(expectedSellPerUnit);
  });

  /** ID: TC_17_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
  test('TC_17_RQ2 @Smoke [Job > Costs / SOR Items] Verify Discount % value is preserved after saving when "Preserve Entered Uplift/Discount Percentage" setting is on', async ({ jobService }) => {
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

    const priceRateSell = parseFloat((Math.random() * 50 + 5).toFixed(2));
    const discountPercent = Math.floor(Math.random() * 30) + 1.5;
    const description = `SOR ${Date.now()}`;

    await sorCostModal.fillSorModalPriceAndDiscount(
      {
        scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
        scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
        priceRateSell,
      },
      discountPercent,
    );
    await sorCostModal.fillDescription(description);
    await sorCostModal.saveModal();

    await sorCostModal.clickEditScheduleOfRatesRecord(description);

    const actualDiscount = await sorCostModal.getDiscountPercent('Edit');
    expect(parseFloat(actualDiscount)).toBe(discountPercent);
  });

  /** ID: TC_18_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
  test('TC_18_RQ2 @Smoke [Job > Costs / SOR Items] Verify Discount % is recalculated from rounded Sell value when "Preserve Entered Uplift/Discount Percentage" setting is off', async ({ jobService }) => {
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

    const priceRateSell = parseFloat((Math.random() * 50 + 5).toFixed(2));
    const discountPercent = Math.floor(Math.random() * 30) + 1;
    const description = `SOR ${Date.now()}`;

    await sorCostModal.fillSorModalPriceAndDiscount(
      {
        scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
        scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
        priceRateSell,
      },
      discountPercent,
    );

    const expectedSellPerHour = roundTo2Decimals(
      priceRateSell * (1 - discountPercent / 100),
      roundingConfig.roundingOption ?? ROUNDING_OPTION.NO_ROUNDING,
    ).toFixed(2);

    const actualSellPerHourAdd = await sorCostModal.getSellPerHour('Add');
    expect(actualSellPerHourAdd).toBe(expectedSellPerHour);

    await sorCostModal.fillDescription(description);
    await sorCostModal.saveModal();

    await sorCostModal.clickEditScheduleOfRatesRecord(description);

    const editSellPerHour = await sorCostModal.getSellPerHour('Edit');
    expect(editSellPerHour).toBe(expectedSellPerHour);

    const roundedSell = parseFloat(expectedSellPerHour);
    const expectedRecalculatedDiscount = roundTo2Decimals(
      ((priceRateSell - roundedSell) / priceRateSell) * 100,
      roundingConfig.roundingOption ?? ROUNDING_OPTION.NO_ROUNDING,
    ).toFixed(2);

    const actualDiscount = await sorCostModal.getDiscountPercent('Edit');
    expect(parseFloat(actualDiscount)).toBe(parseFloat(expectedRecalculatedDiscount));
  });

  /** ID: TC_21_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
  test('TC_21_RQ2 @Smoke [Job > Costs / SOR Items] Verify Discount % is correctly calculated from entered Sell value', async ({ jobService }) => {
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

    const priceRateSell = parseFloat((Math.random() * 40 + 10).toFixed(2));
    const sellPerUnit = parseFloat((Math.random() * (priceRateSell - 1) + 0.5).toFixed(2));
    console.log('price rate sell: ' + priceRateSell);
    console.log('sell Per Unit: ' + sellPerUnit);

    await sorCostModal.fillSorModalBySellPerUnit(
      {
        scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
        scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
        priceRateSell,
      },
      sellPerUnit,
    );

    const expectedDiscount = (
      ((priceRateSell - sellPerUnit) / priceRateSell) * 100
    ).toFixed(2);
    console.log('expected discount: ' + expectedDiscount);

    const actualDiscount = await sorCostModal.getDiscountPercent('Add');
    expect(parseFloat(actualDiscount)).toBe(parseFloat(expectedDiscount));
  });

  /** ID: TC_36_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
  test('TC_36_RQ2 @Smoke [Job > Schedule of Rates] Preserve entered uplift and discount percentages', async ({ jobService }) => {
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

    const priceRateSellUplift = parseFloat((Math.random() * 50 + 5).toFixed(2));
    const upliftPercent = Math.floor(Math.random() * 20) + 1;
    const descriptionUplift = `SOR Test Uplift ${Date.now()}`;

    const sorUpliftModel: ScheduleOfRatesCostModel = {
      description: descriptionUplift,
      costPerHour: priceRateSellUplift,
      priceType: PriceType.FIX_PRICE,
      upliftPercent,
      scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
      scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
      priceUsingRateSplit: {
        description: '',
        cost: 0,
        sell: priceRateSellUplift,
      },
    };

    await sorCostModal.fillAddScheduleOfRatesCostModal(sorUpliftModel);
    const expectedSellPerHourUplift = await sorCostModal.getSellPerHour('Add');
    await sorCostModal.saveModal();

    await sorCostModal.clickEditScheduleOfRatesRecord(descriptionUplift);

    const editSellPerHourUplift = await sorCostModal.getSellPerHour('Edit');
    expect(editSellPerHourUplift).toBe(expectedSellPerHourUplift);

    const actualUplift = await sorCostModal.getUpliftPercent('Edit');
    expect(parseFloat(actualUplift)).toBe(upliftPercent);

    await sorCostModal.closeModalAndDiscard();

    await sorCostModal.clickAddScheduleOfRates();

    const priceRateSellDiscount = parseFloat((Math.random() * 50 + 5).toFixed(2));
    const discountPercent = Math.floor(Math.random() * 20) + 1;
    const descriptionDiscount = `SOR Test Discount ${Date.now()}`;

    await sorCostModal.fillSorModalPriceAndDiscount(
      {
        scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
        scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
        priceRateSell: priceRateSellDiscount,
      },
      discountPercent,
    );
    const expectedSellPerHourDiscount = await sorCostModal.getSellPerHour('Add');
    await sorCostModal.fillDescription(descriptionDiscount);
    await sorCostModal.saveModal();

    await sorCostModal.clickEditScheduleOfRatesRecord(descriptionDiscount);

    const editSellPerHourDiscount = await sorCostModal.getSellPerHour('Edit');
    expect(editSellPerHourDiscount).toBe(expectedSellPerHourDiscount);

    const actualDiscount2 = await sorCostModal.getDiscountPercent('Edit');
    expect(parseFloat(actualDiscount2)).toBe(discountPercent);
  });
});
