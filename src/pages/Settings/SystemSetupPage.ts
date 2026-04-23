import type { Locator, Page } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * System Setup Page Object
 * URL: /Setting/SystemSetup
 */
export class SystemSetupPage {
  readonly page: Page;

  // Edit button
  readonly editButton: Locator;

  // Rounding Type dropdown
  readonly roundingTypeCombobox: Locator;
  readonly roundingTypeListbox: Locator;
  readonly roundingTypeOptions: Locator;

  // Rounding Duration dropdown
  readonly roundingDurationCombobox: Locator;
  readonly roundingDurationSearchInput: Locator;
  readonly roundingDurationListbox: Locator;
  readonly roundingDurationOptions: Locator;

  // Preserve Uplift/Discount checkbox
  readonly preserveUpliftDiscountCheckbox: Locator;
  readonly preserveUpliftDiscountLabel: Locator;
  readonly preserveUpliftDiscountHelpText: Locator;
  readonly preserveUpliftDiscountVisual: Locator;

  constructor(page: Page) {
    this.page = page;

    // Edit button
    this.editButton = page.locator('button#editButton');

    // Rounding Type
    this.roundingTypeCombobox = page.locator('#jlRoundingType__combobox');
    this.roundingTypeListbox = page.locator('#jlRoundingType__listbox');
    this.roundingTypeOptions = page.locator('#jlRoundingType__listbox li');

    // Rounding Duration
    this.roundingDurationCombobox = page.locator('#jlRoundingDuration__combobox');
    this.roundingDurationSearchInput = page.locator('#jlRoundingDuration__combobox .jl__search');
    this.roundingDurationListbox = page.locator('#jlRoundingDuration__listbox');
    this.roundingDurationOptions = page.locator('#jlRoundingDuration__listbox li');

    // Preserve Uplift/Discount
    this.preserveUpliftDiscountCheckbox = page.locator('input[name="Desktop.IsPreserveEnteredUpliftDiscountPercentage"]');
    this.preserveUpliftDiscountLabel = page.locator('span.label-disabled:has-text("Preserve Entered Uplift/Discount Percentage")');
    this.preserveUpliftDiscountHelpText = page.locator('.jl-checkbox .glossary.jl-localted');
    this.preserveUpliftDiscountVisual = page.locator('label:has-text("Preserve Entered Uplift/Discount Percentage") span.my-checkbox');
  }

  async clickEdit(): Promise<void> {
    await test.step('Click Edit button', async () => {
      await this.editButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.editButton.click();
    });
  }

  async selectRoundingType(optionIndex: number): Promise<string> {
    return await test.step(`Select Rounding Type option ${optionIndex}`, async () => {
      await this.roundingTypeCombobox.scrollIntoViewIfNeeded();
      await this.roundingTypeCombobox.click();

      const count = await this.roundingTypeOptions.count();
      if (count <= optionIndex) {
        throw new Error(`Rounding Type option index ${optionIndex} out of range (${count} options)`);
      }

      const option = this.roundingTypeOptions.nth(optionIndex);
      const text = await option.textContent();
      await option.click();
      return text?.trim() ?? '';
    });
  }

  async selectRoundingTypeByText(text: string): Promise<void> {
    return await test.step(`Select Rounding Type by text: ${text}`, async () => {
      await this.roundingTypeCombobox.scrollIntoViewIfNeeded();
      await this.roundingTypeCombobox.click();

      const option = this.roundingTypeOptions.filter({ hasText: text }).first();
      await option.click();
    });
  }

  async isRoundingDurationEnabled(): Promise<boolean> {
    return await test.step('Check if Rounding Duration is enabled', async () => {
      const isDisabled = await this.roundingDurationSearchInput.getAttribute('disabled');
      return isDisabled === null;
    });
  }

  async selectRoundingDuration(optionIndex: number): Promise<string> {
    return await test.step(`Select Rounding Duration option ${optionIndex}`, async () => {
      await this.roundingDurationCombobox.click();

      const count = await this.roundingDurationOptions.count();
      if (count <= optionIndex) {
        throw new Error(`Rounding Duration option index ${optionIndex} out of range (${count} options)`);
      }

      const option = this.roundingDurationOptions.nth(optionIndex);
      const text = await option.textContent();
      await option.click();
      return text?.trim() ?? '';
    });
  }

  async isPreserveUpliftDiscountDisplayed(): Promise<boolean> {
    return await test.step('Check if Preserve Uplift/Discount checkbox is displayed', async () => {
      return await this.preserveUpliftDiscountCheckbox.isVisible();
    });
  }

  async getPreserveUpliftDiscountLabelText(): Promise<string> {
    return await test.step('Get Preserve Uplift/Discount label text', async () => {
      await this.preserveUpliftDiscountLabel.waitFor({ state: 'visible', timeout: 5000 });
      return await this.preserveUpliftDiscountLabel.textContent() ?? '';
    });
  }

  async isPreserveUpliftDiscountDisabled(): Promise<boolean> {
    return await test.step('Check if Preserve Uplift/Discount checkbox is disabled', async () => {
      const isDisabled = await this.preserveUpliftDiscountCheckbox.getAttribute('disabled');
      return isDisabled !== null;
    });
  }

  async togglePreserveUpliftDiscount(): Promise<boolean> {
    return await test.step('Toggle Preserve Uplift/Discount checkbox', async () => {
      const isChecked = await this.preserveUpliftDiscountCheckbox.isChecked();
      await this.preserveUpliftDiscountCheckbox.evaluate((el: Element) => (el as HTMLInputElement).click());
      return !isChecked;
    });
  }
}
