import { test, expect } from "@playwright/test";

export async function Login(page) {
  await page.goto("http://192.168.1.193:3000/en/login");
  const emailInput = page.getByRole("textbox", { name: "admin@aqaryint.com" });
  const emailAssert = page.getByText("Email/User has to be filled.");
  const passwordInput = page.getByRole("textbox", {
    name: "Enter your password",
  });
  const passwordAssert = page.getByText("Password has to be filled.");
  //await emailInput.fill('superadmin');
  const submitButton = page.getByRole("button", { name: "Log in" });
  await submitButton.click();
  //Asserting if the Validation Messages are Visible
  await expect(emailAssert).toBeVisible();
  await expect(passwordAssert).toBeVisible();
  //Validating Incorrect Credentials
  let incorrectEmailUser = "admin";
  let correctEmailUser = "superadmin";
  let incorrectPassword = "12345";
  let correctPassword = "HereWeGo@2025";
  //Incorrect Email Scenario

  await emailInput.fill(incorrectEmailUser);
  await passwordInput.fill(correctPassword);
  await submitButton.click();
  await expect(
    page.getByRole("alert").filter({ hasText: "no data found" })
  ).toBeVisible();

  //Incorrect Password Scenario
  await emailInput.fill(correctEmailUser);
  await passwordInput.fill(incorrectPassword);
  await submitButton.click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Something Went wrong!" })
  ).toBeVisible();

  //Correct Credentials Scenario
  await emailInput.fill(correctEmailUser);
  await passwordInput.fill(correctPassword);
  await submitButton.click();
}

export async function tillSettings(page) {
  const profileIcon = await page
    .getByRole("button")
    .filter({ hasText: /^$/ })
    .nth(5);
  await profileIcon.click();
  const v2Toggle = page.getByRole("checkbox", { name: "Switch to v2" });
  await v2Toggle.click();
  const V2UIAssert = await page.getByText("Property Management Platform");
  await expect(V2UIAssert).toBeVisible();
  //Redirect to Settings
  const settingsOption = page.getByRole("button", { name: "Settings" });

  await settingsOption.click();
}

export async function dropdownSelect(page, constant, j) {
  await page.waitForTimeout(1000);
  for (var i = 0; i < j; i++) {
    await page.keyboard.press("ArrowDown");
  }
  await constant.press("Enter");
}

export async function dropdownSelectOnly(page, locator) {
  await page.waitForTimeout(1000);
  await page.keyboard.press("ArrowDown");

  await locator.press("Enter");
}

export async function fillLocationDetails(page) {
  const country = page.getByRole("combobox", { name: "Select Country" });
  const state = page.getByRole("combobox", { name: "Select State" });
  const city = page.getByRole("combobox", { name: "Select City" });
  const community = page.getByRole("combobox", { name: "Select Community" });
  const subCommunity = page.getByRole("combobox", {
    name: "Select Sub Community",
  });
  const pinLocation = page.getByRole("img", { name: "aqary map" });

  await country.click();
  await dropdownSelect(page, country, 1);
  await state.click();
  await page.getByRole("option", { name: "Abu Dhabi" }).click();

  //await dropdownSelect(page, state, 2);
  await city.click();
  const cityValue = page.getByRole("option", { name: "Abu Dhabi City" });
  await expect(cityValue).toBeVisible();
  await cityValue.click();
  await community.click();
  const communityValue = page.getByRole("option", { name: "Airport Road" });
  await expect(communityValue).toBeVisible();
  await communityValue.click();
  await subCommunity.click();
  const subCommunityValue = page.getByRole("option", {
    name: "Al Manhal Tower",
  });
  await subCommunityValue.click();
  await pinLocation.click();
  const mapTab = page.getByRole("menuitemradio", { name: "Show street map" });
  await expect(mapTab).toBeVisible();
  await page.mouse.move(200, 200);
  await page.waitForTimeout(2000);
  await page.mouse.down();
  await console.log("Mouse Down Clicked");
  await page.mouse.up();
  await console.log("Mouse Up Clicked");

  //page.waitForTimeout(2000);
  const closeMap = page.getByRole("button", { name: "close" });
  await closeMap.click();
}

export async function tillAccounts(page) {
  await Login(page);
  const profileIcon = await page
    .getByRole("button")
    .filter({ hasText: /^$/ })
    .nth(5);
  await profileIcon.click();
  const v2Toggle = page.getByRole("checkbox", { name: "Switch to v2" });
  await v2Toggle.click();
  const V2UIAssert = await page.getByText("Property Management Platform");
  await expect(V2UIAssert).toBeVisible();
  const AccountsMenu = page.getByRole("button", { name: "Accounts" });
  await expect(AccountsMenu).toBeVisible();
  await AccountsMenu.click();
  const createAccountOption = page.getByRole("button", {
    name: "Create Account",
  });
  await expect(createAccountOption).toBeVisible();
  await createAccountOption.click();

  const accountTypeSelect = page.getByRole("combobox", {
    name: "Please Select Account Type",
  });
  await accountTypeSelect.click();
}

export async function randomStringGenerator(page, con) {
  const randomValues = Math.random().toString(36).substring(2, 5);
  await con.fill(`TestCompany${randomValues}`);
}

export async function tillGeneralSettings(page) {
  const generalSettings = page.getByRole("button", { name: "General" });
  await expect(generalSettings).toBeVisible();
  await generalSettings.click();
}

export async function tillAddCountry(page) {
  await Login(page);
  await tillSettings(page);
  await tillGeneralSettings(page);
  const countryOption = page.getByRole("button", { name: "Country" });
  await countryOption.click();
  const addCountry = page.getByRole("button", { name: "Add Country" });
  await expect(addCountry).toBeVisible();
  await addCountry.click();
}

export async function countryGenerator(page, locator) {
  let array = [
    "United Arab Emirates",
    "Pakistan",
    "Egypt",
    // "Lebanon",
    // "SA",
    // "Brazil",
    // "United Kingdom",
    // "Sudan",
    // "Algeria",
  ];
  const ran = Math.floor(Math.random() * 3);
  let rand = array[ran];
  console.log("The country " + rand + " is selected indexed at " + ran);

  await locator.fill(rand);
}

export async function randomIntGenerator(page, locator) {
  const randomInt = Math.floor(Math.random() * 10).toString();

  await locator.fill(randomInt);
}

export async function submitButton(page) {
  const submitButton = page.getByRole("button", { name: "submit" });
  await expect(submitButton).toBeVisible();
  await submitButton.click();
}

export async function selectCountry(page) {
  const select = page.getByRole("combobox", { name: "Select Country" });
  await select.click();
  await countryGenerator(page, select);
  await dropdownSelectOnly(page, select);
}

export async function selectState(page) {
  const state = page.getByRole("combobox", { name: "Select State" });
  await state.click();
  await dropdownSelectOnly(page, state);
}

export async function selectCity(page) {
  const city = page.getByRole("combobox", { name: "Select City" });
  await city.click();
  await dropdownSelectOnly(page, city);
}

export async function selectCommunity(page) {
  const community = page.getByRole("combobox", { name: "Select Community" });
  await community.click();
  await dropdownSelectOnly(page, community);
}

export async function uploadFile(page, locator) {
  await locator.setInputFiles("C:\\Users\\umar\\Downloads\\scannerr.png");
}

export async function selectlatlang(page) {
  const lat = page.getByPlaceholder("Enter latitude");
  await randomIntGenerator(page, lat);
  const long = page.getByPlaceholder("Enter longitude");
  await randomIntGenerator(page, long);
}
