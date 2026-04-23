import type { Locator, Page } from '@playwright/test';
import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { CostType, PriceType, type BaseCostModel } from '../models/CostModel';

export type ModalMode = 'Add' | 'Edit';

export abstract class BaseCostModal extends BasePage {
  readonly addButton: Locator;
  readonly modalDialog: Locator;
  readonly costPerHourInput: Locator;
  readonly fixPriceRadio: Locator;
  readonly actualRadio: Locator;
  readonly estimatedRadio: Locator;
  readonly descriptionInput: Locator;
  readonly modalSaveButton: Locator;

  constructor(page: Page, protected readonly costType: CostType) {
    super(page);
    this.addButton = page.locator(`#Add-${costType}`); // TODO: verify in DOM
    this.modalDialog = page.locator('[role="dialog"]'); // TODO: verify in DOM
    this.costPerHourInput = page.locator(`//input[contains(@name,'CostPerUnit${costType}-Add')]`); // TODO: verify in DOM
    this.fixPriceRadio = page.locator(`//input[contains(@name,'PriceCalculationType${costType}-Add')]/following-sibling::span[contains(text(),'Fixed Price')]`); // TODO: verify in DOM
    this.actualRadio = page.locator(`//input[contains(@name,'PriceCalculationType${costType}-Add')]/following-sibling::span[contains(text(),'Actual')]`); // TODO: verify in DOM
    this.estimatedRadio = page.locator(`//input[contains(@name,'PriceCalculationType${costType}-Add')]/following-sibling::span[contains(text(),'Estimated')]`); // TODO: verify in DOM
    this.descriptionInput = page.locator(`//textarea[contains(@name,'Description${costType}-Add')]`); // TODO: verify in DOM
    this.modalSaveButton = page.locator('div[style*="display: block;"] .modal-footer .flex button.jl-custom-btn.jl-button-green'); // TODO: verify in DOM
  }

  getUpliftPercentInput(mode: ModalMode): Locator {
    return this.page.locator(`//input[contains(@name,'Uplift${this.costType}-${mode}')]`); // TODO: verify in DOM
  }

  getSellPerHourInput(mode: ModalMode): Locator {
    return this.page.locator(`//input[contains(@name,'SellPerUnit${this.costType}-${mode}')]`); // TODO: verify in DOM
  }

  getEditButton(dynamicText: string): Locator {
    return this.page.locator(`//button[@id='Edit${dynamicText}']`); // TODO: verify in DOM
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
      const upliftInput = this.getUpliftPercentInput('Add');
      await upliftInput.clear();
      await upliftInput.fill(String(data.upliftPercent));

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
