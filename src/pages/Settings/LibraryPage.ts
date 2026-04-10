import type { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Library Page Object
 * URL: /Library
 * Hub page for parts, equipment, selling rates, and more library items
 */
export class LibraryPage {
  readonly page: Page;

  // Breadcrumb
  readonly settingsLink: Locator;

  // Header
  readonly pageTitle: Locator;

  // Library Tiles
  readonly creditReasonsTile: Locator;
  readonly partsTile: Locator;
  readonly equipmentTile: Locator;
  readonly gasTypesTile: Locator;
  readonly sellingRatesTile: Locator;
  readonly scheduleOfRatesTile: Locator;
  readonly tasksTile: Locator;
  readonly phrasebookTile: Locator;
  readonly faultCodeLibraryTile: Locator;
  readonly serviceTypesTile: Locator;
  readonly serviceKitsTile: Locator;
  readonly taxRatesTile: Locator;
  readonly nominalCodesTile: Locator;
  readonly refcomTransactionReasonsTile: Locator;
  readonly serviceJobsTile: Locator;
  readonly suppliersTile: Locator;
  readonly prioritiesTile: Locator;
  readonly tagsTile: Locator;
  readonly nonProductiveTimeTypesTile: Locator;
  readonly sourcesTile: Locator;
  readonly quoteRejectReasonsTile: Locator;
  readonly incompleteTaskReasonsTile: Locator;
  readonly engineerTradesTile: Locator;
  readonly payBandsTile: Locator;
  readonly companyDocumentTypesTile: Locator;
  readonly vehiclesTile: Locator;
  readonly locationsTile: Locator;
  readonly purchaseOrderTemplatesTile: Locator;
  readonly quoteTemplatesTile: Locator;
  readonly reportTemplatesTile: Locator;
  readonly miscTile: Locator;
  readonly jobTemplatesTile: Locator;
  readonly userReferencesTile: Locator;

  constructor(page: Page) {
    this.page = page;

    // Breadcrumb
    this.settingsLink = page.locator('a[href="https://uat.joblogic.com/Setting"]');

    // Header
    this.pageTitle = page.locator('h3:has-text("Library")');

    // Library Tiles
    this.creditReasonsTile = page.locator('a[href="/CreditReason"]');
    this.partsTile = page.locator('a[href="/Part"]');
    this.equipmentTile = page.locator('a[href="/Equipment"]');
    this.gasTypesTile = page.locator('a[href="/GasType"]');
    this.sellingRatesTile = page.locator('a[href="/SellingRate"]');
    this.scheduleOfRatesTile = page.locator('a[href="/ScheduleOfRate"]');
    this.tasksTile = page.locator('a[href="/Task"]');
    this.phrasebookTile = page.locator('a[href="/Phrasebook"]');
    this.faultCodeLibraryTile = page.locator('a[href="/FaultCodeLibrary"]');
    this.serviceTypesTile = page.locator('a[href="/ServiceType"]');
    this.serviceKitsTile = page.locator('a[href="/ServiceKit"]');
    this.taxRatesTile = page.locator('a[href="/TaxCode"]');
    this.nominalCodesTile = page.locator('a[href="/NominalCode"]');
    this.refcomTransactionReasonsTile = page.locator('a[href="/AdditionRemovalReason"]');
    this.serviceJobsTile = page.locator('a[href="/ServiceJob"]');
    this.suppliersTile = page.locator('a[href="/Supplier"]');
    this.prioritiesTile = page.locator('a[href="/Priority"]');
    this.tagsTile = page.locator('a[href="/Tag"]');
    this.nonProductiveTimeTypesTile = page.locator('a[href="/NonProductiveTimeType"]');
    this.sourcesTile = page.locator('a[href="/Source"]');
    this.quoteRejectReasonsTile = page.locator('a[href="/QuoteRejectReason"]');
    this.incompleteTaskReasonsTile = page.locator('a[href="/InCompleteTaskReason"]');
    this.engineerTradesTile = page.locator('a[href="/Trade"]');
    this.payBandsTile = page.locator('a[href="/PayBand"]');
    this.companyDocumentTypesTile = page.locator('a[href="/DocumentType"]');
    this.vehiclesTile = page.locator('a[href="/Vehicle"]');
    this.locationsTile = page.locator('a[href="/Location"]');
    this.purchaseOrderTemplatesTile = page.locator('a[href="/PurchaseOrderTemplate"]');
    this.quoteTemplatesTile = page.locator('a[href="/QuoteTemplate"]');
    this.reportTemplatesTile = page.locator('a[href="/ReportTemplate"]');
    this.miscTile = page.locator('a[href="/Library/Misc"]');
    this.jobTemplatesTile = page.locator('a[href="/JobTemplate"]');
    this.userReferencesTile = page.locator('a[href="/UserReferences"]');
  }

  // Navigation
  async navigateToLibrary(): Promise<void> {
    await test.step('Navigate to Library page', async () => {
      await this.page.goto('/Library');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Library page is loaded', async () => {
      await this.pageTitle.waitFor({ state: 'visible' });
    });
  }

  async goBackToSettings(): Promise<void> {
    await test.step('Go back to Settings page', async () => {
      await this.settingsLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // Tile Navigation Methods
  async clickCreditReasons(): Promise<void> {
    await test.step('Click Credit Reasons tile', async () => {
      await this.creditReasonsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickParts(): Promise<void> {
    await test.step('Click Parts tile', async () => {
      await this.partsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickEquipment(): Promise<void> {
    await test.step('Click Equipment tile', async () => {
      await this.equipmentTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickGasTypes(): Promise<void> {
    await test.step('Click Gas Types tile', async () => {
      await this.gasTypesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickSellingRates(): Promise<void> {
    await test.step('Click Selling Rates tile', async () => {
      await this.sellingRatesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickScheduleOfRates(): Promise<void> {
    await test.step('Click Schedule of Rates tile', async () => {
      await this.scheduleOfRatesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickTasks(): Promise<void> {
    await test.step('Click Tasks tile', async () => {
      await this.tasksTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickPhrasebook(): Promise<void> {
    await test.step('Click Phrasebook tile', async () => {
      await this.phrasebookTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickFaultCodeLibrary(): Promise<void> {
    await test.step('Click Fault Code Library tile', async () => {
      await this.faultCodeLibraryTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickServiceTypes(): Promise<void> {
    await test.step('Click Service Types tile', async () => {
      await this.serviceTypesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickServiceKits(): Promise<void> {
    await test.step('Click Service Kits tile', async () => {
      await this.serviceKitsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickTaxRates(): Promise<void> {
    await test.step('Click Tax Rates tile', async () => {
      await this.taxRatesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickNominalCodes(): Promise<void> {
    await test.step('Click Nominal Codes tile', async () => {
      await this.nominalCodesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickRefcomTransactionReasons(): Promise<void> {
    await test.step('Click Refcom Transaction Reasons tile', async () => {
      await this.refcomTransactionReasonsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickServiceJobs(): Promise<void> {
    await test.step('Click Service Jobs tile', async () => {
      await this.serviceJobsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickSuppliers(): Promise<void> {
    await test.step('Click Suppliers tile', async () => {
      await this.suppliersTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickPriorities(): Promise<void> {
    await test.step('Click Priorities tile', async () => {
      await this.prioritiesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickTags(): Promise<void> {
    await test.step('Click Tags tile', async () => {
      await this.tagsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickNonProductiveTimeTypes(): Promise<void> {
    await test.step('Click Non-Productive Time Types tile', async () => {
      await this.nonProductiveTimeTypesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickSources(): Promise<void> {
    await test.step('Click Sources tile', async () => {
      await this.sourcesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickQuoteRejectReasons(): Promise<void> {
    await test.step('Click Quote Reject Reasons tile', async () => {
      await this.quoteRejectReasonsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickIncompleteTaskReasons(): Promise<void> {
    await test.step('Click Incomplete Task Reasons tile', async () => {
      await this.incompleteTaskReasonsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickEngineerTrades(): Promise<void> {
    await test.step('Click Engineer Trades tile', async () => {
      await this.engineerTradesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickPayBands(): Promise<void> {
    await test.step('Click Pay Bands tile', async () => {
      await this.payBandsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickCompanyDocumentTypes(): Promise<void> {
    await test.step('Click Company Document Types tile', async () => {
      await this.companyDocumentTypesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickVehicles(): Promise<void> {
    await test.step('Click Vehicles tile', async () => {
      await this.vehiclesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickLocations(): Promise<void> {
    await test.step('Click Locations tile', async () => {
      await this.locationsTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickPurchaseOrderTemplates(): Promise<void> {
    await test.step('Click Purchase Order Templates tile', async () => {
      await this.purchaseOrderTemplatesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickQuoteTemplates(): Promise<void> {
    await test.step('Click Quote Templates tile', async () => {
      await this.quoteTemplatesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickReportTemplates(): Promise<void> {
    await test.step('Click Report Templates tile', async () => {
      await this.reportTemplatesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickMisc(): Promise<void> {
    await test.step('Click Misc. tile', async () => {
      await this.miscTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickJobTemplates(): Promise<void> {
    await test.step('Click Job Templates tile', async () => {
      await this.jobTemplatesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickUserReferences(): Promise<void> {
    await test.step('Click User References tile', async () => {
      await this.userReferencesTile.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // Tile Visibility Check
  async isTileVisible(tileName: string): Promise<boolean> {
    return await test.step(`Check if ${tileName} tile is visible`, async () => {
      const tileMap: Record<string, Locator> = {
        'Credit Reasons': this.creditReasonsTile,
        'Parts': this.partsTile,
        'Equipment': this.equipmentTile,
        'Gas Types': this.gasTypesTile,
        'Selling Rates': this.sellingRatesTile,
        'Schedule of Rates': this.scheduleOfRatesTile,
        'Tasks': this.tasksTile,
        'Phrasebook': this.phrasebookTile,
        'Fault Code Library': this.faultCodeLibraryTile,
        'Service Types': this.serviceTypesTile,
        'Service Kits': this.serviceKitsTile,
        'Tax Rates': this.taxRatesTile,
        'Nominal Codes': this.nominalCodesTile,
        'Refcom Transaction Reasons': this.refcomTransactionReasonsTile,
        'Service Jobs': this.serviceJobsTile,
        'Suppliers': this.suppliersTile,
        'Priorities': this.prioritiesTile,
        'Tags': this.tagsTile,
        'Non-Productive Time Types': this.nonProductiveTimeTypesTile,
        'Sources': this.sourcesTile,
        'Quote Reject Reasons': this.quoteRejectReasonsTile,
        'Incomplete Task Reasons': this.incompleteTaskReasonsTile,
        'Engineer Trades': this.engineerTradesTile,
        'Pay Bands': this.payBandsTile,
        'Company Document Types': this.companyDocumentTypesTile,
        'Vehicles': this.vehiclesTile,
        'Locations': this.locationsTile,
        'Purchase Order Templates': this.purchaseOrderTemplatesTile,
        'Quote Templates': this.quoteTemplatesTile,
        'Report Templates': this.reportTemplatesTile,
        'Misc': this.miscTile,
        'Job Templates': this.jobTemplatesTile,
        'User References': this.userReferencesTile,
      };
      const tile = tileMap[tileName];

      if (!tile) {
        throw new Error(`Unknown tile: ${tileName}`);
      }
      return await tile.isVisible();
    });
  }
}
