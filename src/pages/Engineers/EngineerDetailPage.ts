import { type Locator, type Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Engineer Detail Tab options
 */
export type EngineerDetailTab =
  | 'User Detail'
  | 'Notes'
  | 'Engineer Detail'
  | 'Profile Image'
  | 'Documents';

/**
 * User type options
 */
export type UserType = 'Office' | 'Mobile' | 'Non Login User';

/**
 * Engineer user data
 */
export interface EngineerUserData {
  name?: string;
  email?: string;
  mobile?: string;
  telephone?: string;
  otherInformation?: string;
  address?: string;
  postcode?: string;
  tags?: string[];
  reference?: string;
  userType?: UserType;
  role?: string;
}

/**
 * EngineerDetailPage - Page Object for Engineer/Staff Detail page
 * URL Pattern: /Staff/Detail/{staffId}?engineerOnly=true
 */
export class EngineerDetailPage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;
  readonly breadcrumbSettings: Locator;
  readonly breadcrumbEngineers: Locator;
  readonly engineerName: Locator;
  readonly statusBadge: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly userDetailTab: Locator;
  readonly notesTab: Locator;
  readonly engineerDetailTab: Locator;
  readonly profileImageTab: Locator;
  readonly documentsTab: Locator;

  // ========================
  // Locators - Header Actions
  // ========================
  readonly resendInvitationButton: Locator;
  readonly editButton: Locator;
  readonly saveButton: Locator;
  readonly undoButton: Locator;

  // ========================
  // Locators - User Details Section
  // ========================
  readonly userDetailsHeading: Locator;
  readonly officeUserTypeOption: Locator;
  readonly mobileUserTypeOption: Locator;
  readonly nonLoginUserOption: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly mobileInput: Locator;
  readonly telephoneInput: Locator;
  readonly otherInformationInput: Locator;
  readonly findAddressInput: Locator;
  readonly addressInput: Locator;
  readonly areaInput: Locator;
  readonly cityInput: Locator;
  readonly countryInput: Locator;
  readonly postcodeInput: Locator;
  readonly tagsDropdown: Locator;
  readonly referenceInput: Locator;

  // ========================
  // Locators - User Role & Permissions
  // ========================
  readonly roleDropdown: Locator;
  readonly permissionsSection: Locator;
  readonly searchPermissionInput: Locator;

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
    this.pageTitle = page.getByRole('heading', { level: 3 }).filter({ hasText: /Settings.*Engineers/ });
    this.breadcrumbSettings = page.getByRole('link', { name: 'Settings', exact: true });
    this.breadcrumbEngineers = page.getByRole('link', { name: 'Engineers', exact: true });
    this.engineerName = page.locator('h3').locator('span, div').last();
    this.statusBadge = page.locator('h3').locator('[class*="badge"], [class*="status"]');

    // Tabs
    this.userDetailTab = page.getByRole('link', { name: 'User Detail' });
    this.notesTab = page.getByRole('link', { name: 'Notes', exact: true });
    this.engineerDetailTab = page.getByRole('link', { name: 'Engineer Detail' });
    this.profileImageTab = page.getByRole('link', { name: 'Profile Image' });
    this.documentsTab = page.getByRole('link', { name: 'Documents', exact: true });

    // Header Actions
    this.resendInvitationButton = page.getByRole('button', { name: 'Resend Invitation' });
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.saveButton = page.locator('text=Save').locator('..');
    this.undoButton = page.locator('text=Undo').locator('..');

    // User Details Section
    this.userDetailsHeading = page.getByRole('heading', { name: 'User Details', level: 4 });
    this.officeUserTypeOption = page.locator('text=Office').locator('..');
    this.mobileUserTypeOption = page.locator('text=Mobile').locator('..').first();
    this.nonLoginUserOption = page.locator('text=Non Login User').locator('..');
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.mobileInput = page.locator('text=Mobile').locator('..').getByRole('textbox');
    this.telephoneInput = page.locator('text=Telephone').locator('..').getByRole('textbox');
    this.otherInformationInput = page.getByRole('textbox', { name: 'Other Information' });
    this.findAddressInput = page.getByRole('searchbox', { name: 'Enter a location' });
    this.addressInput = page.getByRole('textbox', { name: 'Company name, building, Street address' });
    this.areaInput = page.getByRole('textbox', { name: 'Area' });
    this.cityInput = page.getByRole('textbox', { name: 'City' });
    this.countryInput = page.getByRole('textbox', { name: 'Country, State/Province/Region' });
    this.postcodeInput = page.getByRole('textbox', { name: 'Postcode' });
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('[class*="multiselect"], listbox');
    this.referenceInput = page.getByRole('textbox', { name: 'Enter reference ID' });

    // User Role & Permissions
    this.roleDropdown = page.getByRole('combobox', { name: /Role/i });
    this.permissionsSection = page.locator('text=Business').locator('..').locator('..');
    this.searchPermissionInput = page.getByRole('textbox', { name: 'Search permission' });

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

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to an engineer detail page by ID
   * @param staffId - Staff ID
   */
  async navigateTo(staffId: string | number): Promise<void> {
    await test.step(`Navigate to engineer: ${staffId}`, async () => {
      await this.page.goto(`/Staff/Detail/${staffId}?engineerOnly=true`);
      await this.waitForPageLoad();
    });
  }

  /**
   * Wait for page to finish loading
   */
  async waitForPageLoad(): Promise<void> {
    await test.step('Wait for engineer detail page to load', async () => {
      await this.page.waitForLoadState('domcontentloaded');
      await expect(this.userDetailsHeading).toBeVisible({ timeout: 15000 });
    });
  }

  /**
   * Go back to Engineers list
   */
  async goBackToEngineers(): Promise<void> {
    await test.step('Go back to Engineers list', async () => {
      await this.breadcrumbEngineers.click();
      await this.page.waitForURL(/\/Staff\/Engineers/);
    });
  }

  // ========================
  // Tab Navigation
  // ========================

  /**
   * Switch to a specific tab
   * @param tab - Tab to switch to
   */
  async switchToTab(tab: EngineerDetailTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabMap: Record<EngineerDetailTab, Locator> = {
        'User Detail': this.userDetailTab,
        'Notes': this.notesTab,
        'Engineer Detail': this.engineerDetailTab,
        'Profile Image': this.profileImageTab,
        'Documents': this.documentsTab,
      };

      await tabMap[tab].click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Check if a tab is currently active
   * @param tab - Tab to check
   */
  async isTabActive(tab: EngineerDetailTab): Promise<boolean> {
    const tabMap: Record<EngineerDetailTab, Locator> = {
      'User Detail': this.userDetailTab,
      'Notes': this.notesTab,
      'Engineer Detail': this.engineerDetailTab,
      'Profile Image': this.profileImageTab,
      'Documents': this.documentsTab,
    };

    const isExpanded = await tabMap[tab].getAttribute('aria-expanded');
    const isActive = await tabMap[tab].getAttribute('class');
    return isExpanded === 'true' || (isActive?.includes('active') ?? false);
  }

  // ========================
  // Header Actions
  // ========================

  /**
   * Click Resend Invitation button
   */
  async clickResendInvitation(): Promise<void> {
    await test.step('Click Resend Invitation button', async () => {
      await this.resendInvitationButton.click();
    });
  }

  /**
   * Enable edit mode
   */
  async enableEditMode(): Promise<void> {
    await test.step('Enable edit mode', async () => {
      await this.editButton.click();
      await expect(this.nameInput).toBeEnabled({ timeout: 5000 });
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

  // ========================
  // User Details - Fill Methods
  // ========================

  /**
   * Select user type
   */
  async selectUserType(type: UserType): Promise<void> {
    await test.step(`Select user type: ${type}`, async () => {
      switch (type) {
      case 'Office':
        await this.officeUserTypeOption.click();
        break;
      case 'Mobile':
        await this.mobileUserTypeOption.click();
        break;
      case 'Non Login User':
        await this.nonLoginUserOption.click();
        break;
      }
    });
  }

  /**
   * Fill name field
   */
  async fillName(value: string): Promise<void> {
    await test.step(`Fill name: ${value}`, async () => {
      await this.nameInput.fill(value);
    });
  }

  /**
   * Fill email field
   */
  async fillEmail(value: string): Promise<void> {
    await test.step(`Fill email: ${value}`, async () => {
      await this.emailInput.fill(value);
    });
  }

  /**
   * Fill mobile field
   */
  async fillMobile(value: string): Promise<void> {
    await test.step(`Fill mobile: ${value}`, async () => {
      await this.mobileInput.fill(value);
    });
  }

  /**
   * Fill telephone field
   */
  async fillTelephone(value: string): Promise<void> {
    await test.step(`Fill telephone: ${value}`, async () => {
      await this.telephoneInput.fill(value);
    });
  }

  /**
   * Fill other information field
   */
  async fillOtherInformation(value: string): Promise<void> {
    await test.step(`Fill other information: ${value}`, async () => {
      await this.otherInformationInput.fill(value);
    });
  }

  /**
   * Fill address fields
   */
  async fillAddress(address: string, area?: string, city?: string, country?: string): Promise<void> {
    await test.step('Fill address fields', async () => {
      await this.addressInput.fill(address);
      if (area) await this.areaInput.fill(area);
      if (city) await this.cityInput.fill(city);
      if (country) await this.countryInput.fill(country);
    });
  }

  /**
   * Fill postcode field
   */
  async fillPostcode(value: string): Promise<void> {
    await test.step(`Fill postcode: ${value}`, async () => {
      await this.postcodeInput.fill(value);
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
   * Select role
   */
  async selectRole(role: string): Promise<void> {
    await test.step(`Select role: ${role}`, async () => {
      await this.roleDropdown.click();
      await this.getDropdownOption(role).click();
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
