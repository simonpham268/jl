import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { test } from '@playwright/test';

/**
 * Sidebar - Page Object for sidebar navigation
 * Handles menu expansion and navigation to different sections
 */
export class Sidebar extends BasePage {
  // ========================
  // Locators - Main Menu Items
  // ========================
  readonly dashboardLink: Locator;
  readonly jobsMenuLink: Locator;
  readonly customersMenuLink: Locator;

  // ========================
  // Locators - Jobs Submenu
  // ========================
  readonly jobsSubmenu: Locator;
  readonly allJobsLink: Locator;
  readonly logJobLink: Locator;

  // ========================
  // Locators - Customers Submenu
  // ========================
  readonly customersSubmenu: Locator;
  readonly customersListLink: Locator;

  // ========================
  // Locators - Active State
  // ========================
  readonly activeMenuItem: Locator;

  constructor(page: Page) {
    super(page);

    // Main Menu Items
    this.dashboardLink = this.page.locator(
      'a[href="/"], a[href*="/Dashboard"], .nav-link:has-text("Dashboard"), a:has-text("Dashboard")'
    ).first();

    this.jobsMenuLink = this.page.locator(
      'a[href*="/Job"], .nav-link:has-text("Jobs"), li:has-text("Jobs") > a, [data-toggle="collapse"]:has-text("Jobs")'
    ).first();

    this.customersMenuLink = this.page.locator(
      'a[href*="/Customer"], .nav-link:has-text("Customers"), li:has-text("Customers") > a'
    ).first();

    // Jobs Submenu
    this.jobsSubmenu = this.page.locator(
      '.collapse:has(a[href*="/Job"]), .submenu:has(a:has-text("All Jobs")), ul:has(a[href="/Job"])'
    ).first();

    this.allJobsLink = this.page.locator(
      'a[href="/Job"], a[href*="/Job"]:has-text("All Jobs"), .submenu a:has-text("All Jobs"), a:has-text("All Jobs")'
    ).first();

    this.logJobLink = this.page.locator(
      'a[href*="/Job/Create"], a:has-text("Log Job"), .submenu a:has-text("Log Job")'
    ).first();

    // Customers Submenu
    this.customersSubmenu = this.page.locator(
      '.collapse:has(a[href*="/Customer"]), .submenu:has(a[href*="/Customer"])'
    ).first();

    this.customersListLink = this.page.locator(
      'a[href*="/Customer/List"], a[href*="/Customer"]:has-text("List"), .submenu a:has-text("Customers")'
    ).first();

    // Active State
    this.activeMenuItem = this.page.locator('.nav-link.active, .active > a, [aria-current="page"]').first();
  }

  // ========================
  // Dashboard Navigation
  // ========================

  async clickDashboard(): Promise<void> {
    await test.step('Navigate to Dashboard', async () => {
      await this.dashboardLink.click();
      await this.page.waitForURL('**/', { timeout: this.navigationTimeout });
    });
  }

  // ========================
  // Jobs Navigation
  // ========================

  async expandJobs(): Promise<void> {
    await test.step('Expand Jobs menu', async () => {
      const isExpanded = await this.jobsSubmenu.isVisible().catch(() => false);

      if (!isExpanded) {
        await this.jobsMenuLink.click();
        await this.jobsSubmenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      }
    });
  }

  async clickJobs(): Promise<void> {
    await test.step('Click on Jobs menu', async () => {
      await this.jobsMenuLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickAllJobs(): Promise<void> {
    await test.step('Navigate to All Jobs', async () => {
      await this.expandJobs();
      await this.allJobsLink.click();
      await this.page.waitForURL('**/Job**', { timeout: this.navigationTimeout });
    });
  }

  async clickLogJob(): Promise<void> {
    await test.step('Navigate to Log Job', async () => {
      await this.logJobLink.click();
      await this.page.waitForURL('**/Job/Create**', { timeout: this.navigationTimeout });
    });
  }

  async isJobsMenuExpanded(): Promise<boolean> {
    return await test.step('Check if Jobs menu is expanded', async () => {
      return await this.jobsSubmenu.isVisible().catch(() => false);
    });
  }

  // ========================
  // Customers Navigation
  // ========================

  async expandCustomers(): Promise<void> {
    await test.step('Expand Customers menu', async () => {
      const isExpanded = await this.customersSubmenu.isVisible().catch(() => false);

      if (!isExpanded) {
        await this.customersMenuLink.click();
        await this.customersSubmenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      }
    });
  }

  async clickCustomers(): Promise<void> {
    await test.step('Navigate to Customers', async () => {
      await this.customersMenuLink.click();
      await this.page.waitForURL('**/Customer**', { timeout: this.navigationTimeout });
    });
  }

  async clickCustomersList(): Promise<void> {
    await test.step('Navigate to Customers List', async () => {
      await this.expandCustomers();
      await this.customersListLink.click();
      await this.page.waitForURL('**/Customer**', { timeout: this.navigationTimeout });
    });
  }

  // ========================
  // Private Helper Methods (dynamic locators)
  // ========================

  /**
   * Get menu locator by name
   */
  private getMenuLocator(menu: string): Locator {
    return this.page.locator(
      `a:has-text("${menu}"), li:has-text("${menu}") > a, [data-toggle="collapse"]:has-text("${menu}"), .nav-link:has-text("${menu}")`
    ).first();
  }

  /**
   * Get submenu container locator by item name
   */
  private getSubmenuLocator(item: string): Locator {
    return this.page.locator(
      `.collapse:has(a:has-text("${item}")), .submenu:has(a:has-text("${item}")), ul:has(a:has-text("${item}"))`
    ).first();
  }

  /**
   * Get submenu item locator by name
   */
  private getSubItemLocator(item: string): Locator {
    return this.page.locator(
      `a:has-text("${item}"), .submenu a:has-text("${item}")`
    ).first();
  }

  // ========================
  // Generic Navigation
  // ========================

  /**
   * Navigate to any menu > subItem in the sidebar
   * @param menu - Main menu name (e.g., 'Jobs', 'Customers', 'Dashboard')
   * @param subItem - Submenu item name (e.g., 'Log Job', 'All Jobs')
   *
   * @example
   * await sidebar.navigateTo('Jobs', 'Log Job');
   * await sidebar.navigateTo('Customers', 'List');
   */
  async navigateTo(menu: string, subItem?: string): Promise<void> {
    await test.step(`Navigate to ${menu}${subItem ? ' > ' + subItem : ''}`, async () => {
      // Find and click the main menu
      const menuLocator = this.getMenuLocator(menu);

      await menuLocator.click();
      await this.page.waitForLoadState('domcontentloaded');

      // If subItem is provided, wait for submenu and click
      if (subItem) {
        // Wait for submenu to expand
        const submenuLocator = this.getSubmenuLocator(subItem);

        await submenuLocator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

        // Click on submenu item
        const subItemLocator = this.getSubItemLocator(subItem);

        await subItemLocator.click();
        await this.page.waitForLoadState('domcontentloaded');
      }
    });
  }

  // ========================
  // Utility Methods
  // ========================

  async getActiveMenuItem(): Promise<string | null> {
    return await test.step('Get active menu item text', async () => {
      return await this.getText(this.activeMenuItem);
    });
  }
}
