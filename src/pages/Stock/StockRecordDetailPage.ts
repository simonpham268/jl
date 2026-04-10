import { type Locator, type Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Stock Record Detail Tab options
 */
export type StockRecordDetailTab = 'Details' | 'Stock Location' | 'History';

/**
 * Stock type options
 */
export type StockType = 'Part' | 'Equipment' | 'Consumable';

/**
 * Stock record data
 */
export interface StockRecordData {
  number?: string;
  description?: string;
  reference?: string;
  pricePerUnit?: string;
  sellPerUnit?: string;
  unit?: string;
  stockType?: StockType;
  supplier?: string;
  reorderLevel?: number;
  reorderQuantity?: number;
}

/**
 * Stock location data
 */
export interface StockLocationData {
  location: string;
  quantity: number;
}

/**
 * StockRecordDetailPage - Page Object for Stock Record Detail page
 * URL Pattern: /Stock/Detail/{stockId}
 */
export class StockRecordDetailPage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;
  readonly breadcrumbStockRecords: Locator;
  readonly stockNumber: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly detailsTab: Locator;
  readonly stockLocationTab: Locator;
  readonly historyButton: Locator;

  // ========================
  // Locators - Header Actions
  // ========================
  readonly editButton: Locator;
  readonly saveButton: Locator;
  readonly undoButton: Locator;

  // ========================
  // Locators - Stock Details Section
  // ========================
  readonly stockDetailsHeading: Locator;
  readonly numberInput: Locator;
  readonly descriptionInput: Locator;
  readonly referenceInput: Locator;
  readonly pricePerUnitInput: Locator;
  readonly sellPerUnitInput: Locator;
  readonly unitDropdown: Locator;
  readonly stockTypeDropdown: Locator;
  readonly supplierDropdown: Locator;
  readonly reorderLevelInput: Locator;
  readonly reorderQuantityInput: Locator;

  // ========================
  // Locators - Stock Location Section
  // ========================
  readonly addLocationButton: Locator;
  readonly locationTable: Locator;
  readonly totalInStock: Locator;

  // ========================
  // Locators - Status
  // ========================
  readonly activeStatusButton: Locator;
  readonly suspendedStatusButton: Locator;

  // ========================
  // Locators - Toast & Modal
  // ========================
  readonly toastMessage: Locator;
  readonly confirmModal: Locator;
  readonly confirmYesButton: Locator;
  readonly confirmNoButton: Locator;

  constructor(page: Page) {
    super(page);

    // Page Header
    this.pageTitle = page.getByRole('heading', { level: 3 }).filter({ hasText: 'Stock Records /' });
    this.breadcrumbStockRecords = page.getByRole('link', { name: 'Stock Records', exact: true });
    this.stockNumber = page.locator('h3').locator('span, div').last();

    // Tabs
    this.detailsTab = page.getByRole('link', { name: 'Details', exact: true });
    this.stockLocationTab = page.getByRole('link', { name: 'Stock Location' });
    this.historyButton = page.getByRole('button', { name: 'History' });

    // Header Actions
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.undoButton = page.getByRole('button', { name: 'Undo' });

    // Stock Details Section
    this.stockDetailsHeading = page.getByRole('heading', { name: /Stock.*Details/i });
    this.numberInput = page.locator('text=Number').locator('..').getByRole('textbox');
    this.descriptionInput = page.locator('text=Description').locator('..').getByRole('textbox');
    this.referenceInput = page.locator('text=Reference').locator('..').getByRole('textbox');
    this.pricePerUnitInput = page.locator('text=Price Per Unit').locator('..').getByRole('spinbutton, textbox');
    this.sellPerUnitInput = page.locator('text=Sell Per Unit').locator('..').getByRole('spinbutton, textbox');
    this.unitDropdown = page.locator('text=Unit').locator('..').locator('[role="combobox"], [class*="multiselect"]');
    this.stockTypeDropdown = page.locator('text=Stock Type').locator('..').locator('[role="combobox"], [class*="multiselect"]');
    this.supplierDropdown = page.locator('text=Supplier').locator('..').locator('[role="combobox"], [class*="multiselect"]');
    this.reorderLevelInput = page.locator('text=Reorder Level').locator('..').getByRole('spinbutton, textbox');
    this.reorderQuantityInput = page.locator('text=Reorder Quantity').locator('..').getByRole('spinbutton, textbox');

    // Stock Location Section
    this.addLocationButton = page.getByRole('button', { name: /Add.*Location/i });
    this.locationTable = page.locator('table').filter({ has: page.locator('th', { hasText: /Location|Quantity/i }) });
    this.totalInStock = page.locator('text=In Stock').locator('..').locator('span, div').last();

    // Status
    this.activeStatusButton = page.getByRole('button', { name: 'Active' })
      .or(page.locator('text=Active').filter({ has: page.locator('[class*="radio"]') }));
    this.suspendedStatusButton = page.getByRole('button', { name: 'Suspended' })
      .or(page.locator('text=Suspended').filter({ has: page.locator('[class*="radio"]') }));

    // Toast & Modal
    this.toastMessage = page.locator('.toast, [class*="toast"], [role="alert"]');
    this.confirmModal = page.locator('.modal.show, .modal[style*="display: block"]');
    this.confirmYesButton = this.confirmModal.getByRole('button', { name: /yes|confirm|ok/i });
    this.confirmNoButton = this.confirmModal.getByRole('button', { name: /no|cancel/i });
  }

  // ========================
  // Dynamic Locator Helpers
  // ========================

  private getDropdownOption(text: string): Locator {
    return this.page.locator(
      `[role="option"]:has-text("${text}"), .dropdown-item:has-text("${text}"), li:has-text("${text}")`
    ).first();
  }

  private getLocationRow(locationName: string): Locator {
    return this.locationTable.locator('tr').filter({ hasText: locationName });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to a stock record detail page by ID
   * @param stockId - Stock ID
   */
  async navigateTo(stockId: string | number): Promise<void> {
    await test.step(`Navigate to stock record: ${stockId}`, async () => {
      await this.page.goto(`/Stock/Detail/${stockId}`);
      await this.waitForPageLoad();
    });
  }

  /**
   * Wait for page to finish loading
   */
  async waitForPageLoad(): Promise<void> {
    await test.step('Wait for stock record detail page to load', async () => {
      await this.page.waitForLoadState('domcontentloaded');
      await expect(this.pageTitle).toBeVisible({ timeout: 15000 });
    });
  }

  /**
   * Go back to Stock Records list
   */
  async goBackToStockRecords(): Promise<void> {
    await test.step('Go back to Stock Records list', async () => {
      await this.breadcrumbStockRecords.click();
      await this.page.waitForURL(/\/Stock(?:\?|$|\/Index)/);
    });
  }

  // ========================
  // Tab Navigation
  // ========================

  /**
   * Switch to a specific tab
   * @param tab - Tab to switch to
   */
  async switchToTab(tab: StockRecordDetailTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabMap: Record<StockRecordDetailTab, Locator> = {
        'Details': this.detailsTab,
        'Stock Location': this.stockLocationTab,
        'History': this.historyButton,
      };

      await tabMap[tab].click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Check if a tab is currently active
   * @param tab - Tab to check
   */
  async isTabActive(tab: StockRecordDetailTab): Promise<boolean> {
    const tabMap: Record<StockRecordDetailTab, Locator> = {
      'Details': this.detailsTab,
      'Stock Location': this.stockLocationTab,
      'History': this.historyButton,
    };

    const isExpanded = await tabMap[tab].getAttribute('aria-expanded');
    const isActive = await tabMap[tab].getAttribute('class');
    return isExpanded === 'true' || (isActive?.includes('active') ?? false);
  }

  // ========================
  // Edit Mode
  // ========================

  /**
   * Enable edit mode
   */
  async enableEditMode(): Promise<void> {
    await test.step('Enable edit mode', async () => {
      await this.editButton.click();
      await expect(this.descriptionInput).toBeEnabled({ timeout: 5000 });
    });
  }

  /**
   * Save changes
   */
  async saveChanges(): Promise<void> {
    await test.step('Save changes', async () => {
      await this.saveButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Undo changes
   */
  async undoChanges(): Promise<void> {
    await test.step('Undo changes', async () => {
      await this.undoButton.click();
    });
  }

  /**
   * Check if page is in edit mode
   */
  async isInEditMode(): Promise<boolean> {
    return await this.descriptionInput.isEnabled();
  }

  // ========================
  // Stock Details - Fill Methods
  // ========================

  /**
   * Fill description field
   */
  async fillDescription(value: string): Promise<void> {
    await test.step(`Fill description: ${value}`, async () => {
      await this.descriptionInput.fill(value);
    });
  }

  /**
   * Fill reference field
   */
  async fillReference(value: string): Promise<void> {
    await test.step(`Fill reference: ${value}`, async () => {
      await this.referenceInput.fill(value);
    });
  }

  /**
   * Fill price per unit
   */
  async fillPricePerUnit(value: string): Promise<void> {
    await test.step(`Fill price per unit: ${value}`, async () => {
      await this.pricePerUnitInput.fill(value);
    });
  }

  /**
   * Fill sell per unit
   */
  async fillSellPerUnit(value: string): Promise<void> {
    await test.step(`Fill sell per unit: ${value}`, async () => {
      await this.sellPerUnitInput.fill(value);
    });
  }

  /**
   * Select unit
   */
  async selectUnit(unit: string): Promise<void> {
    await test.step(`Select unit: ${unit}`, async () => {
      await this.unitDropdown.click();
      await this.getDropdownOption(unit).click();
    });
  }

  /**
   * Select stock type
   */
  async selectStockType(type: StockType): Promise<void> {
    await test.step(`Select stock type: ${type}`, async () => {
      await this.stockTypeDropdown.click();
      await this.getDropdownOption(type).click();
    });
  }

  /**
   * Select supplier
   */
  async selectSupplier(supplier: string): Promise<void> {
    await test.step(`Select supplier: ${supplier}`, async () => {
      await this.supplierDropdown.click();
      await this.getDropdownOption(supplier).click();
    });
  }

  /**
   * Fill reorder level
   */
  async fillReorderLevel(value: number): Promise<void> {
    await test.step(`Fill reorder level: ${value}`, async () => {
      await this.reorderLevelInput.fill(value.toString());
    });
  }

  /**
   * Fill reorder quantity
   */
  async fillReorderQuantity(value: number): Promise<void> {
    await test.step(`Fill reorder quantity: ${value}`, async () => {
      await this.reorderQuantityInput.fill(value.toString());
    });
  }

  // ========================
  // Status
  // ========================

  /**
   * Set stock record as active
   */
  async setActive(): Promise<void> {
    await test.step('Set stock record as active', async () => {
      await this.activeStatusButton.click();
    });
  }

  /**
   * Set stock record as suspended
   */
  async setSuspended(): Promise<void> {
    await test.step('Set stock record as suspended', async () => {
      await this.suspendedStatusButton.click();
    });
  }

  // ========================
  // Stock Location
  // ========================

  /**
   * Click Add Location button
   */
  async clickAddLocation(): Promise<void> {
    await test.step('Click Add Location button', async () => {
      await this.addLocationButton.click();
    });
  }

  /**
   * Get total in stock
   */
  async getTotalInStock(): Promise<string> {
    return await test.step('Get total in stock', async () => {
      const text = await this.totalInStock.textContent() || '';
      return text.trim();
    });
  }

  // ========================
  // Toast & Modal Helpers
  // ========================

  /**
   * Wait for toast message to appear
   */
  async waitForToast(): Promise<string> {
    return await test.step('Wait for toast message', async () => {
      await this.toastMessage.waitFor({ state: 'visible', timeout: 10000 });
      return await this.toastMessage.textContent() || '';
    });
  }

  /**
   * Confirm action in modal
   */
  async confirmAction(): Promise<void> {
    await test.step('Confirm action', async () => {
      await this.confirmYesButton.click();
      await this.confirmModal.waitFor({ state: 'hidden', timeout: 5000 });
    });
  }

  /**
   * Cancel action in modal
   */
  async cancelAction(): Promise<void> {
    await test.step('Cancel action', async () => {
      await this.confirmNoButton.click();
      await this.confirmModal.waitFor({ state: 'hidden', timeout: 5000 });
    });
  }
}
