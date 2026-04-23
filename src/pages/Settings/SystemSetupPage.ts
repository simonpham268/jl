import type { Locator, Page } from '@playwright/test';
import { test } from '@playwright/test';
import { BasePage } from '../BasePage';
import { sendKeyAndSelectItemOnDropdown } from '../../utils/DropdownUtils';
import { ROUNDING_OPTION, ROUNDING_DURATION } from "../../constants/RoundingConst";
import { JLDropdownElements } from '../Commons/JLDropdownElements';
import type { RoundingSettingModel } from '../../models/RoundingSettingModel';
import { NavigateUtils } from '../../utils/NavigateUtils';

export class SystemSetupPage extends BasePage {
  readonly editButton: Locator; // TODO: verify in DOM
  readonly saveButton: Locator; // TODO: verify in DOM
  readonly dropdownRoundingOption: Locator; // TODO: verify in DOM
  readonly dropdownRoundingDuration: Locator; // TODO: verify in DOM
  readonly preserveUpliftCheckbox: Locator; // TODO: verify in DOM
  readonly jlDropdown: JLDropdownElements;
  readonly navigate: NavigateUtils;

  constructor(page: Page) {
    super(page);
    this.navigate = new NavigateUtils(page);
    this.editButton = page.locator('#editButton'); // TODO: verify in DOM
    this.saveButton = page.locator('button.jl-button-green.jlSaveEditAble.jl-button-save'); // TODO: verify in DOM

    this.dropdownRoundingOption = page.locator('//input[@aria-labelledby=\'jlRoundingType__combobox\']'); // TODO: verify in DOM
    this.dropdownRoundingDuration = page.locator('//input[@aria-labelledby=\'jlRoundingDuration__combobox\']'); // TODO: verify in DOM
    this.jlDropdown = new JLDropdownElements(page);
    this.preserveUpliftCheckbox = page.locator('//input[contains(@name,\'Desktop.IsPreserveEnteredUpliftDiscountPercentage\')]/following-sibling::span'); // TODO: verify in DOM
  }

  async navigateToSystemSetup(): Promise<void> {
    await this.navigate.navigateToSystemSetup();
  }

  async clickEdit(): Promise<void> {
    await test.step('Click Edit button', async () => {
      await this.editButton.click();
    });
  }

  async configureSystemSettingsForRounding(config: RoundingSettingModel): Promise<void> {
    await test.step('Configure system settings for rounding', async () => {
      // reset to default first to ensure test consistency
      await sendKeyAndSelectItemOnDropdown(
          this.page,
          this.dropdownRoundingOption,
          this.jlDropdown.jlDropdownOptions,
          ROUNDING_OPTION.NO_ROUNDING
        );

      if (config.roundingOption !== undefined) {
        await sendKeyAndSelectItemOnDropdown(
          this.page,
          this.dropdownRoundingOption,
          this.jlDropdown.jlDropdownOptions,
          config.roundingOption
        );
      }
      if (config.roundingDuration !== undefined) {
        await sendKeyAndSelectItemOnDropdown(
          this.page,
          this.dropdownRoundingDuration,
          this.jlDropdown.jlDropdownOptions,
          config.roundingDuration
        );
      }
      if (config.preserveUplift !== undefined) {
        await this.preserveUpliftCheckbox.click();
      }
    });
  }

  async clickSave(): Promise<void> {
    await test.step('Click Save button', async () => {
      await this.saveButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }
}
