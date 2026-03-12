import { expect, test } from '../fixtures/azure-push.fixture';
import { CustomerDetailPage } from '../pages/CustomerDetailPage';
import { JobCreationPage } from '../pages/JobCreationPage';
import { LoginPage } from '../pages/LoginPage';
import { Sidebar } from '../pages/Sidebar';

test.describe('[Add Job] - Add Contact - Delete a new contact in list', () => {
    let loginPage: LoginPage;
    let sidebar: Sidebar;
    let jobCreationPage: JobCreationPage;
    let customerDetailPage: CustomerDetailPage;

    test.beforeEach(async ({ page }) => {
        // Initialize page objects following Page Object Model pattern
        loginPage = new LoginPage(page);
        sidebar = new Sidebar(page);
        jobCreationPage = new JobCreationPage(page);
        customerDetailPage = new CustomerDetailPage(page);

        // Step 1: Access JLWeb application
        await loginPage.goToBaseURL();
    });

        // === PART 1: Job Creation Setup ===
    test('[TC107370] @Regression : Delete contact "test1" and verify removal from job creation', async ({ page }) => {
        // // Step 3: Click on "Log Job" in the left navigation submenu
        // await sidebar.clickJobs();
        // await sidebar.clickLogJob();
        // await jobCreationPage.verifyPageLoaded();

        // // Step 4: Select first Customer from dropdown
        // await jobCreationPage.selectFirstCustomer();

        // // Step 5: Select first Site from dropdown
        // await jobCreationPage.selectFirstSite();

        // // Step 6: Input "Test contact deletion workflow" in Description field
        // await jobCreationPage.inputDescription('Test contact deletion workflow');

        // // Step 7: Click contact name "test1" checkbox in the Contacts section
        // await jobCreationPage.selectContactByName('test1');
        
        // // Expected: The contact checkbox is selected and counter shows "1 of X contact(s) selected"
        // const isContactSelected = await jobCreationPage.isContactSelectedWithCheckbox();
        // expect(isContactSelected).toBe(true);

        // // === PART 2: Navigate to Customer Detail and Delete Contact ===
        // // Step 9: Click on the Customer hyperlink under Customer dropdown
        // await jobCreationPage.clickCustomerHyperlink();
        
        // // Expected: Navigate to Customer Detail page
        // await customerDetailPage.verifyPageLoaded();
        // await expect(page).toHaveURL(/.*\/Customer\/.*/);

        // // Step 10: Click on the "Contacts" tab
        // await customerDetailPage.clickContactsTab();
        
        // // Expected: Contacts table is displayed with list of contacts
        // await expect(customerDetailPage.contactTable).toBeVisible();

        // // Step 12: Click on the "three vertical dots" icon of contact "test1"
        // await customerDetailPage.clickThreeDotsIconForContact('test1');

        // // Step 13: Click on the "Delete" button in the dropdown
        // await customerDetailPage.clickDeleteButtonForContact('test1');

        // // Expected: Confirmation dialog appears with message "Are you sure you would like to delete this contact?"
        // const isPopupVisible = await customerDetailPage.isDeleteConfirmPopupVisible();
        // expect(isPopupVisible).toBe(true);

        // // Step 14: Click on the "Delete" button in the confirmation dialog
        // await customerDetailPage.confirmDelete();

        // // Expected: Contact is deleted and success toast message appears
        // const toastMessage = await customerDetailPage.getToastMessage();
        // expect(toastMessage).toBeTruthy();

        // // === PART 3: Return to Job Creation and Verify Contact Removal ===
        // // Step 15: Switch back to Job Details page
        // await sidebar.clickJobs();
        // await sidebar.clickLogJob();

        // // Step 18: Select the same Customer from dropdown
        // await jobCreationPage.selectFirstCustomer();

        // // Step 19: Select the same Site from dropdown
        // await jobCreationPage.selectFirstSite();

        // // Step 20: Verify contact "test1" in the Contacts section
        // // Expected: "test1" contact should not appear in the contacts list
        // const isTest1ContactVisible = await jobCreationPage.isContactVisible('test1');
        // expect(isTest1ContactVisible).toBe(false);
        expect(true).toBe(false);
    });

    test('[TC107557] @Regression : Delete contact "test2" and verify removal from job creation', async ({ page }) => {    
        expect(true).toBe(false);});
});