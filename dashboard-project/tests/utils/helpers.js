import { test, expect } from '@playwright/test';

export async function Login(page) {
     await page.goto("http://192.168.1.193:3000/en/login");
    const emailInput = page.getByRole('textbox', { name: 'admin@aqaryint.com' });
    const emailAssert = page.getByText('Email/User has to be filled.')
    const passwordInput = page.getByRole('textbox', { name: 'Enter your password' })
    const passwordAssert = page.getByText('Password has to be filled.')
    //await emailInput.fill('superadmin');
    const submitButton = page.getByRole('button', { name: 'Log in' })
    await submitButton.click();
    //Asserting if the Validation Messages are Visible
    await expect(emailAssert).toBeVisible();
    await expect(passwordAssert).toBeVisible();
    //Validating Incorrect Credentials
   let incorrectEmailUser = 'admin';
   let correctEmailUser = 'superadmin';
   let incorrectPassword = '12345';
   let correctPassword = 'HereWeGo@2025';
    //Incorrect Email Scenario

    await emailInput.fill(incorrectEmailUser)
    await passwordInput.fill(correctPassword)
    await submitButton.click();
    await expect(page.getByRole('alert').filter({ hasText: 'no data found' })).toBeVisible();

//Incorrect Password Scenario
    await emailInput.fill(correctEmailUser)
    await passwordInput.fill(incorrectPassword)
    await submitButton.click();
    await expect(page.getByRole('alert').filter({ hasText: 'Something Went wrong!' })).toBeVisible();

  //Correct Credentials Scenario
  await emailInput.fill(correctEmailUser)
  await passwordInput.fill(correctPassword)
  await submitButton.click();
}

export async function tillSettings(page) {
    const profileIcon = await page.getByRole('button').filter({ hasText: /^$/ }).nth(5)
  await profileIcon.click();
  const v2Toggle = page.getByRole('checkbox', { name: 'Switch to v2' })
  await v2Toggle.click();
  const V2UIAssert = await page.getByText('Property Management Platform');
  await expect(V2UIAssert).toBeVisible();
  //Redirect to Settings   
  const settingsOption = page.getByRole('button', { name: 'Settings' });

  await settingsOption.click();
}
export async function dropdownSelect(page, constant){
   await page.keyboard.press('ArrowDown');
   await constant.press('Enter');

 }
 test('Input Fields Validation', async({page}) => {
   await Login(page);
})


