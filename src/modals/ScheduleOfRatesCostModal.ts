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

  constructor(page: Page) {
    super(page, CostType.SCHEDULE_OF_RATES);
    this.jlDropdown = new JLDropdownElements(page);
    this.dropdownSorItem = this.page.locator('//*[contains(text(),"Schedule of Rates Items")]/following-sibling::div//div[@role="combobox"]//input');
    this.dropdownSorLibrary = this.page.locator('//*[contains(text(),"Schedule of Rates Library")]/following-sibling::div//div[@role="combobox"]//input');
    this.inputPriceRateSplitCost = this.page.locator('//*[contains(text(),"Price Using Rate Split")]/following-sibling::div//input[contains(@name,"Cost")]');
    this.inputPriceRateSplitSell = this.page.locator('//*[contains(text(),"Price Using Rate Split")]/following-sibling::div//input[contains(@name,"Sell")]');
    this.inputDescription = this.page.locator('[role="dialog"]').getByRole('textbox', { name: 'Description', exact: true });
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

  async clickEditScheduleOfRatesRecord(description: string): Promise<void> {
    return this.clickEditRecord(description);
  }
}
