import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { test } from '@playwright/test';

export class Sidebar extends BasePage {
  // Main navigation locators with fallback selectors
  readonly jobsMenuLink: Locator;
  readonly allJobsLink: Locator;
  readonly logJobLink: Locator;
  readonly customersMenuLink: Locator;
  readonly dashboardLink: Locator;
  readonly jobsSubmenu: Locator;
  readonly customersListLink: Locator;

  constructor(page: Page) {
    super(page);
    
    // Robust selectors for JobLogic sidebar navigation
    this.jobsMenuLink = this.page.locator(
      'a[href*="/Job"], .nav-link:has-text("Jobs"), li:has-text("Jobs") > a, [data-toggle="collapse"]:has-text("Jobs")'
    ).first();
    
    this.allJobsLink = this.page.locator(
      'a[href="/Job"], a[href*="/Job"]:has-text("All Jobs"), .submenu a:has-text("All Jobs"), a:has-text("All Jobs")'
    ).first();

    this.logJobLink = this.page.locator(
      'a[href*="/Job/Create"], a:has-text("Log Job"), .submenu a:has-text("Log Job"), [href*="/Job/Create"]'
    ).first();

    this.customersMenuLink = this.page.locator(
      'a[href*="/Customer"], .nav-link:has-text("Customers"), li:has-text("Customers") > a'
    ).first();
    
    this.dashboardLink = this.page.locator(
      'a[href="/"], a[href*="/Dashboard"], .nav-link:has-text("Dashboard"), a:has-text("Dashboard")'
    ).first();
    
    this.jobsSubmenu = this.page.locator(
      '.collapse:has(a[href*="/Job"]), .submenu:has(a:has-text("All Jobs")), ul:has(a[href="/Job"])'
    ).first();
    
    this.customersListLink = this.page.locator(
      'a[href*="/Customer/List"], a[href*="/Customer"]:has-text("List"), .submenu a:has-text("Customers")'
    ).first();

        // Add this locator in the constructor after the existing locators:
    this.logJobLink = this.page.locator(
      'a[href*="/Job/Create"], a:has-text("Log Job"), .submenu a:has-text("Log Job"), [href*="/Job/Create"]'
    ).first();
  }

  /**
   * Click on Jobs menu to expand or navigate
   */
  async clickJobs(): Promise<void> {
    await test.step('Click on Jobs menu to expand or navigate', async () => {
      await this.jobsMenuLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Expand Jobs menu if it's collapsible
   */
  async expandJobs(): Promise<void> {
    await test.step('Expand Jobs menu if it\'s collapsible', async () => {
      // Check if Jobs menu has submenu and expand if needed
      const hasSubmenu = await this.jobsSubmenu.isVisible().catch(() => false);
      
      if (!hasSubmenu) {
        await this.jobsMenuLink.click();
        // Wait for submenu to appear
        await this.jobsSubmenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      }
    });
  }

  /**
   * Click on All Jobs link in sidebar
   */
  async clickAllJobs(): Promise<void> {
    await test.step('Click on All Jobs link in sidebar', async () => {
      // Ensure Jobs menu is expanded first
      await this.expandJobs();
      
      await this.allJobsLink.click();
      await this.page.waitForURL('**/Job**', { timeout: this.navigationTimeout });
    });
  }

  /**
   * Click on Log Job link in sidebar
   */
  async clickLogJob(): Promise<void> {
    await test.step('Click on Log Job link in sidebar', async () => {
      // Ensure Jobs menu is expanded first
      // await this.expandJobs();
      
      await this.logJobLink.click();
      await this.page.waitForURL('**/Job/Create**', { timeout: this.navigationTimeout });
    });
  }

  /**
   * Navigate to Dashboard from sidebar
   */
  async clickDashboard(): Promise<void> {
    await test.step('Navigate to Dashboard from sidebar', async () => {
      await this.dashboardLink.click();
      await this.page.waitForURL('**/', { timeout: this.navigationTimeout });
    });
  }

  /**
   * Navigate to Customers section
   */
  async clickCustomers(): Promise<void> {
    await test.step('Navigate to Customers section', async () => {
      await this.customersMenuLink.click();
      await this.page.waitForURL('**/Customer**', { timeout: this.navigationTimeout });
    });
  }

  /**
   * Expand Customers menu if it has submenu
   */
  async expandCustomers(): Promise<void> {
    await test.step('Expand Customers menu if it has submenu', async () => {
      const customersSubmenu = this.page.locator('.collapse:has(a[href*="/Customer"]), .submenu:has(a[href*="/Customer"])');
      const hasSubmenu = await customersSubmenu.isVisible().catch(() => false);
      
      if (!hasSubmenu) {
        await this.customersMenuLink.click();
        await customersSubmenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      }
    });
  }

  /**
   * Navigate to Customers List
   */
  async clickCustomersList(): Promise<void> {
    await test.step('Navigate to Customers List', async () => {
      await this.expandCustomers();
      
      await this.customersListLink.click();
      await this.page.waitForURL('**/Customer**', { timeout: this.navigationTimeout });
    });
  }

  /**
   * Check if Jobs menu is expanded
   */
  async isJobsMenuExpanded(): Promise<boolean> {
    return await test.step('Check if Jobs menu is expanded', async () => {
      return await this.jobsSubmenu.isVisible().catch(() => false);
    });
  }

  /**
   * Get current active menu item text
   */
  async getActiveMenuItem(): Promise<string | null> {
    return await test.step('Get current active menu item text', async () => {
      const activeItem = this.page.locator('.nav-link.active, .active > a, [aria-current="page"]').first();
      return await this.getText(activeItem);
    });
  }

}
