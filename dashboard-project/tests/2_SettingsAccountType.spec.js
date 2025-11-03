import { assert } from "console";
import {Login, tillSettings, dropdownSelect} from "./utils/helpers.js"
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


    //CHecking the Assertions
    const submitButton = page.getByRole('button', { name: 'submit' });
    const typeNameAssert = page.getByText('Type Name is required')
    await submitButton.click();
    await expect(typeNameAssert).toBeVisible();
    //Filling the Company Type Form
    const industryType = page.getByRole('combobox', { name: 'Please Select Select industry' })
    await industryType.click();
    //await page.getByTestId('company_industry').getByRole('button', { name: 'Open' }).click();
    
    await industryType.fill("Test Industry 9098");
    await dropdownSelect(page, industryType);

    const typeName = page.getByRole('textbox', { name: 'Enter Type Name', exact: true })
      const typeNameValue = "Test Company Type 9098";
   await typeName.fill(typeNameValue);
   await page.waitForTimeout(1500);
    await submitButton.click();
       await page.waitForTimeout(1500);


} 
test('Testing the Company Type', async({page})=> {
   await companyType(page);

});