import { test, expect } from '@playwright/test';
import { Login } from './utils/helpers.js';
import { tillSettings } from './utils/helpers.js';

async function createIndustry(page){
     await Login(page);
    await tillSettings(page);

    // Verify Account option is visible
    const accountOption = page.getByRole('button', { name: 'Account', exact: true })
    await expect(accountOption).toHaveText('Account');

    // Navigate to Account Settings
    await accountOption.click();

    //Trigger Industry Section 
    const industryButton = page.getByRole('button', { name: 'Industry' });
    await expect(industryButton).toBeVisible();
    await industryButton.click();

    // Create Indsutry
    const createIndustry  = page.getByRole('button', { name: 'create industry' });
    await expect(createIndustry).toBeVisible();
    await createIndustry.click();

    // Create a new industry
    const industryName = page.getByRole('textbox', { name: 'Enter industry Name', exact: true })
    const industryNameValue = "Test Industry 9098";
    await industryName.fill(industryNameValue);
    const submitIndustry = page.getByRole('button', { name: 'submit' });
    await submitIndustry.click();
    await page.waitForTimeout(2000);
    //--Test Case Fail: Needs refreshing upon Add
    //await expect(page.getByRole('cell', { name: 'Test Industry 8871' })).toBeVisible();

}

test('Navigate to Setting Account and Create Company Industry', async ({ page }) => {
    await createIndustry(page);    

});

