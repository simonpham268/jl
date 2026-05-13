import type { Locator, Page } from '@playwright/test';
import { test } from '@playwright/test';
import { BasePage } from '../BasePage';
import {
  ROUNDING_OPTION,
  ROUNDING_DURATION,
} from '../../constants/RoundingConst';
import { JLDropdownElements } from '../Commons/JLDropdownElements';
import type { RoundingSettingModel } from '../../models/RoundingSettingModel';

type JobProfitabilityView =
  | 'Detailed with Cost Breakdown View'
  | 'Profit Summary View';

/**
 * System Setup Page Object
 * URL: /Setting/SystemSetup
 */
export class SystemSetupPage extends BasePage {
  // Edit button
  readonly editButton: Locator;
  readonly saveButton: Locator; // TODO: verify in DOM
  readonly dropdownRoundingOption: Locator; // TODO: verify in DOM
  readonly dropdownRoundingDuration: Locator; // TODO: verify in DOM
  readonly preserveUpliftCheckbox: Locator; // TODO: verify in DOM
  readonly jlDropdown: JLDropdownElements;
  readonly tooltip: Locator;

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
  readonly preserveUpliftDiscountInfoIcon: Locator;


  // Job Profitability View
  readonly jobProfitabilityViewLabel: Locator;
  readonly profitSummaryViewRadio: Locator;
  readonly profitSummaryViewRadioVisual: Locator;
  readonly profitSummaryViewInfoIcon: Locator;
  readonly detailedCostBreakdownRadio: Locator;
  readonly detailedCostBreakdownRadioVisual: Locator;
  readonly detailedCostBreakdownInfoIcon: Locator;

  constructor(page: Page) {
    super(page);

    // Job Profitability View
    this.jobProfitabilityViewLabel = page.getByText('Job Profitability View');
    this.profitSummaryViewRadio = page.locator('input[name="JobProfitabilityViewType"][value="1"]');
    this.profitSummaryViewRadioVisual = page.locator('.jl-radio:has(input[name="JobProfitabilityViewType"][value="1"]) span.my-shape');
    this.profitSummaryViewInfoIcon = page.locator('//span[normalize-space()="Profit Summary View"]/span');
    this.detailedCostBreakdownRadio = page.locator('input[name="JobProfitabilityViewType"][value="2"]');
    this.detailedCostBreakdownRadioVisual = page.locator('.jl-radio:has(input[name="JobProfitabilityViewType"][value="2"]) span.my-shape');
    this.detailedCostBreakdownInfoIcon = page.locator('//span[normalize-space()="Detailed with Cost Breakdown View"]/span');

    // Rounding Type
    this.roundingTypeCombobox = page.locator('#jlRoundingType__combobox');
    this.roundingTypeListbox = page.locator('#jlRoundingType__listbox');
    this.roundingTypeOptions = page.locator('#jlRoundingType__listbox li');

    // Rounding Duration
    this.roundingDurationCombobox = page.locator(
      '#jlRoundingDuration__combobox',
    );
    this.roundingDurationSearchInput = page.locator(
      '#jlRoundingDuration__combobox .jl__search',
    );
    this.roundingDurationListbox = page.locator('#jlRoundingDuration__listbox');
    this.roundingDurationOptions = page.locator(
      '#jlRoundingDuration__listbox li',
    );

    // Preserve Uplift/Discount
    this.preserveUpliftDiscountCheckbox = page.locator(
      'input[name="Desktop.IsPreserveEnteredUpliftDiscountPercentage"]',
    );
    this.preserveUpliftDiscountLabel = page.locator(
      'span.label-disabled:has-text("Preserve Entered Uplift/Discount Percentage")',
    );
    this.preserveUpliftDiscountHelpText = page.locator(
      '.jl-checkbox .glossary.jl-localted',
    );
    this.preserveUpliftDiscountVisual = page.locator(
      'label:has-text("Preserve Entered Uplift/Discount Percentage") span.my-checkbox',
    );
    this.preserveUpliftDiscountInfoIcon = page.locator('//span[text()="Preserve Entered Uplift/Discount Percentage"]/ancestor::div/span');
    
    this.tooltip = page.locator('.popover-content');
    this.editButton = page.locator('#editButton'); // TODO: verify in DOM
    this.saveButton = page.locator(
      'button.jl-button-green.jlSaveEditAble.jl-button-save',
    ); // TODO: verify in DOM

    this.dropdownRoundingOption = page.locator(
      "//input[@aria-labelledby='jlRoundingType__combobox']",
    ); // TODO: verify in DOM
    this.dropdownRoundingDuration = page.locator(
      "//input[@aria-labelledby='jlRoundingDuration__combobox']",
    ); // TODO: verify in DOM
    this.jlDropdown = new JLDropdownElements(page);
    this.preserveUpliftCheckbox = page.locator(
      "//input[contains(@name,'Desktop.IsPreserveEnteredUpliftDiscountPercentage')]/following-sibling::span",
    ); // TODO: verify in DOM
  }

  async navigateToSystemSetup(): Promise<void> {
    await test.step('Navigate to System Setup page', async () => {
      await super.navigateTo('/Setting/SystemSetup');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  getJobProfitabilityViewRadio(view: JobProfitabilityView): Locator {
    return this.page
      .locator('label')
      .filter({ hasText: view })
      .locator('input[name="JobProfitabilityViewType"]')
      .first();
  }

  async configureJobProfitabilityView(view: JobProfitabilityView): Promise<void> {
    await test.step(`Configure Job Profitability View to "${view}"`, async () => {
      const hasControl = await this.scrollUntilVisible(
        this.jobProfitabilityViewLabel,
      );
      if (!hasControl) return;

      const targetRadio = this.page
        .locator('label')
        .filter({ hasText: view })
        .locator('input[name="JobProfitabilityViewType"]')
        .first();
      if (await targetRadio.isChecked()) return;

      await this.editButton.click();
      await this.page
        .locator('label')
        .filter({ hasText: view })
        .locator('span.my-shape')
        .first()
        .click();
      await this.saveButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async selectRoundingType(optionIndex: number): Promise<string> {
    return await test.step(`Select Rounding Type option ${optionIndex}`, async () => {
      await this.roundingTypeCombobox.scrollIntoViewIfNeeded();
      await this.roundingTypeCombobox.click();

      const count = await this.roundingTypeOptions.count();
      if (count <= optionIndex) {
        throw new Error(
          `Rounding Type option index ${optionIndex} out of range (${count} options)`,
        );
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
      const isDisabled =
        await this.roundingDurationSearchInput.getAttribute('disabled');
      return isDisabled === null;
    });
  }

  async selectRoundingDuration(optionIndex: number): Promise<string> {
    return await test.step(`Select Rounding Duration option ${optionIndex}`, async () => {
      await this.roundingDurationCombobox.click();

      const count = await this.roundingDurationOptions.count();
      if (count <= optionIndex) {
        throw new Error(
          `Rounding Duration option index ${optionIndex} out of range (${count} options)`,
        );
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
      await this.preserveUpliftDiscountLabel.waitFor({
        state: 'visible',
        timeout: this.elementTimeout,
      });
      return (await this.preserveUpliftDiscountLabel.textContent()) ?? '';
    });
  }

  async isPreserveUpliftDiscountDisabled(): Promise<boolean> {
    return await test.step('Check if Preserve Uplift/Discount checkbox is disabled', async () => {
      const isDisabled =
        await this.preserveUpliftDiscountCheckbox.getAttribute('disabled');
      return isDisabled !== null;
    });
  }

  async isPreserveUpliftDiscountChecked(): Promise<boolean> {
    return await test.step('Check if Preserve Uplift/Discount checkbox is checked', async () => {
      await this.page.waitForLoadState('domcontentloaded');
      return await this.preserveUpliftDiscountCheckbox.isChecked();
    });
  }

  async checkPreserveUpliftDiscount(checked = true): Promise<void> {
    await test.step(`Ensure Preserve Uplift/Discount checkbox is ${checked ? 'checked' : 'unchecked'}`, async () => {
      await this.page.waitForLoadState('domcontentloaded');
      const isChecked = await this.preserveUpliftDiscountCheckbox.isChecked();
      if (isChecked !== checked) {
        await this.preserveUpliftDiscountCheckbox.evaluate((el: Element) =>
          (el as HTMLInputElement).click(),
        );
      }
    });
  }

  async togglePreserveUpliftDiscount(): Promise<boolean> {
    return await test.step('Toggle Preserve Uplift/Discount checkbox', async () => {
      const isChecked = await this.preserveUpliftDiscountCheckbox.isChecked();
      await this.preserveUpliftDiscountCheckbox.evaluate((el: Element) =>
        (el as HTMLInputElement).click(),
      );
      return !isChecked;
    });
  }

  async configureSystemSettingsForRounding(
    config: RoundingSettingModel,
  ): Promise<void> {
    await test.step('Configure system settings for rounding', async () => {
      // reset to default first to ensure test consistency
      await this.sendKeyAndSelectItemOnDropdown(
        this.dropdownRoundingOption,
        this.jlDropdown.jlDropdownOptions,
        ROUNDING_OPTION.NO_ROUNDING,
      );

      if (config.roundingOption !== undefined) {
        await this.sendKeyAndSelectItemOnDropdown(
          this.dropdownRoundingOption,
          this.jlDropdown.jlDropdownOptions,
          config.roundingOption,
        );
      }
      if (config.roundingDuration !== undefined) {
        await this.sendKeyAndSelectItemOnDropdown(
          this.dropdownRoundingDuration,
          this.jlDropdown.jlDropdownOptions,
          config.roundingDuration,
        );
      }
      if (config.preserveUplift !== undefined) {
        const isChecked = await this.preserveUpliftCheckbox.isChecked();
        if (config.preserveUplift !== isChecked) {
          await this.preserveUpliftCheckbox.click();
        }
      }
    });
  }

  async clickSave(): Promise<void> {
    await test.step('Click Save button', async () => {
      await this.saveButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickEdit(): Promise<void> {
    await test.step('Click Edit button', async () => {
      await this.editButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.editButton.click();
    });
  }

  async isJobProfitabilityViewDisplayed(): Promise<boolean> {
    return await test.step('Check if Job Profitability View label is displayed', async () => {
      await this.jobProfitabilityViewLabel.scrollIntoViewIfNeeded();
      return await this.jobProfitabilityViewLabel.isVisible();
    });
  }

  async isProfitSummaryViewRadioDisplayed(): Promise<boolean> {
    return await test.step('Check if Profit Summary View radio is displayed', async () => {
      return await this.profitSummaryViewRadioVisual.isVisible();
    });
  }

  async isDetailedCostBreakdownRadioDisplayed(): Promise<boolean> {
    return await test.step('Check if Detailed with Cost Breakdown View radio is displayed', async () => {
      return await this.detailedCostBreakdownRadioVisual.isVisible();
    });
  }

  async areJobProfitabilityRadiosMutuallyExclusive(): Promise<boolean> {
    return await test.step('Verify both Job Profitability View radios share the same group name', async () => {
      const name1 = await this.profitSummaryViewRadio.getAttribute('name');
      const name2 = await this.detailedCostBreakdownRadio.getAttribute('name');
      return name1 === name2 && name1 === 'JobProfitabilityViewType';
    });
  }

  async selectProfitSummaryViewRadio(): Promise<void> {
    await test.step('Select Profit Summary View radio', async () => {
      await this.profitSummaryViewRadioVisual.scrollIntoViewIfNeeded();
      await this.profitSummaryViewRadio.evaluate((el: Element) => (el as HTMLInputElement).click());
    });
  }

  async selectDetailedCostBreakdownRadio(): Promise<void> {
    await test.step('Select Detailed with Cost Breakdown View radio', async () => {
      await this.detailedCostBreakdownRadioVisual.scrollIntoViewIfNeeded();
      await this.detailedCostBreakdownRadio.evaluate((el: Element) => (el as HTMLInputElement).click());
    });
  }

  async isProfitSummaryViewRadioChecked(): Promise<boolean> {
    return await test.step('Check if Profit Summary View radio is checked', async () => {
      return await this.profitSummaryViewRadio.isChecked();
    });
  }

  async isDetailedCostBreakdownRadioChecked(): Promise<boolean> {
    return await test.step('Check if Detailed with Cost Breakdown View radio is checked', async () => {
      return await this.detailedCostBreakdownRadio.isChecked();
    });
  }
}
