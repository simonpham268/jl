import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { test } from '@playwright/test';

export class JobCreationPage extends BasePage {
    // Form control locators with robust fallback selectors - declared as readonly properties
    readonly customerCombobox: Locator;
    readonly siteCombobox: Locator;
    readonly descriptionTextbox: Locator;
    readonly saveButton: Locator;
    readonly pageTitle: Locator;
    readonly loadingIndicator: Locator;

    // Job details page verification locators
    readonly jobTitleHeader: Locator;
    readonly jobStatusBadge: Locator;

    // Contact management locators
    readonly contactDropdown: Locator;
    readonly contactOptions: Locator;
    readonly selectedContactIndicator: Locator;
    readonly contactFirstItem: Locator;
    readonly contactSelectedCounter: Locator;
    readonly customerHyperlink: Locator;
    readonly contactCheckboxByName: Locator;
    readonly contactTable: Locator;

    // Selector strategies as class properties (rule 10)
    readonly customerSelectors: string[];
    readonly siteSelectors: string[];
    readonly contactSelectors: string[];
    readonly contactNameSelectors: string[];

    constructor(page: Page) {
        super(page);

        // Customer combobox with robust fallback selectors
        this.customerCombobox = this.page.locator(
            '#jlCustomerJob_Id__combobox, select[name*="customer"], .customer-dropdown, [data-testid="customer-select"]'
        ).first();

        // Site combobox with robust fallback selectors
        this.siteCombobox = this.page.locator(
            '#jlSiteJob_Id__combobox, select[name*="site"], .site-dropdown, [data-testid="site-select"]'
        ).first();

        // Description textbox - target textarea only to avoid matching hidden inputs
        this.descriptionTextbox = this.page.locator(
            '#logjob_Description, textarea[name*="description"], textarea'
        ).first();

        // Save button with multiple fallback selectors
        this.saveButton = this.page.locator(
            'button:has-text("Save"), button[type="submit"]:has-text("Save"), .btn-save, [data-testid="save-button"]'
        ).first();

        // Page title for verification
        this.pageTitle = this.page.locator(
            'h3:has-text("Log Job"), h1:has-text("Log Job"), .page-title, [data-testid="page-title"]'
        ).first();

        // Loading indicators
        this.loadingIndicator = this.page.locator(
            '.loading, .spinner, [class*="load"], .ajax-loader, [data-testid="loading"]'
        );

        // Job details page verification locators
        this.jobTitleHeader = this.page.getByRole('heading', { name: /Jobs \/M\d+/ });
        this.jobStatusBadge = this.page.locator('#jlselectedStatus__combobox');

        // Contact management elements with robust fallback selectors
        this.contactDropdown = this.page.locator(
            'select[name*="contact"], .contact-dropdown, #contact-select, .combobox:has-text("Contact")'
        ).first();

        this.contactOptions = this.page.locator(
            '[role="option"], .dropdown-option, option'
        );

        this.selectedContactIndicator = this.page.locator(
            '.green-tick, .selected-indicator, .contact-selected, [class*="tick"][class*="green"], input[type="checkbox"]:checked'
        ).first();

        // Customer detail hyperlink - use /Customer/Detail/ to avoid matching nav/create links
        this.customerHyperlink = this.page.locator(
            'a[href*="/Customer/Detail/"]'
        ).first();

        // First contact row checkbox label in the Contacts table (clicking label triggers checkbox)
        this.contactFirstItem = this.page.locator(
            'table.jl-table tbody tr:first-child td:first-child label'
        ).first();

        // Contact selected counter element - uses CSS class lj-contact-counter
        this.contactSelectedCounter = this.page.locator('span.lj-contact-counter').first();

        // Contact table and contact selection by name locators (rule 9: declare in constructor)
        this.contactTable = this.page.locator('table.jl-table');
        this.contactCheckboxByName = this.page.locator('table.jl-table tbody tr');

        // Selector strategies as class properties (rule 10)
        this.customerSelectors = [
            '[role="option"]:visible:first',
            '.dropdown-option:visible:first',
            'li:visible:first:has-text("Sauer")',
            'option:visible:first'
        ];

        this.siteSelectors = [
            '[role="option"]:visible:first',
            '.dropdown-option:visible:first',
            'li:visible:first:has-text("Sauer")',
            'option:visible:first'
        ];

        this.contactSelectors = [
            '[role="option"]:visible:first',
            '.dropdown-option:visible:first',
            'option:visible:first',
            'li:visible:first'
        ];

        // Contact name selectors for finding contacts by name (rule 10)
        this.contactNameSelectors = [
            'table.jl-table tbody tr:has-text("CONTACTNAME") td:first-child label',
            'table tbody tr:has-text("CONTACTNAME") input[type="checkbox"]',
            'table tbody tr td:has-text("CONTACTNAME") ~ td:first-child label',
            'table tbody tr:nth-child(n) td:has-text("CONTACTNAME") ~ td label'
        ];
    }

    /**
     * Verify job creation page has loaded
     */
    async verifyPageLoaded(): Promise<void> {
        await test.step('Verify Job Creation page has loaded', async () => {
            await this.pageTitle.waitFor({ state: 'visible', timeout: this.elementTimeout });
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    /**
     * Select first customer from dropdown - Step 4 part 1
     */
    async selectFirstCustomer(): Promise<void> {
        await test.step('Select first customer from dropdown', async () => {
            // Click the customer combobox to open dropdown
            await this.customerCombobox.click();

            // Try multiple strategies to select first customer using class property
            for (const selector of this.customerSelectors) {
                try {
                    const option = this.page.locator(selector).first();
                    if (await option.isVisible({ timeout: 2000 })) {
                        await option.click();
                        return;
                    }
                } catch (error) {
                }
            }

            // Fallback to basic option selection
            const firstOption = this.page.getByRole('option').first();
            await firstOption.waitFor({ state: 'visible', timeout: 5000 });
            await firstOption.click();
        });
    }

    /**
     * Select first site from dropdown - Step 4 part 2
     */
    async selectFirstSite(): Promise<void> {
        await test.step('Select first site from dropdown', async () => {
            // Click the site combobox to open dropdown
            await this.siteCombobox.click();

            // Try multiple strategies to select first site using class property
            for (const selector of this.siteSelectors) {
                try {
                    const option = this.page.locator(selector).first();
                    if (await option.isVisible({ timeout: 2000 })) {
                        await option.click();
                        return;
                    }
                } catch (error) {
                    // Continue to next selector if this one fails
                }
            }

            // Fallback to basic option selection
            const firstOption = this.page.getByRole('option').first();
            await firstOption.waitFor({ state: 'visible', timeout: 5000 });
            await firstOption.click();
        });
    }

    /**
     * Input description text - Step 4 part 3 (rule 11: reusing existing method name)
     */
    async inputDescription(description: string): Promise<void> {
        await test.step(`Input description: ${description}`, async () => {
            await this.descriptionTextbox.waitFor({ state: 'visible', timeout: 10000 });
            await this.descriptionTextbox.clear();
            await this.descriptionTextbox.fill(description);
        });
    }

    /**
     * Select first contact from dropdown - Step 5
     */
    async selectFirstContact(): Promise<void> {
        await test.step('Select first contact from dropdown', async () => {
            await this.contactDropdown.click();

            // Try multiple strategies to select first available contact using class property
            for (const selector of this.contactSelectors) {
                try {
                    const option = this.page.locator(selector).first();
                    if (await option.isVisible({ timeout: 2000 })) {
                        await option.click();
                        return;
                    }
                } catch (error) {
                    // Continue to next selector if this one fails
                }
            }

            // Fallback to basic option selection
            const firstOption = this.contactOptions.first();
            await firstOption.click();
        });
    }

    /**
     * Select first contact by clicking its name in the Contacts table - Step 5
     */
    async selectFirstContactCheckbox(): Promise<void> {
        await test.step('Select first contact by clicking name in contact table', async () => {
            try {
                await this.contactFirstItem.waitFor({ state: 'visible', timeout: this.elementTimeout });
                await this.contactFirstItem.click();
            } catch {
                // No contacts available in the table - gracefully do nothing
            }
        });
    }

    /**
     * Verify contact is selected by checking counter text - Step 5 Expected (rule 8: return data for verification)
     */
    async isContactSelectedWithCheckbox(): Promise<boolean> {
        return await test.step('Verify contact is selected with checkbox ticked', async () => {
            try {
                // Wait for Vue.js reactive counter to show at least 1 selected contact
                await this.page.waitForFunction(
                    () => {
                        const counter = document.querySelector('span.lj-contact-counter');
                        const match = counter?.textContent?.match(/^(\d+) of/);
                        return match ? parseInt(match[1]) > 0 : false;
                    },
                    { timeout: this.elementTimeout }
                );
                return true;
            } catch {
                return false;
            }
        });
    }

    /**
     * Click Save button (implied step 6)
     */
    async clickSave(): Promise<void> {
        await test.step('Click Save button', async () => {
            await this.saveButton.waitFor({ state: 'visible', timeout: this.elementTimeout });
            await this.saveButton.click();
        });
    }

    /**
     * Wait for navigation to Job Details page (implied step 7)
     */
    async waitForJobDetailsNavigation(): Promise<void> {
        await test.step('Wait for navigation to Job Details page', async () => {
            await this.page.waitForURL('**/Job/Detail/**', { timeout: this.navigationTimeout });
            await this.page.waitForLoadState('domcontentloaded');

            // Private wait method call (rule 4)
            await this.waitForLoadingToDisappear();
        });
    }

    /**
     * Get job title text for verification (rule 8: return data for verification)
     */
    async getJobTitleText(): Promise<string | null> {
        return await test.step('Get job title text', async () => {
            return await this.getText(this.jobTitleHeader);
        });
    }

    /**
     * Get job status text for verification (rule 8: return data for verification)
     */
    async getJobStatusText(): Promise<string | null> {
        return await test.step('Get job status text', async () => {
            return await this.getText(this.jobStatusBadge);
        });
    }

    /**
     * Get job number from job title for verification (rule 8: return data for verification)
     */
    async getJobNumber(): Promise<string | null> {
        return await test.step('Get job number from job title', async () => {
            const titleText = await this.getText(this.jobTitleHeader);
            if (titleText) {
                // Extract job number from title like "Jobs /M12345" -> "M12345"
                const match = titleText.match(/\/([M]\d+)/);
                return match ? match[1] : null;
            }
            return null;
        });
    }

    /**
    * Private method to wait for loading indicators to disappear (rule 4)
    */
    private async waitForLoadingToDisappear(): Promise<void> {
        try {
            await this.waitForLocatorToDisappear(this.loadingIndicator, 10000);
        } catch {
            // Loading indicator might not be present, continue
        }
    }

    /**
    * Click customer hyperlink to navigate to customer detail - Step 8
    */
    async clickCustomerHyperlink(): Promise<void> {
        await test.step('Click customer hyperlink to navigate to customer detail', async () => {
            // Remove target="_blank" to force same-tab navigation
            await this.customerHyperlink.evaluate((el: HTMLAnchorElement) => el.removeAttribute('target'));
            await this.customerHyperlink.click();
            await this.page.waitForURL('**/Customer/**', { timeout: this.navigationTimeout });
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    /**
     * Select contact by name - Step 7: Click contact name "test1" checkbox
     */
    async selectContactByName(contactName: string): Promise<void> {
        await test.step(`Select contact by name: ${contactName}`, async () => {
            // Try multiple selector strategies from class property
            for (const selectorTemplate of this.contactNameSelectors) {
                try {
                    const selector = selectorTemplate.replace('CONTACTNAME', contactName);
                    const contactElement = this.page.locator(selector).first();
                    
                    if (await contactElement.isVisible({ timeout: 2000 })) {
                        await contactElement.click();
                        return;
                    }
                } catch (error) {
                    // Continue to next selector if this one fails
                }
            }
            
            // Fallback: find row containing contact name and click its checkbox label
            const contactRow = this.page.locator(`table.jl-table tbody tr:has-text("${contactName}")`).first();
            const checkboxLabel = contactRow.locator('td:first-child label').first();
            await checkboxLabel.waitFor({ state: 'visible', timeout: this.elementTimeout });
            await checkboxLabel.click();
        });
    }

    /**
     * Check if contact exists in contacts table - Step 20: Verify contact does not appear
     */
    async isContactVisible(contactName: string): Promise<boolean> {
        return await test.step(`Check if contact ${contactName} is visible in contacts table`, async () => {
            try {
                const contactRow = this.page.locator(`table.jl-table tbody tr:has-text("${contactName}")`).first();
                await contactRow.waitFor({ state: 'visible', timeout: 3000 });
                return true;
            } catch {
                return false;
            }
        });
    }

    /**
     * Navigate back to Job Creation page - Step 15: Switch back to Job Details page
     */
    async navigateBackToJobCreation(): Promise<void> {
        await test.step('Navigate back to Job Creation page', async () => {
            // Use browser back functionality or direct navigation
            await this.page.goBack();
            await this.page.waitForURL('**/Job/Create**', { timeout: this.navigationTimeout });
            await this.verifyPageLoaded();
        });
    }

    /**
     * Refresh current page - Step 16: Refresh the page
     */
    async refreshPage(): Promise<void> {
        await test.step('Refresh the page', async () => {
            await this.page.reload({ waitUntil: 'domcontentloaded' });
            await this.verifyPageLoaded();
        });
    }

}
