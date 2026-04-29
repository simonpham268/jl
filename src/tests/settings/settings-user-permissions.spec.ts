import { test, expect } from '../../fixtures/combined.fixture';
import { LoginPage } from '../../pages/LoginPage';
import { StaffPage } from '../../pages/Settings/StaffPage';

test.describe('Settings - User Permissions', () => {
  let loginPage: LoginPage;
  let staffPage: StaffPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    staffPage = new StaffPage(page);
    await loginPage.goToBaseURL();
  });

  /** ID: TC_11_RQ1(a) Tags: Smoke, Regression */
  test('[TC_11_RQ1(a)] @Smoke @Regression: [Settings → User Permissions] Verify "Visit - Upload Forms" and "Asset - Upload Forms" permissions are enabled by default for Administrator role', async () => {
    await staffPage.navigateToAdminUser();
    await expect(staffPage.roleSelected).toContainText('Administrator');
    await staffPage.clickEdit();
    await staffPage.clickMobileTab();
    await staffPage.searchPermission('Visit - Upload Forms');
    await expect(staffPage.getPermissionInRoleIcon('Visit - Upload Forms')).toBeVisible();
    await expect(staffPage.getPermissionInheritRadio('Visit - Upload Forms')).toBeEnabled();

    await staffPage.searchPermission('Asset - Upload Forms');
    await expect(staffPage.getPermissionInRoleIcon('Asset - Upload Forms')).toBeVisible();
    await expect(staffPage.getPermissionDenyRadio('Asset - Upload Forms')).toBeEnabled();
  });
});
