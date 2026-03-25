import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { test } from '@playwright/test';

export class CustomerDetailPage extends BasePage {
    // Customer details page locators
    readonly pageTitle: Locator;
    readonly contactsTab: Locator;
    readonly loadingIndicator: Locator;

    // Contact management locators
    readonly threeDotsIcon: Locator;
    readonly deleteButton: Locator;
    readonly confirmDeletePopup: Locator;
    readonly yesButton: Locator;
    readonly toastMessage: Locator;
    readonly contactRowByName: Locator;
    readonly contactTable: Locator;

    // Selector strategies as class properties (rule 10)
    readonly tabSelectors: string[];
    readonly deleteButtonSelectors: string[];
    readonly confirmButtonSelectors: string[];
    readonly contactRowSelectors: string[];

    constructor(page: Page) {
        super(page);

        // Customer details page elements - heading is h3 containing "Customers" breadcrumb
        this.pageTitle = this.page.locator(
            'h3:has-text("Customers"), h1:has-text("Customer"), .page-title'
        ).first();

        // Contacts tab link — exact href anchor
        this.contactsTab = this.page.locator('a[href="#contactsTab"]').first();

        this.loadingIndicator = this.page.locator(
            '.loading, .spinner, [class*="load"], .ajax-loader, [data-testid="loading"]'
        );

        // Three-dots trigger button scoped to contacts tabpanel table
        this.threeDotsIcon = this.page.locator(
            '#contactsTab table button.table-actions_trigger'
        ).first();

        // Delete button — has id="deleteContact", positioned outside the table (absolute)
        this.deleteButton = this.page.locator('button#deleteContact, #contactsTab button:has-text("Delete")').first();

        // Confirm modal — Bootstrap modal with class "in" when visible
        this.confirmDeletePopup = this.page.locator('#modalSwitchContainer, .modal.in').first();

        // The confirm button inside the delete modal has id="modalConfirmYes" and text "Delete"
        this.yesButton = this.page.locator('button#modalConfirmYes').first();

        // Toast/alert notification after deletion
        this.toastMessage = this.page.locator(
            '[role="alert"], .toast, .alert-success, .notification'
        ).first();

        // Contact table and row selection by name locators (rule 9: declare in constructor) 
        this.contactTable = this.page.locator('#contactsTab table');
        this.contactRowByName = this.page.locator('#contactsTab table tbody tr');

        // Selector strategies as class properties following prompt.md guidelines
        this.tabSelectors = [
            'a[href="#contactsTab"]',
            'a:has-text("Contacts")',
            '[role="tab"]:has-text("Contacts")'
        ];

        this.deleteButtonSelectors = [
            'button#deleteContact',
            '#contactsTab button:has-text("Delete")',
            'button:has-text("Delete")'
        ];

        this.confirmButtonSelectors = [
            'button#modalConfirmYes',
            'button:has-text("Yes")',
            '.btn-confirm'
        ];

        // Contact row selectors by name (rule 10: arrays as class properties)
        this.contactRowSelectors = [
            '#contactsTab table tbody tr:has-text("CONTACTNAME")',
            'table tbody tr:has-text("CONTACTNAME")',
            '[data-testid="contact-row"]:has-text("CONTACTNAME")'
        ];
    }

    /**
     * Verify customer detail page has loaded
     */
    async verifyPageLoaded(): Promise<void> {
        await test.step('Verify Customer Detail page has loaded', async () => {
            await this.pageTitle.waitFor({ state: 'visible', timeout: this.elementTimeout });
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    /**
     * Click on the Contacts tab - Step 9
     */
    async clickContactsTab(): Promise<void> {
        await test.step('Click on the Contacts tab', async () => {
            await this.contactsTab.waitFor({ state: 'visible', timeout: this.elementTimeout });
            await this.contactsTab.click();
            // Wait for the contacts table to be visible after tab switch
            await this.page.locator('#contactsTab table').waitFor({ state: 'visible', timeout: this.elementTimeout });
        });
    }

    /**
     * Click on the three vertical dots icon - Step 10
     */
    async clickThreeDotsIcon(): Promise<void> {
        await test.step('Click on the three vertical dots icon', async () => {
            // The table-actions_wrapper is display:none until row is hovered
            const contactRow = this.page.locator('#contactsTab table tbody tr:first-child');
            await contactRow.hover();
            // Now the trigger button should be visible
            await this.threeDotsIcon.waitFor({ state: 'visible', timeout: this.elementTimeout });
            await this.threeDotsIcon.click();
            // Wait for the Delete option (id=deleteContact) to become visible
            await this.page.locator('button#deleteContact').waitFor({ state: 'visible', timeout: this.elementTimeout });
        });
    }

    /**
     * Click on the Delete button - Step 11
     */
    async clickDeleteButton(): Promise<void> {
        await test.step('Click on the Delete button', async () => {
            await this.deleteButton.waitFor({ state: 'visible', timeout: this.elementTimeout });
            await this.deleteButton.click();
        });
    }

    /**
     * Verify confirm delete popup is visible - Step 11 Expected (rule 8: return data for verification)
     */
    async isDeleteConfirmPopupVisible(): Promise<boolean> {
        return await test.step('Verify confirm delete popup is visible', async () => {
            try {
                await this.page.locator('#modalSwitchContainer.in, .modal.in').waitFor({ state: 'visible', timeout: this.elementTimeout });
                return true;
            } catch {
                return false;
            }
        });
    }

    /**
     * Click on the Yes button to confirm deletion - Step 12
     */
    async confirmDelete(): Promise<void> {
        await test.step('Click on the Yes button to confirm deletion', async () => {
            await this.yesButton.waitFor({ state: 'visible', timeout: this.elementTimeout });
            await this.yesButton.click();
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    /**
     * Get toast message after successful deletion - Step 12 Expected (rule 8: return data for verification)
     */
    async getToastMessage(): Promise<string | null> {
        return await test.step('Get toast message after successful deletion', async () => {
            await this.toastMessage.waitFor({ state: 'visible', timeout: 10000 });
            return await this.getText(this.toastMessage);
        });
    }

    /**
     * Click on the three vertical dots icon for specific contact - Step 12: Click three dots of contact "test1"
     */
    async clickThreeDotsIconForContact(contactName: string): Promise<void> {
        await test.step(`Click on the three vertical dots icon for contact: ${contactName}`, async () => {
            // Find the specific contact row using selector strategies
            let contactRow = null;
            
            for (const selectorTemplate of this.contactRowSelectors) {
                try {
                    const selector = selectorTemplate.replace('CONTACTNAME', contactName);
                    const row = this.page.locator(selector).first();
                    
                    if (await row.isVisible({ timeout: 2000 })) {
                        contactRow = row;
                        break;
                    }
                } catch (error) {
                    console.debug(`Contact row selector for ${contactName} failed, trying next`);
                }
            }
            
            // Fallback if specific selectors fail
            if (!contactRow) {
                contactRow = this.page.locator(`#contactsTab table tbody tr:has-text("${contactName}")`).first();
            }
            
            // Hover over the contact row to ensure visibility
            await contactRow.hover();
            
            // Click the three-dots button within this specific row
            const threeDotsInRow = contactRow.locator('button.table-actions_trigger').first();
            await threeDotsInRow.waitFor({ state: 'visible', timeout: this.elementTimeout });
            await threeDotsInRow.click();
            
            // Wait for delete button to appear in dropdown (not necessarily within the row)
            await this.deleteButton.waitFor({ state: 'visible', timeout: this.elementTimeout });
        });
    }

    /**
     * Click delete button for specific contact - Step 13: Click Delete button in dropdown
     */
    async clickDeleteButtonForContact(contactName: string): Promise<void> {
        await test.step(`Click delete button for contact: ${contactName}`, async () => {
            // Click the delete button that appeared after clicking three-dots
            await this.deleteButton.waitFor({ state: 'visible', timeout: this.elementTimeout });
            await this.deleteButton.click();
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
}