import type { Locator, Page } from "@playwright/test";
import { test } from "@playwright/test";
import { BasePage } from "../BasePage";
import {
  ROUNDING_OPTION,
  ROUNDING_DURATION,
} from "../../constants/RoundingConst";
import { JLDropdownElements } from "../Commons/JLDropdownElements";
import type { RoundingSettingModel } from "../../models/RoundingSettingModel";

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

  // Job Profitability View radio group
  readonly jobProfitabilityViewLabel: Locator;

  constructor(page: Page) {
    super(page);

    // Job Profitability View
    this.jobProfitabilityViewLabel = page.getByText("Job Profitability View");

    // Rounding Type
    this.roundingTypeCombobox = page.locator("#jlRoundingType__combobox");
    this.roundingTypeListbox = page.locator("#jlRoundingType__listbox");
    this.roundingTypeOptions = page.locator("#jlRoundingType__listbox li");

    // Rounding Duration
    this.roundingDurationCombobox = page.locator(
      "#jlRoundingDuration__combobox",
    );
    this.roundingDurationSearchInput = page.locator(
      "#jlRoundingDuration__combobox .jl__search",
    );
    this.roundingDurationListbox = page.locator("#jlRoundingDuration__listbox");
    this.roundingDurationOptions = page.locator(
      "#jlRoundingDuration__listbox li",
    );

    // Preserve Uplift/Discount
    this.preserveUpliftDiscountCheckbox = page.locator(
      'input[name="Desktop.IsPreserveEnteredUpliftDiscountPercentage"]',
    );
    this.preserveUpliftDiscountLabel = page.locator(
      'span.label-disabled:has-text("Preserve Entered Uplift/Discount Percentage")',
    );
    this.preserveUpliftDiscountHelpText = page.locator(
      ".jl-checkbox .glossary.jl-localted",
    );
    this.preserveUpliftDiscountVisual = page.locator(
      'label:has-text("Preserve Entered Uplift/Discount Percentage") span.my-checkbox',
    );

    this.editButton = page.locator("#editButton"); // TODO: verify in DOM
    this.saveButton = page.locator(
      "button.jl-button-green.jlSaveEditAble.jl-button-save",
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
    await test.step("Navigate to System Setup page", async () => {
      await super.navigateTo("/Setting/SystemSetup");
      await this.page.waitForLoadState("domcontentloaded");
    });
  }

  async configureJobProfitabilityView(view: string): Promise<void> {
    await test.step(`Configure Job Profitability View to "${view}"`, async () => {
      const hasControl = await this.scrollUntilVisible(
        this.jobProfitabilityViewLabel,
      );
      if (!hasControl) return;

      const targetRadio = this.page
        .locator("label")
        .filter({ hasText: view })
        .locator('input[name="JobProfitabilityViewType"]')
        .first();
      if (await targetRadio.isChecked()) return;

      await this.editButton.click();
      await this.page
        .locator("label")
        .filter({ hasText: view })
        .locator("span.my-shape")
        .first()
        .click();
      await this.saveButton.click();
      await this.page.waitForLoadState("domcontentloaded");
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
      return text?.trim() ?? "";
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
    return await test.step("Check if Rounding Duration is enabled", async () => {
      const isDisabled =
        await this.roundingDurationSearchInput.getAttribute("disabled");
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
      return text?.trim() ?? "";
    });
  }

  async isPreserveUpliftDiscountDisplayed(): Promise<boolean> {
    return await test.step("Check if Preserve Uplift/Discount checkbox is displayed", async () => {
      return await this.preserveUpliftDiscountCheckbox.isVisible();
    });
  }

  async getPreserveUpliftDiscountLabelText(): Promise<string> {
    return await test.step("Get Preserve Uplift/Discount label text", async () => {
      await this.preserveUpliftDiscountLabel.waitFor({
        state: "visible",
        timeout: this.elementTimeout,
      });
      return (await this.preserveUpliftDiscountLabel.textContent()) ?? "";
    });
  }

  async isPreserveUpliftDiscountDisabled(): Promise<boolean> {
    return await test.step("Check if Preserve Uplift/Discount checkbox is disabled", async () => {
      const isDisabled =
        await this.preserveUpliftDiscountCheckbox.getAttribute("disabled");
      return isDisabled !== null;
    });
  }

  async togglePreserveUpliftDiscount(): Promise<boolean> {
    return await test.step("Toggle Preserve Uplift/Discount checkbox", async () => {
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
    await test.step("Configure system settings for rounding", async () => {
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
        await this.preserveUpliftCheckbox.click();
      }
    });
  }

  async clickSave(): Promise<void> {
    await test.step("Click Save button", async () => {
      await this.saveButton.click();
      await this.page.waitForLoadState("domcontentloaded");
    });
  }

  async clickEdit(): Promise<void> {
    await test.step("Click Edit button", async () => {
      await this.editButton.waitFor({ state: "visible", timeout: 5000 });
      await this.editButton.click();
    });
  }
}
