import {test, expect} from '@playwright/test';
import {Login, tillSettings, dropdownSelect} from "./utils/helpers.js"  
import { type } from 'os';

async function accountActivity(page){
        await Login(page);
        await tillSettings(page);
         const accountOption = page.getByRole('button', { name: 'Account', exact: true })
         await expect(accountOption).toHaveText('Account');
         await accountOption.click();   
         const companyActivityButton = page.getByRole('button', { name: 'Company Activity' });
         await expect(companyActivityButton).toBeVisible();
         await companyActivityButton.click();
         const createActivityButton = page.getByRole('button', { name: 'create activity' })
         await expect(createActivityButton).toBeVisible();
         await createActivityButton.click();
        //Filling the Company Activity Form
        const industrySelect = page.getByRole('combobox', { name: 'Please Select Select industry' });
        await industrySelect.click();
        const industryValue = "Test Industry 9098";
        await industrySelect.fill(industryValue);
        await dropdownSelect(page, industrySelect);
        const typeSelect = page.getByRole('combobox', { name: 'Please Select Select type' });
        await typeSelect.click();
        const typeValue = "Test Company Type 9098";
        await page.waitForTimeout(1500);
        await typeSelect.fill(typeValue);
        await dropdownSelect(page, typeSelect); 
        const activityName = page.getByRole('textbox', { name: 'Enter Activity Name', exact: true })
        const activityNameValue = "Test Account Activity 9098";
        await activityName.fill(activityNameValue);
        const submitButton = page.getByRole('button', { name: 'submit' });
        await submitButton.click();
        await page.waitForTimeout(2000);

}

test('Testing the Account Activity Creation', async({page})=> {
   await accountActivity(page);
});