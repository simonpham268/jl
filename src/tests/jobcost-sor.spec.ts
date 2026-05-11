/** ID: TC_36_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
import { test, expect } from '../fixtures/combined.fixture';
import { LoginPage } from '../pages/LoginPage';
import { JobDetailsPage } from '../pages/Jobs/JobDetailsPage';
import { SystemSetupPage } from '../pages/Settings/SystemSetupPage';
import type { RoundingSettingModel } from '../models/RoundingSettingModel';
import { ROUNDING_OPTION, ROUNDING_DURATION } from '../constants/RoundingConst';
import { ScheduleOfRatesCostModal } from '../modals/ScheduleOfRatesCostModal';
import { PriceType, type ScheduleOfRatesCostModel } from '../models/CostModel';
import { createJobTestData } from '../data/apiData/job.api.data';
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

  test('TC_08_RQ2 @Smoke [Job > Costs / SOR Items] Verify Sell value is correctly calculated and rounded when Uplift % is entered', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: true,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
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
      sorCostModel.costPerHour * (1 + (sorCostModel.upliftPercent ?? 0) / 100),
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

  test('TC_09_RQ2 @Smoke [Job > Costs / SOR Items] Verify Uplift % value is preserved after saving when "Preserve Entered Uplift/Discount Percentage" setting is on', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: true,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
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
      sorCostModel.costPerHour * (1 + (sorCostModel.upliftPercent ?? 0) / 100),
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
  test('TC_13_RQ2 @Smoke [Job > Costs / SOR Items] Verify Uplift % is correctly calculated from entered Sell value', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: false,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
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

  test('TC_10_RQ2 @Smoke [Job > Costs/SOR Items Tab] Verify Uplift % is recalculated from rounded Sell value when “Preserve Entered Uplift/Discount Percentage” setting is off', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: false,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
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
      sorCostModel.costPerHour * (1 + (sorCostModel.upliftPercent ?? 0) / 100),
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
  test('TC_16_RQ2 @Smoke [Job > Costs/SOR Items Tab] Verify Sell is calculated from discount %', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: false,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
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
  test('TC_17_RQ2 @Smoke [Job > Costs / SOR Items] Verify Discount % value is preserved after saving when "Preserve Entered Uplift/Discount Percentage" setting is on', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: true,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
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
  test('TC_18_RQ2 @Smoke [Job > Costs / SOR Items] Verify Discount % is recalculated from rounded Sell value when "Preserve Entered Uplift/Discount Percentage" setting is off', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: false,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
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
  test('TC_21_RQ2 @Smoke [Job > Costs / SOR Items] Verify Discount % is correctly calculated from entered Sell value', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: false,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
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
  test('TC_36_RQ2 @Smoke [Job > Schedule of Rates] Preserve entered uplift and discount percentages', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: true,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
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

  /** ID: TC_23_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
  test('TC_23_RQ2 @Smoke [Job > Costs/SOR Items Tab] Verify previous discount is overridden when sell is entered', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_DOWN,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: true,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
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
    const discountPercent = Math.floor(Math.random() * 20) + 1;

    await sorCostModal.fillSorModalPriceAndDiscount(
      {
        scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
        scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
        priceRateSell,
      },
      discountPercent,
    );

    const actualSellPerHour1 = await sorCostModal.getSellPerHour('Add');
    const expectedSellPerHour1 = roundTo2Decimals(priceRateSell * (1 - discountPercent / 100), ROUNDING_OPTION.ROUND_DOWN);
    expect(parseFloat(actualSellPerHour1)).toBe(expectedSellPerHour1);

    const sellPerHour1 = parseFloat(actualSellPerHour1);
    const sellPerUnit2 = Math.max(1, Math.floor(Math.random() * (sellPerHour1 - 1)) + 1);

    await sorCostModal.updateSellPerUnit(sellPerUnit2);

    const actualDiscount2 = await sorCostModal.getDiscountPercent('Add');
    const expectedDiscount2 = parseFloat((((priceRateSell - sellPerUnit2) / priceRateSell) * 100).toFixed(2));
    expect(parseFloat(actualDiscount2)).toBe(expectedDiscount2);
  });

  /** ID: TC_12_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
  test('TC_12_RQ2 @Smoke [Job > Costs / SOR Items] Verify Sell value is rounded correctly for .005 edge case (round half up)', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: false,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
    if (!response.body) throw new Error('No response body from createJob');
    if (!response.body.redirectUrl) throw new Error('Missing redirectUrl in job response');

    await jobDetailsPage.navigateToJob(response.body.redirectUrl);
    await jobDetailsPage.switchToTab('Costs');

    await jobDetailsPage.clickEditSellingRate();
    await jobDetailsPage.selectSellingRateOption('Schedule of Rates');
    await expect(jobDetailsPage.getSellingRateQuickViewItem('Schedule of Rates')).toContainText('Chargeable');
    await jobDetailsPage.saveSellingRateModal();

    await sorCostModal.clickAddScheduleOfRates();

    const sellValue = 16.75;
    const upliftPercent = 10;
    const expectedSellPerHour = '18.43';

    const sorCostModel: ScheduleOfRatesCostModel = {
      description: `SOR ${Date.now()}`,
      costPerHour: sellValue,
      priceType: PriceType.FIX_PRICE,
      upliftPercent,
      scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
      scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
      priceUsingRateSplit: {
        description: '',
        cost: 0,
        sell: sellValue,
      },
    };

    await sorCostModal.fillAddScheduleOfRatesCostModal(sorCostModel);

    const actualSellPerHour = await sorCostModal.getSellPerHour('Add');
    expect(actualSellPerHour).toBe(expectedSellPerHour);
  });

  /** ID: TC_15_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
  test('TC_15_RQ2 @Smoke [Job > Costs / SOR Items] Verify previously entered Uplift % is overridden and recalculated when Sell value is updated', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: false,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
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
    const upliftPercent = Math.floor(Math.random() * 20) + 1;

    await sorCostModal.fillSorModalByUplift(
      {
        scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
        scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
        priceRateSell,
      },
      upliftPercent,
    );

    const actualSellPerHour1 = await sorCostModal.getSellPerHour('Add');
    const expectedSellPerHour1 = parseFloat((priceRateSell * (1 + upliftPercent / 100)).toFixed(2));
    expect(parseFloat(actualSellPerHour1)).toBe(expectedSellPerHour1);

    let sellPerUnit2: number;
    do {
      sellPerUnit2 = Math.floor(priceRateSell) + Math.floor(Math.random() * 50) + 10;
    } while (sellPerUnit2 === parseFloat(actualSellPerHour1));

    await sorCostModal.updateSellPerUnit(sellPerUnit2);

    const actualUplift3 = await sorCostModal.getUpliftPercent('Add');
    const expectedUplift3 = parseFloat((((sellPerUnit2 - priceRateSell) / priceRateSell) * 100).toFixed(2));
    expect(parseFloat(actualUplift3)).toBe(expectedUplift3);
  });

  /** ID: TC_14_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
  test('TC_14_RQ2 @Smoke [Job > Costs / SOR Items] Verify Uplift % is recalculated correctly when Sell value is updated', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: false,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
    console.log('createJob response:', JSON.stringify(response, null, 2));

    if (!response.body) throw new Error('No response body from createJob');
    if (!response.body.redirectUrl) throw new Error('Missing redirectUrl in job response');

    await jobDetailsPage.navigateToJob(response.body.redirectUrl);
    await jobDetailsPage.switchToTab('Costs');

    await jobDetailsPage.clickEditSellingRate();
    await jobDetailsPage.selectSellingRateOption('Schedule of Rates');
    await expect(jobDetailsPage.getSellingRateQuickViewItem('Schedule of Rates')).toContainText('Chargeable');
    await jobDetailsPage.saveSellingRateModal();

    await sorCostModal.clickAddScheduleOfRates();

    const priceRateSell14 = parseFloat((Math.random() * 50 + 5).toFixed(2));
    const sellPerUnit14_1 = parseFloat((priceRateSell14 + Math.random() * 50 + 1).toFixed(2));

    await sorCostModal.fillSorModalBySellPerUnit(
      {
        scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
        scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
        priceRateSell: priceRateSell14,
      },
      sellPerUnit14_1,
    );

    const actualUplift14_1 = await sorCostModal.getUpliftPercent('Add');
    const expectedUplift14_1 = parseFloat((((sellPerUnit14_1 - priceRateSell14) / priceRateSell14) * 100).toFixed(2));
    expect(parseFloat(actualUplift14_1)).toBe(expectedUplift14_1);

    let sellPerUnit14_2: number;
    do {
      sellPerUnit14_2 = parseFloat((priceRateSell14 + Math.random() * 50 + 1).toFixed(2));
    } while (sellPerUnit14_2 === sellPerUnit14_1);

    await sorCostModal.updateSellPerUnit(sellPerUnit14_2);

    const actualUplift14_2 = await sorCostModal.getUpliftPercent('Add');
    const expectedUplift14_2 = parseFloat((((sellPerUnit14_2 - priceRateSell14) / priceRateSell14) * 100).toFixed(2));
    expect(parseFloat(actualUplift14_2)).toBe(expectedUplift14_2);
  });

  /** ID: TC_20_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
  test('TC_20_RQ2 @Smoke [Job > Costs / SOR Items] Verify Sell value is correctly calculated and rounded to 2 decimal places when Discount % has decimal values', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: false,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
    if (!response.body) throw new Error('No response body from createJob');
    if (!response.body.redirectUrl) throw new Error('Missing redirectUrl in job response');

    await jobDetailsPage.navigateToJob(response.body.redirectUrl);
    await jobDetailsPage.switchToTab('Costs');

    await jobDetailsPage.clickEditSellingRate();
    await jobDetailsPage.selectSellingRateOption('Schedule of Rates');
    await expect(jobDetailsPage.getSellingRateQuickViewItem('Schedule of Rates')).toContainText('Chargeable');
    await jobDetailsPage.saveSellingRateModal();

    await sorCostModal.clickAddScheduleOfRates();

    const priceRateSell20 = parseFloat((Math.random() * 50 + 5).toFixed(2));
    const discountPercent20 = parseFloat((Math.random() * 98 + 1).toFixed(2));

    await sorCostModal.fillSorModalPriceAndDiscount(
      {
        scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
        scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
        priceRateSell: priceRateSell20,
      },
      discountPercent20,
    );

    const expectedSellPerUnit20 = roundTo2Decimals(
      priceRateSell20 * (1 - discountPercent20 / 100),
      roundingConfig.roundingOption ?? ROUNDING_OPTION.ROUND_UP,
    ).toFixed(2);

    const actualSellPerUnit20 = await sorCostModal.getSellPerHour('Add');
    expect(actualSellPerUnit20).toBe(expectedSellPerUnit20);
  });

  /** ID: TC_22_RQ2 Tags: @Smoke @Regression @ScheduleOfRates @Jobs */
  test('TC_22_RQ2 @Smoke [Job > Costs / SOR Items] Verify Discount % is recalculated correctly when Sell value is updated', async ({ jobService, customerService }) => {
    await systemSetupPage.navigateTo(ROUTE.SYSTEM_SETUP);
    await systemSetupPage.clickEdit();

    const roundingConfig: RoundingSettingModel = {
      roundingOption: ROUNDING_OPTION.ROUND_UP,
      roundingDuration: ROUNDING_DURATION.MINUTES_5,
      preserveUplift: false,
    };
    await systemSetupPage.configureSystemSettingsForRounding(roundingConfig);
    await systemSetupPage.clickSave();

    const response = await jobService.createJob(await createJobTestData(jobService, customerService));
    if (!response.body) throw new Error('No response body from createJob');
    if (!response.body.redirectUrl) throw new Error('Missing redirectUrl in job response');

    await jobDetailsPage.navigateToJob(response.body.redirectUrl);
    await jobDetailsPage.switchToTab('Costs');

    await jobDetailsPage.clickEditSellingRate();
    await jobDetailsPage.selectSellingRateOption('Schedule of Rates');
    await expect(jobDetailsPage.getSellingRateQuickViewItem('Schedule of Rates')).toContainText('Chargeable');
    await jobDetailsPage.saveSellingRateModal();

    await sorCostModal.clickAddScheduleOfRates();

    const priceRateSell22 = parseFloat((Math.random() * 40 + 10).toFixed(2));
    const sellPerUnit22_1 = parseFloat((Math.random() * (priceRateSell22 - 1) + 0.5).toFixed(2));

    await sorCostModal.fillSorModalBySellPerUnit(
      {
        scheduleOfRateLibrary: requireEnv('SCHEDULE_OF_RATE_LIBRARY'),
        scheduleOfRateItem: requireEnv('SCHEDULE_OF_RATE_ITEM'),
        priceRateSell: priceRateSell22,
      },
      sellPerUnit22_1,
    );

    const actualDiscount22_1 = await sorCostModal.getDiscountPercent('Add');
    const expectedDiscount22_1 = parseFloat((((priceRateSell22 - sellPerUnit22_1) / priceRateSell22) * 100).toFixed(2));
    expect(parseFloat(actualDiscount22_1)).toBe(expectedDiscount22_1);

    let sellPerUnit22_2: number;
    do {
      sellPerUnit22_2 = parseFloat((Math.random() * (priceRateSell22 - 1) + 0.5).toFixed(2));
    } while (sellPerUnit22_2 === sellPerUnit22_1);

    await sorCostModal.updateSellPerUnit(sellPerUnit22_2);

    const actualDiscount22_2 = await sorCostModal.getDiscountPercent('Add');
    const expectedDiscount22_2 = parseFloat((((priceRateSell22 - sellPerUnit22_2) / priceRateSell22) * 100).toFixed(2));
    expect(parseFloat(actualDiscount22_2)).toBe(expectedDiscount22_2);
  });
});
