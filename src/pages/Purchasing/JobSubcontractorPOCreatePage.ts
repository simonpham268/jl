import type { Locator, Page } from '@playwright/test';
import { test } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * JobSubcontractorPOCreatePage
 * Handles the "Add Supplier Purchase Order" form navigated to from a Job's
 * History > Supplier Purchase Orders tab.
 *
 * - Supplier field: Kendo ComboBox (k-select toggle, SupplierId_listbox)
 * - Supplier Contact field: JobLogic Vue component (jl__open-indicator toggle, jl__dropdown-menu)
 */
export class JobSubcontractorPOCreatePage extends BasePage {
  // ========================
  // Locators - Subcontractor (Kendo ComboBox)
  // ========================
  readonly subcontractorToggle: Locator;
  readonly subcontractorListbox: Locator;

  // ========================
  // Locators - Supplier (Kendo ComboBox)
  // ========================
  readonly supplierToggle: Locator;
  readonly supplierListbox: Locator;
  readonly supplierAddButton: Locator;

  // ========================
  // Locators - Supplier Contact (Vue jl__ component)
  // ========================
  readonly supplierContactToggle: Locator;
  readonly supplierContactDropdownMenu: Locator;
  readonly supplierContactAddButton: Locator;

  // ========================
  // Locators - Delivery Address
  // ========================
  readonly selectDeliveryAddressButton: Locator;
  readonly deliverToJobLink: Locator;

  // ========================
  // Locators - Form Actions
  // ========================
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    // Subcontractor: Kendo combobox (note capital C: SubContractorId)
    this.subcontractorToggle = page.locator('[aria-controls="SubContractorId_listbox"].k-select');
    this.subcontractorListbox = page.locator('#SubContractorId_listbox');

    // Supplier: Kendo combobox — click the k-select arrow to open SupplierId_listbox
    this.supplierToggle = page.locator('[aria-controls="SupplierId_listbox"].k-select');
    this.supplierListbox = page.locator('#SupplierId_listbox');
    this.supplierAddButton = page.locator('button[onclick*="CreateSupplier_ButtonClick"]');

    // Supplier Contact: Vue jl__ component — toggle is i.jl__open-indicator, options in #jlContact__listbox
    this.supplierContactToggle = page.locator('i.jl-custom-toggle.jl__open-indicator');
    this.supplierContactDropdownMenu = page.locator('#jlContact__listbox');
    this.supplierContactAddButton = page.locator('button[onclick*="SupplierContact"]');

    // Delivery Address
    this.selectDeliveryAddressButton = page.locator('#selectDeliveryAddressModal');
    this.deliverToJobLink = page.locator('a.changeDeliveryAddress').filter({ hasText: 'Deliver to Job' });

    this.saveButton = page.locator('button.jl-custom-btn.jl-button-green.disableSubmitButton');
  }

  async selectFirstSubcontractor(): Promise<void> {
    await test.step('Select first subcontractor', async () => {
      await this.subcontractorToggle.click();
      await this.subcontractorListbox.locator('.k-item').first().waitFor({ state: 'visible', timeout: 5000 });
      await this.subcontractorListbox.locator('.k-item').first().click();
    });
  }

  /**
   * Select the first supplier from the Kendo combobox.
   * Ensure at least one supplier exists in the test environment.
   */
  async selectFirstSupplier(): Promise<void> {
    await test.step('Select first supplier', async () => {
      await this.supplierToggle.click();
      await this.supplierListbox.locator('.k-item').first().waitFor({ state: 'visible', timeout: 5000 });
      await this.supplierListbox.locator('.k-item').first().click();
    });
  }

  /**
   * Select the first supplier contact from the Vue jl__ dropdown.
   * Call after selectFirstSupplier() — contacts are filtered by the selected supplier.
   */
  async selectFirstSupplierContact(): Promise<void> {
    await test.step('Select first supplier contact', async () => {
      await this.supplierContactToggle.click();
      await this.supplierContactDropdownMenu.locator('.jl__dropdown-option').first().waitFor({ state: 'visible', timeout: 5000 });
      await this.supplierContactDropdownMenu.locator('.jl__dropdown-option').first().click();
    });
  }

  /**
   * Open the delivery address modal and click "Deliver to Job".
   */
  async selectDeliverToJob(): Promise<void> {
    await test.step('Select Deliver to Job delivery address', async () => {
      await this.selectDeliveryAddressButton.click();
      await this.deliverToJobLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.deliverToJobLink.click();
    });
  }

  async save(): Promise<void> {
    await test.step('Save Purchase Order', async () => {
      await this.saveButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }
}
