import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * External link item interface
 */
export interface ExternalLinkItem {
  title: string;
  url?: string;
  addedBy?: string;
  addedOn?: string;
  linkType?: string;
  source?: string;
  isFavourite?: boolean;
}

/**
 * External link search options
 */
export interface ExternalLinkSearchOptions {
  linkTitle?: string;
  addedBy?: string[];
  addedOnStart?: string;
  addedOnEnd?: string;
  linkType?: string[];
  source?: string[];
}

/**
 * External link tabs
 */
export type ExternalLinkTab = 'All Links' | 'Favourite';

/**
 * ExternalLinksPage - Page Object for External Links and Dashboards page
 * URL: /Report/ExternalLinkAndDashboard
 */
export class ExternalLinksPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addLinkButton: Locator;
  readonly descriptionText: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchLinkInput: Locator;
  readonly addedByDropdown: Locator;
  readonly addedOnStartInput: Locator;
  readonly addedOnEndInput: Locator;
  readonly linkTypeDropdown: Locator;
  readonly sourceDropdown: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly allLinksTab: Locator;
  readonly favouriteTab: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly linksList: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'External Links and Dashboards' });
    this.addLinkButton = page.getByRole('button', { name: /Add Link/ });
    this.descriptionText = page.locator('text=Preview and save links to the reports and dashboards');

    // Filter
    this.searchLinkInput = page.getByPlaceholder('Link Title');
    this.addedByDropdown = page.locator('text=Added By').locator('..');
    this.addedOnStartInput = page.locator('text=Added On').locator('..').getByPlaceholder('Start Date');
    this.addedOnEndInput = page.locator('text=Added On').locator('..').getByPlaceholder('End Date');
    this.linkTypeDropdown = page.locator('text=Link Type').locator('..');
    this.sourceDropdown = page.locator('text=Source').locator('..');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Tabs
    this.allLinksTab = page.locator('text=All Links');
    this.favouriteTab = page.locator('text=Favourite').first();

    // Results
    this.linksList = page.locator('ul').last();
    this.noResultsMessage = page.locator('text=No matching results found');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to External Links and Dashboards page
   */
  async navigateToExternalLinks(): Promise<void> {
    await test.step('Navigate to External Links and Dashboards page', async () => {
      await this.page.goto('/Report/ExternalLinkAndDashboard');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert External Links page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  /**
   * Click Add Link button
   */
  async clickAddLink(): Promise<void> {
    await test.step('Click Add Link button', async () => {
      await this.addLinkButton.click();
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Search by link title
   */
  async searchLinkTitle(title: string): Promise<void> {
    await test.step(`Search link title: ${title}`, async () => {
      await this.searchLinkInput.fill(title);
    });
  }

  /**
   * Select added by filter
   */
  async selectAddedBy(users: string[]): Promise<void> {
    await test.step(`Select added by: ${users.join(', ')}`, async () => {
      await this.addedByDropdown.click();
      for (const user of users) {
        await this.page.getByRole('option', { name: new RegExp(user, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Set added on date range
   */
  async setAddedOnRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set added on range: ${startDate} - ${endDate}`, async () => {
      await this.addedOnStartInput.clear();
      await this.addedOnStartInput.fill(startDate);
      await this.addedOnEndInput.clear();
      await this.addedOnEndInput.fill(endDate);
    });
  }

  /**
   * Select link type filter
   */
  async selectLinkType(types: string[]): Promise<void> {
    await test.step(`Select link types: ${types.join(', ')}`, async () => {
      await this.linkTypeDropdown.click();
      for (const type of types) {
        await this.page.getByRole('option', { name: new RegExp(type, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Select source filter
   */
  async selectSource(sources: string[]): Promise<void> {
    await test.step(`Select sources: ${sources.join(', ')}`, async () => {
      await this.sourceDropdown.click();
      for (const source of sources) {
        await this.page.getByRole('option', { name: new RegExp(source, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Click reset filter
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
  async searchAndWait(title?: string): Promise<void> {
    await test.step(`Search and wait for results${title ? `: ${title}` : ''}`, async () => {
      if (title) {
        await this.searchLinkTitle(title);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  // ========================
  // Tab Methods
  // ========================

  /**
   * Switch to a specific tab
   */
  async switchToTab(tab: ExternalLinkTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabLocator = {
        'All Links': this.allLinksTab,
        'Favourite': this.favouriteTab,
      }[tab];
      await tabLocator.click();
      await this.waitForDataLoad();
    });
  }

  /**
   * Get tab count
   */
  async getTabCount(tab: ExternalLinkTab): Promise<number> {
    return await test.step(`Get ${tab} tab count`, async () => {
      const tabLocator = {
        'All Links': this.allLinksTab,
        'Favourite': this.favouriteTab,
      }[tab];
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
      await this.page.waitForTimeout(1000);
    });
  }

  /**
   * Check if no results found
   */
  async isNoResultsVisible(): Promise<boolean> {
    return await test.step('Check if no results visible', async () => {
      return await this.noResultsMessage.isVisible();
    });
  }

  /**
   * Click on a link by title
   */
  async clickLinkByTitle(title: string): Promise<void> {
    await test.step(`Click link: ${title}`, async () => {
      await this.page.locator(`text=${title}`).first().click();
    });
  }

  /**
   * Toggle favourite for a link
   */
  async toggleFavourite(title: string): Promise<void> {
    await test.step(`Toggle favourite for link: ${title}`, async () => {
      const linkRow = this.page.locator(`text=${title}`).locator('..');
      await linkRow.locator('[title*="favourite"], [class*="star"]').click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: ExternalLinkSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.linkTitle) {
        await this.searchLinkTitle(options.linkTitle);
      }
      if (options.addedBy) {
        await this.selectAddedBy(options.addedBy);
      }
      if (options.addedOnStart && options.addedOnEnd) {
        await this.setAddedOnRange(options.addedOnStart, options.addedOnEnd);
      }
      if (options.linkType) {
        await this.selectLinkType(options.linkType);
      }
      if (options.source) {
        await this.selectSource(options.source);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
