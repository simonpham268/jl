import type { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Settings Landing Page Object
 * URL: /Setting/
 * Main settings hub page with tiles linking to different settings sections
 */
export class SettingsPage {
  readonly page: Page;

  // Header
  readonly pageTitle: Locator;

  // Settings Tiles
  readonly activateTile: Locator;
  readonly companySetupTile: Locator;
  readonly systemSetupTile: Locator;
  readonly staffTile: Locator;
  readonly creditCardPaymentsTile: Locator;
  readonly electronicFormsTile: Locator;
  readonly libraryTile: Locator;
  readonly accountIntegrationTile: Locator;
  readonly schemeProvidersTile: Locator;
  readonly customerPortalAccessTile: Locator;
  readonly syncHistoryTile: Locator;
  readonly auditTile: Locator;
  readonly historyOfImportsTile: Locator;
  readonly documentTemplatesTile: Locator;
  readonly companyDocumentationTile: Locator;
  readonly outboundEmailsTile: Locator;
  readonly subcontractorsTile: Locator;
  readonly emailTile: Locator;
  readonly emailNotificationTile: Locator;
  readonly ftpAccountsTile: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header
    this.pageTitle = page.locator('h3:has-text("Settings")');

    // Settings Tiles - using link with href
    this.activateTile = page.locator('a[href="/Subscription"]');
    this.companySetupTile = page.locator('a[href="/Setting/CompanySetup"]');
    this.systemSetupTile = page.locator('a[href="/Setting/SystemSetup"]');
    this.staffTile = page.locator('a[href="/Staff"]');
    this.creditCardPaymentsTile = page.locator('a[href="/Setting/CreditCardPayments"]');
    this.electronicFormsTile = page.locator('a[href="/CompanyForm"]');
    this.libraryTile = page.locator('a[href="/Library"]');
    this.accountIntegrationTile = page.locator('a[href="/Setting/AccountIntegration"]');
    this.schemeProvidersTile = page.locator('a[href="/Setting/SchemeProviders"]');
    this.customerPortalAccessTile = page.locator('a[href="/Portal"]');
    this.syncHistoryTile = page.locator('a[href="/AccountIntegration/SyncHistory"]');
    this.auditTile = page.locator('a[href="/Audit"]');
    this.historyOfImportsTile = page.locator('a[href="/Import/History"]');
    this.documentTemplatesTile = page.locator('a[href="/Template"]');
    this.companyDocumentationTile = page.locator('a[href="/Setting/Documents"]');
    this.outboundEmailsTile = page.locator('a[href="/OutboundEmailHistory/OutboundEmails"]');
    this.subcontractorsTile = page.locator('a[href="/Subcontractor"]');
    this.emailTile = page.locator('a[href="/EmailTemplate"]');
    this.emailNotificationTile = page.locator('a[href="/Setting/EmailNotification"]');
    this.ftpAccountsTile = page.locator('a[href="/Setting/FTPAccounts"]');
  }

  // Navigation
  async navigateToSettings(): Promise<void> {
    await test.step('Navigate to Settings page', async () => {
      await this.page.goto('/Setting/');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Settings page is loaded', async () => {
      await this.pageTitle.waitFor({ state: 'visible' });
    });
  }

  // Tile Navigation Methods
  async clickActivate(): Promise<void> {
    await test.step('Click Activate tile', async () => {
      await this.activateTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickCompanySetup(): Promise<void> {
    await test.step('Click Company Setup tile', async () => {
      await this.companySetupTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickSystemSetup(): Promise<void> {
    await test.step('Click System Setup tile', async () => {
      await this.systemSetupTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickStaff(): Promise<void> {
    await test.step('Click Staff tile', async () => {
      await this.staffTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickCreditCardPayments(): Promise<void> {
    await test.step('Click Credit Card Payments tile', async () => {
      await this.creditCardPaymentsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickElectronicForms(): Promise<void> {
    await test.step('Click Electronic Forms tile', async () => {
      await this.electronicFormsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickLibrary(): Promise<void> {
    await test.step('Click Library tile', async () => {
      await this.libraryTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickAccountIntegration(): Promise<void> {
    await test.step('Click Account Integration tile', async () => {
      await this.accountIntegrationTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickSchemeProviders(): Promise<void> {
    await test.step('Click Scheme Providers tile', async () => {
      await this.schemeProvidersTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickCustomerPortalAccess(): Promise<void> {
    await test.step('Click Customer Portal Access tile', async () => {
      await this.customerPortalAccessTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickSyncHistory(): Promise<void> {
    await test.step('Click Sync History tile', async () => {
      await this.syncHistoryTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickAudit(): Promise<void> {
    await test.step('Click Audit tile', async () => {
      await this.auditTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickHistoryOfImports(): Promise<void> {
    await test.step('Click History of Imports tile', async () => {
      await this.historyOfImportsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickDocumentTemplates(): Promise<void> {
    await test.step('Click Document Templates tile', async () => {
      await this.documentTemplatesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickCompanyDocumentation(): Promise<void> {
    await test.step('Click Company Documentation tile', async () => {
      await this.companyDocumentationTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickOutboundEmails(): Promise<void> {
    await test.step('Click Outbound Emails tile', async () => {
      await this.outboundEmailsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickSubcontractors(): Promise<void> {
    await test.step('Click Subcontractors tile', async () => {
      await this.subcontractorsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickEmail(): Promise<void> {
    await test.step('Click Email tile', async () => {
      await this.emailTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickEmailNotification(): Promise<void> {
    await test.step('Click Email Notification tile', async () => {
      await this.emailNotificationTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickFTPAccounts(): Promise<void> {
    await test.step('Click FTP Accounts tile', async () => {
      await this.ftpAccountsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // Tile Visibility Checks
  async isTileVisible(tileName: string): Promise<boolean> {
    return await test.step(`Check if ${tileName} tile is visible`, async () => {
      const tileMap: Record<string, Locator> = {
        'Activate': this.activateTile,
        'Company Setup': this.companySetupTile,
        'System Setup': this.systemSetupTile,
        'Staff': this.staffTile,
        'Credit Card Payments': this.creditCardPaymentsTile,
        'Electronic Forms': this.electronicFormsTile,
        'Library': this.libraryTile,
        'Account Integration': this.accountIntegrationTile,
        'Scheme Providers': this.schemeProvidersTile,
        'Customer Portal Access': this.customerPortalAccessTile,
        'Sync History': this.syncHistoryTile,
        'Audit': this.auditTile,
        'History of Imports': this.historyOfImportsTile,
        'Document Templates': this.documentTemplatesTile,
        'Company Documentation': this.companyDocumentationTile,
        'Outbound Emails': this.outboundEmailsTile,
        'Subcontractors': this.subcontractorsTile,
        'Email': this.emailTile,
        'Email Notification': this.emailNotificationTile,
        'FTP Accounts': this.ftpAccountsTile,
      };
      const tile = tileMap[tileName];

      if (!tile) {
        throw new Error(`Unknown tile: ${tileName}`);
      }
      return await tile.isVisible();
    });
  }
}
