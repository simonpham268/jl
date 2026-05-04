import type { Locator, Page } from '@playwright/test';
import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import type { CostType } from '../models/CostModel';
import { PriceType, type BaseCostModel } from '../models/CostModel';

export type ModalMode = 'Add' | 'Edit';

export abstract class BaseCostModal extends BasePage {
  readonly addButton: Locator;
  readonly modalDialog: Locator;
  readonly costPerHourInput: Locator;
  readonly fixPriceRadio: Locator;
  readonly actualRadio: Locator;
  readonly estimatedRadio: Locator;
  readonly taxRateDropdownToggle: Locator;
  readonly taxRateListbox: Locator;
  readonly taxRateOptions: Locator;
  readonly sellPerHourInput: Locator;
  readonly descriptionInput: Locator;
  readonly modalSaveButton: Locator;

  constructor(
    page: Page,
    protected readonly costType: CostType,
    protected readonly domName: string = costType,
    nameSuffix: string = domName,
    costFieldName: string = `CostPerHour${nameSuffix}`,
  ) {
    super(page);

    this.addButton = page.locator(`a.quotecost_add:has(i[data-original-title="Add ${domName}"])`);
    this.modalDialog = page.locator('[role="dialog"]');
    this.costPerHourInput = page.locator(`input[name*="${costFieldName}"]`);
    // Radio buttons: click span.my-shape (visible custom radio) inside the label wrapping the hidden input
    this.fixPriceRadio = page.locator(`label:has(input[name*="PriceCalculationType${nameSuffix}"][value="2"]) span.my-shape`);
    this.actualRadio = page.locator(`label:has(input[name*="PriceCalculationType${nameSuffix}"][value="1"]) span.my-shape`);
    this.estimatedRadio = page.locator(`label:has(input[name*="PriceCalculationType${nameSuffix}"][value="0"]) span.my-shape`);
    this.taxRateDropdownToggle = this.modalDialog.locator('#jlTaxCodeId__combobox');
    this.taxRateListbox = page.locator('#jlTaxCodeId__listbox');
    this.taxRateOptions = this.taxRateListbox.locator('.jl__dropdown-option');
    this.sellPerHourInput = page.locator(`input[name*="SellPerUnit${nameSuffix}"]`);
    this.descriptionInput = page.locator(`textarea[name*="Description${nameSuffix}"]`);
    this.modalSaveButton = page.locator('div[style*="display: block;"] .modal-footer .flex button.jl-custom-btn.jl-button-green');
  }

  getUpliftPercentInput(mode: ModalMode): Locator {
    return this.page.locator(`//input[contains(@name,'Uplift${this.domName}-${mode}')]`); // TODO: verify in DOM
  }

  getSellPerHourInput(mode: ModalMode): Locator {
    return this.page.locator(`//input[contains(@name,'SellPerUnit${this.domName}-${mode}')]`); // TODO: verify in DOM
  }

  getEditButton(dynamicText: string): Locator {
    return this.page.locator(`//button[@id='Edit${dynamicText}']`);
  }

  protected async clickAdd(): Promise<void> {
    await test.step(`Click Add ${this.costType} button`, async () => {
      await this.addButton.click();
    });
  }

  protected async fillModal(data: BaseCostModel): Promise<void> {
    await test.step(`Fill Add ${this.costType} Cost modal`, async () => {
      await this.costPerHourInput.clear();
      await this.costPerHourInput.fill(String(data.costPerHour));

      if (data.priceType === PriceType.FIX_PRICE) {
        await this.fixPriceRadio.check();
      } else if (data.priceType === PriceType.ACTUAL) {
        await this.actualRadio.check();
      } else if (data.priceType === PriceType.ESTIMATED) {
        await this.estimatedRadio.check();
      }
      if (data.upliftPercent !== undefined) {
        await this.getUpliftPercentInput('Add').clear();
        await this.getUpliftPercentInput('Add').fill(String(data.upliftPercent));
      }

      if (data.sellPerHour !== undefined) {
        await this.sellPerHourInput.clear();
        await this.sellPerHourInput.fill(String(data.sellPerHour));
      }

      if (data.taxRate !== undefined) {
        await this.taxRateDropdownToggle.click();
        await this.taxRateOptions
          .filter({ hasText: data.taxRate })
          .first()
          .click();
      }

      await this.descriptionInput.scrollIntoViewIfNeeded();
      await this.descriptionInput.fill(data.description);
    });
  }

  async getSellPerHour(mode: ModalMode = 'Add'): Promise<string> {
    return await test.step('Get Sell Per Hour value', async () => {
      const elementHandle = await this.getSellPerHourInput(mode).elementHandle();
      return await this.page.evaluate(el => (el as HTMLInputElement).value, elementHandle);
    });
  }

  async getUpliftPercent(mode: ModalMode = 'Edit'): Promise<string> {
    return await test.step('Get Uplift % value', async () => {
      return await this.getUpliftPercentInput(mode).inputValue();
    });
  }

  async saveModal(): Promise<void> {
    await test.step(`Save ${this.costType} cost modal`, async () => {
      await this.modalSaveButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  protected async clickEditRecord(description: string): Promise<void> {
    await test.step(`Click Edit on ${this.costType} record "${description}"`, async () => {
      await this.page.waitForLoadState('domcontentloaded');
      await this.getEditButton(description).click();
    });
  }
}
