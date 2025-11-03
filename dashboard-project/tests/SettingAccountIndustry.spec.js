import { test, expect } from '@playwright/test';
import { Login } from './utils/helpers.js';
import { tillSettings } from './utils/helpers.js';
import SettingAccountIndustry from './pages/SettingAccountIndustry.js';

test('Navigate to Setting Account and Create Company Industry', async ({ page }) => {
    // Setup: Login and navigate to settings
    await Login(page);
    await tillSettings(page);

    // Initialize Page Object Model
    const industryPage = new SettingAccountIndustry(page);

    // Verify Account option is visible
    await expect(industryPage.accountOption).toHaveText('Account');

    // Navigate to Account Settings
    await industryPage.goToAccountSettings();
    await industryPage.verifyAccountSettingsVisible();

    // Navigate to Company Industry section
    await industryPage.goToCompanyIndustry();
    await industryPage.verifyCompanyIndustryVisible();

    // Open Create Industry modal
    await industryPage.openCreateModal();
    await industryPage.verifyCreateModalVisible();

    // Test mandatory field validation
    await industryPage.clickSubmit();
    await industryPage.verifyValidationMessageVisible();

    // Create a new industry
    const industryNameValue = "Test Industry 8864";
    await industryPage.createIndustry(industryNameValue);

    // Verify industry was created successfully
    await industryPage.verifyIndustryCreated(industryNameValue);
});

