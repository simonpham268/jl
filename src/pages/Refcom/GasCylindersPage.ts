import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Cylinder type options
 */
export type CylinderType = 'Recovery / Receiver' | 'Virgin' | 'Waste' | 'Non-Refrigerant';

/**
 * Location type options
 */
export type LocationType = 'Storeroom' | 'Engineer' | 'Site' | 'Stock Location';

/**
 * Gas Cylinder tab type
 */
export type GasCylinderTab = 'Active' | 'All' | 'Overdue' | 'Empty And Full' | 'Deleted' | 'Returned';

/**
 * Gas Cylinder item interface
 */
export interface GasCylinderItem {
  serialNumber?: string;
  qrCode?: string;
  cylinderType?: CylinderType;
  refrigerantType?: string;
  returnDate?: string;
  site?: string;
  engineer?: string;
  supplier?: string;
  location?: LocationType;
}

/**
 * Gas Cylinders search options
 */
export interface GasCylindersSearchOptions {
  searchTerm?: string;
  cylinderType?: CylinderType;
  refrigerantType?: string[];
  returnDateStart?: string;
  returnDateEnd?: string;
  site?: string;
  engineers?: string[];
  suppliers?: string[];
  locations?: LocationType[];
}

/**
 * GasCylindersPage - Page Object for Gas Cylinders page
 * URL: /Refcom
 */
export class GasCylindersPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addCylinderButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchCylinderInput: Locator;
  readonly cylinderTypeDropdown: Locator;
  readonly refrigerantTypeMultiselect: Locator;
  readonly returnDateStartInput: Locator;
  readonly returnDateEndInput: Locator;
  readonly siteCombobox: Locator;
  readonly engineersMultiselect: Locator;
  readonly supplierMultiselect: Locator;
  readonly storeroomToggle: Locator;
  readonly engineerToggle: Locator;
  readonly siteToggle: Locator;
  readonly stockLocationToggle: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Results/Tabs
  // ========================
  readonly activeTab: Locator;
  readonly allTab: Locator;
  readonly overdueTab: Locator;
  readonly emptyAndFullTab: Locator;
  readonly deletedTab: Locator;
  readonly returnedTab: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Gas Cylinders' });
    this.addCylinderButton = page.getByRole('button', { name: /Add Cylinder/ });

    // Filter
    this.searchCylinderInput = page.getByPlaceholder(/Serial Number|QR Code/);
    this.cylinderTypeDropdown = page.locator('text=Cylinder Type').locator('..').locator('select');
    this.refrigerantTypeMultiselect = page.locator('text=Refrigerant Type').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.returnDateStartInput = page.getByPlaceholder('Start Date');
    this.returnDateEndInput = page.getByPlaceholder('End Date');
    this.siteCombobox = page.locator('text=Site').locator('..').locator('[role="combobox"], input');
    this.engineersMultiselect = page.locator('text=Engineers').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.supplierMultiselect = page.locator('text=Supplier').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.storeroomToggle = page.locator('text=Storeroom');
    this.engineerToggle = page.locator('text=Location').locator('..').locator('text=Engineer');
    this.siteToggle = page.locator('text=Location').locator('..').locator('text=Site');
    this.stockLocationToggle = page.locator('text=Stock Location');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Results/Tabs
    this.activeTab = page.getByRole('tab', { name: /Active/ });
    this.allTab = page.getByRole('tab', { name: /^All/ });
    this.overdueTab = page.getByRole('tab', { name: /Overdue/ });
    this.emptyAndFullTab = page.getByRole('tab', { name: /Empty And Full/ });
    this.deletedTab = page.getByRole('tab', { name: /Deleted/ });
    this.returnedTab = page.getByRole('tab', { name: /Returned/ });
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading Data');
    this.noResultsMessage = page.locator('text=No matching results found');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Gas Cylinders page
   */
  async navigateToGasCylinders(): Promise<void> {
    await test.step('Navigate to Gas Cylinders page', async () => {
      await this.page.goto('/Refcom');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Gas Cylinders page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Click Add Cylinder button
   */
  async clickAddCylinder(): Promise<void> {
    await test.step('Click Add Cylinder button', async () => {
      await this.addCylinderButton.click();
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Search cylinder
   */
  async searchCylinder(serialOrQrCode: string): Promise<void> {
    await test.step(`Search cylinder: ${serialOrQrCode}`, async () => {
      await this.searchCylinderInput.fill(serialOrQrCode);
    });
  }

  /**
   * Select cylinder type
   */
  async selectCylinderType(type: CylinderType): Promise<void> {
    await test.step(`Select cylinder type: ${type}`, async () => {
      await this.cylinderTypeDropdown.selectOption({ label: type });
    });
  }

  /**
   * Select refrigerant types
   */
  async selectRefrigerantTypes(types: string[]): Promise<void> {
    await test.step(`Select refrigerant types: ${types.join(', ')}`, async () => {
      await this.refrigerantTypeMultiselect.click();
      for (const type of types) {
        await this.page.getByRole('option', { name: new RegExp(type, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Set return date range
   */
  async setReturnDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set return date range: ${startDate} - ${endDate}`, async () => {
      await this.returnDateStartInput.fill(startDate);
      await this.returnDateEndInput.fill(endDate);
    });
  }

  /**
   * Search site
   */
  async searchSite(siteName: string): Promise<void> {
    await test.step(`Search site: ${siteName}`, async () => {
      await this.siteCombobox.fill(siteName);
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: new RegExp(siteName, 'i') }).first().click();
    });
  }

  /**
   * Select engineers
   */
  async selectEngineers(engineers: string[]): Promise<void> {
    await test.step(`Select engineers: ${engineers.join(', ')}`, async () => {
      await this.engineersMultiselect.click();
      for (const engineer of engineers) {
        await this.page.getByRole('option', { name: new RegExp(engineer, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Select suppliers
   */
  async selectSuppliers(suppliers: string[]): Promise<void> {
    await test.step(`Select suppliers: ${suppliers.join(', ')}`, async () => {
      await this.supplierMultiselect.click();
      for (const supplier of suppliers) {
        await this.page.getByRole('option', { name: new RegExp(supplier, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Toggle location filter
   */
  async toggleLocation(location: LocationType): Promise<void> {
    await test.step(`Toggle location: ${location}`, async () => {
      switch (location) {
      case 'Storeroom':
        await this.storeroomToggle.click();
        break;
      case 'Engineer':
        await this.engineerToggle.click();
        break;
      case 'Site':
        await this.siteToggle.click();
        break;
      case 'Stock Location':
        await this.stockLocationToggle.click();
        break;
      }
    });
  }

  /**
   * Click reset filter button
   */
  async clickResetFilter(): Promise<void> {
    await test.step('Click reset filter', async () => {
      await this.resetFilterButton.click();
    });
  }

  /**
   * Click search button
   */
  async clickSearch(): Promise<void> {
    await test.step('Click search button', async () => {
      await this.searchButton.click();
    });
  }

  /**
   * Search and wait for results
   */
  async searchAndWait(serialOrQrCode?: string): Promise<void> {
    await test.step(`Search and wait for results${serialOrQrCode ? `: ${serialOrQrCode}` : ''}`, async () => {
      if (serialOrQrCode) {
        await this.searchCylinder(serialOrQrCode);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  // ========================
  // Tab Methods
  // ========================

  /**
   * Switch to tab
   */
  async switchToTab(tab: GasCylinderTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      switch (tab) {
      case 'Active':
        await this.activeTab.click();
        break;
      case 'All':
        await this.allTab.click();
        break;
      case 'Overdue':
        await this.overdueTab.click();
        break;
      case 'Empty And Full':
        await this.emptyAndFullTab.click();
        break;
      case 'Deleted':
        await this.deletedTab.click();
        break;
      case 'Returned':
        await this.returnedTab.click();
        break;
      }
      await this.waitForDataLoad();
    });
  }

  /**
   * Get tab count
   */
  async getTabCount(tab: GasCylinderTab): Promise<number> {
    return await test.step(`Get ${tab} tab count`, async () => {
      let tabLocator: Locator;

      switch (tab) {
      case 'Active':
        tabLocator = this.activeTab;
        break;
      case 'All':
        tabLocator = this.allTab;
        break;
      case 'Overdue':
        tabLocator = this.overdueTab;
        break;
      case 'Empty And Full':
        tabLocator = this.emptyAndFullTab;
        break;
      case 'Deleted':
        tabLocator = this.deletedTab;
        break;
      case 'Returned':
        tabLocator = this.returnedTab;
        break;
      }
      const text = await tabLocator.textContent() || '';
      const match = text.match(/\((\d+)\)/);

      return match ? parseInt(match[1], 10) : 0;
    });
  }

  // ========================
  // Results Methods
  // ========================

  /**
   * Wait for data to load
   */
  async waitForDataLoad(): Promise<void> {
    await test.step('Wait for data to load', async () => {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
    });
  }

  /**
   * Check if no results visible
   */
  async isNoResultsVisible(): Promise<boolean> {
    return await test.step('Check if no results visible', async () => {
      return await this.noResultsMessage.isVisible();
    });
  }

  /**
   * Get row count
   */
  async getRowCount(): Promise<number> {
    return await test.step('Get row count', async () => {
      await this.waitForDataLoad();
      if (await this.isNoResultsVisible()) {
        return 0;
      }
      return await this.tableRows.count();
    });
  }

  /**
   * Click row by index
   */
  async clickRowByIndex(index: number): Promise<void> {
    await test.step(`Click row at index ${index}`, async () => {
      await this.tableRows.nth(index).click();
    });
  }

  /**
   * Click cylinder by serial number
   */
  async clickCylinderBySerialNumber(serialNumber: string): Promise<void> {
    await test.step(`Click cylinder with serial number: ${serialNumber}`, async () => {
      await this.page.locator(`table tbody tr:has-text("${serialNumber}")`).first().click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: GasCylindersSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.searchTerm) {
        await this.searchCylinder(options.searchTerm);
      }
      if (options.cylinderType) {
        await this.selectCylinderType(options.cylinderType);
      }
      if (options.refrigerantType) {
        await this.selectRefrigerantTypes(options.refrigerantType);
      }
      if (options.returnDateStart && options.returnDateEnd) {
        await this.setReturnDateRange(options.returnDateStart, options.returnDateEnd);
      }
      if (options.site) {
        await this.searchSite(options.site);
      }
      if (options.engineers) {
        await this.selectEngineers(options.engineers);
      }
      if (options.suppliers) {
        await this.selectSuppliers(options.suppliers);
      }
      if (options.locations) {
        for (const location of options.locations) {
          await this.toggleLocation(location);
        }
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
