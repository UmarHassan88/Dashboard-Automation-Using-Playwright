import { assert } from "console";
import {Login, tillSettings} from "./utils/helpers.js"
import {test, expect} from '@playwright/test'

async function companyType(page){
     await Login(page);
     await tillSettings(page);
    const accountOption = page.getByRole('button', { name: 'Account', exact: true })
    await expect(accountOption).toHaveText('Account');    
    await accountOption.click();
    await expect(page.getByRole('button', { name: 'Company Type' })).toBeVisible();

    //Redirect to Company Type
    const companyTypeButton = page.getByRole('button', { name: 'Company Type' });
    await companyTypeButton.click();
    const createTypeButton = page.getByRole('button', { name: 'create type' })
    //await assert(createTypeButton).isVisible();
    await createTypeButton.click();

    //Filling the Company Type Form
    const industryType = page.getByRole('combobox', { name: 'Please Select Select industry' })
    await industryType.click();
    //await page.getByTestId('company_industry').getByRole('button', { name: 'Open' }).click();
    await page.waitForSelector('value=Test Industry 8864', { timeout: 5000 });

    await page.click('text=Test Industry 8864');

} 

test('Testing the Company Type', async({page})=> {
   await companyType(page);

});