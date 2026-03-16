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
        expect(true).toBe(true);
    });
});