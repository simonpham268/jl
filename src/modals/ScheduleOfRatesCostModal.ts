import type { Locator, Page } from '@playwright/test';
import { test } from '@playwright/test';
import { BaseCostModal } from './BaseCostModal';
import { CostType, type ScheduleOfRatesCostModel } from '../models/CostModel';
import { JLDropdownElements } from '../pages/Commons/JLDropdownElements';
export { PriceType } from '../models/CostModel';
export type { ScheduleOfRatesCostModel };

export class ScheduleOfRatesCostModal extends BaseCostModal {
  private readonly jlDropdown: JLDropdownElements;
  readonly dropdownSorItem: Locator;
  readonly dropdownSorLibrary: Locator;
  readonly inputPriceRateSplitCost: Locator;
  readonly inputPriceRateSplitSell: Locator;
  readonly inputDescription: Locator;
  readonly sellPerUnitAddInput: Locator;

  constructor(page: Page) {
    super(page, CostType.SCHEDULE_OF_RATES);
    this.jlDropdown = new JLDropdownElements(page);
    this.dropdownSorItem = this.page.locator('//*[contains(text(),"Schedule of Rates Items")]/following-sibling::div//div[@role="combobox"]//input');
    this.dropdownSorLibrary = this.page.locator('//*[contains(text(),"Schedule of Rates Library")]/following-sibling::div//div[@role="combobox"]//input');
    this.inputPriceRateSplitCost = this.page.locator('//*[contains(text(),"Price Using Rate Split")]/following-sibling::div//input[contains(@name,"Cost")]');
    this.inputPriceRateSplitSell = this.page.locator('//*[contains(text(),"Price Using Rate Split")]/following-sibling::div//input[contains(@name,"Sell")]');
    this.inputDescription = this.page.locator('[role="dialog"]').getByRole('textbox', { name: 'Description', exact: true });
    this.sellPerUnitAddInput = this.page.locator('//input[contains(@name,\'SellPerUnitScheduleOfRates-Add\')]');
  }

  async clickAddScheduleOfRates(): Promise<void> {
    return this.clickAdd();
  }

  async fillAddScheduleOfRatesCostModal(data: ScheduleOfRatesCostModel): Promise<void> {
    await test.step('Fill Add ScheduleOfRates Cost modal', async () => {
      // Select Schedule of Rates Library from dropdown
      await this.sendKeyAndSelectItemOnDropdown(this.dropdownSorLibrary, this.jlDropdown.jlDropdownOptions, data.scheduleOfRateLibrary);

      // Select Schedule of Rates Item from dropdown
      await this.sendKeyAndSelectItemOnDropdown(this.dropdownSorItem, this.jlDropdown.jlDropdownOptions, data.scheduleOfRateItem);

      // Fill Sell Per Unit: Price Using Rate Split section (cost and sell textbox)
      if (data.priceUsingRateSplit) {
        await this.inputPriceRateSplitCost.clear();
        await this.inputPriceRateSplitCost.fill(String(data.priceUsingRateSplit.cost));
        await this.inputPriceRateSplitSell.clear();
        await this.inputPriceRateSplitSell.fill(String(data.priceUsingRateSplit.sell));
      }

      // Fill Uplift % — may trigger recalculation of Sell Per Unit
      const upliftInput = this.getUpliftPercentInput('Add');
      await upliftInput.clear();
      await upliftInput.fill(String(data.upliftPercent));
      await upliftInput.press('Tab');

      // Fill Description
      await this.inputDescription.clear();
      await this.inputDescription.fill(data.description);
    });
  }

  async fillSorModalBySellPerUnit(
    data: { scheduleOfRateLibrary: string; scheduleOfRateItem: string; priceRateSell: number },
    sellPerUnit: number,
  ): Promise<void> {
    await test.step('Fill Add SOR Cost modal by Sell Per Unit', async () => {
      await this.sendKeyAndSelectItemOnDropdown(this.dropdownSorLibrary, this.jlDropdown.jlDropdownOptions, data.scheduleOfRateLibrary);
      await this.sendKeyAndSelectItemOnDropdown(this.dropdownSorItem, this.jlDropdown.jlDropdownOptions, data.scheduleOfRateItem);
      await this.inputPriceRateSplitCost.clear();
      await this.inputPriceRateSplitCost.fill('0');
      await this.inputPriceRateSplitSell.clear();
      await this.inputPriceRateSplitSell.fill(String(data.priceRateSell));
      const sellInput = this.getSellPerHourInput('Add');
      await sellInput.clear();
      await sellInput.fill(String(sellPerUnit));
    });
  }

  async fillSorModalByUplift(
    data: { scheduleOfRateLibrary: string; scheduleOfRateItem: string; priceRateSell: number },
    upliftPercent: number,
  ): Promise<void> {
    await test.step('Fill Add SOR Cost modal by Uplift %', async () => {
      await this.sendKeyAndSelectItemOnDropdown(this.dropdownSorLibrary, this.jlDropdown.jlDropdownOptions, data.scheduleOfRateLibrary);
      await this.sendKeyAndSelectItemOnDropdown(this.dropdownSorItem, this.jlDropdown.jlDropdownOptions, data.scheduleOfRateItem);
      await this.inputPriceRateSplitCost.clear();
      await this.inputPriceRateSplitCost.fill('0');
      await this.inputPriceRateSplitSell.clear();
      await this.inputPriceRateSplitSell.fill(String(data.priceRateSell));
      const upliftInput = this.getUpliftPercentInput('Add');
      await upliftInput.clear();
      await upliftInput.fill(String(upliftPercent));
      await upliftInput.press('Tab');
    });
  }

  async fillSorModalPriceAndDiscount(
    data: { scheduleOfRateLibrary: string; scheduleOfRateItem: string; priceRateSell: number },
    discount: number,
  ): Promise<void> {
    await test.step('Fill Add SOR modal for discount verification', async () => {
      await this.sendKeyAndSelectItemOnDropdown(this.dropdownSorLibrary, this.jlDropdown.jlDropdownOptions, data.scheduleOfRateLibrary);
      await this.sendKeyAndSelectItemOnDropdown(this.dropdownSorItem, this.jlDropdown.jlDropdownOptions, data.scheduleOfRateItem);
      await this.inputPriceRateSplitCost.clear();
      await this.inputPriceRateSplitCost.fill('0');
      await this.inputPriceRateSplitSell.clear();
      await this.inputPriceRateSplitSell.fill(String(data.priceRateSell));
      const discountInput = this.getDiscountPercentInput('Add');
      await discountInput.clear();
      await discountInput.fill(String(discount));
    });
  }

  async fillDescription(description: string): Promise<void> {
    await test.step(`Fill description: ${description}`, async () => {
      await this.inputDescription.clear();
      await this.inputDescription.fill(description);
    });
  }

  async updateSellPerUnit(value: number): Promise<void> {
    await test.step(`Update Sell Per Unit to ${value}`, async () => {
      await this.sellPerUnitAddInput.clear();
      await this.sellPerUnitAddInput.fill(String(value));
    });
  }

  async clickEditScheduleOfRatesRecord(description: string): Promise<void> {
    return this.clickEditRecord(description);
  }
}
