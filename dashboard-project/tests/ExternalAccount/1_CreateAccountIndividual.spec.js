import { test, expect } from "@playwright/test";
import { Login, tillAccounts } from "../utils/helpers.js";

async function createIndividualAccount(page) {
  await tillAccounts(page);
  const individualOption = page.getByRole("option", { name: "Individual" });
  await expect(individualOption).toBeVisible();
  await individualOption.click();
  await page.getByRole("button", { name: "submit" }).click();
  //Assert for the Individual Type Form and the Mandatory fields
  const requiredFields = await page.locator("label.Mui-error.Mui-required");
  const count = await requiredFields.count();

  console.log(`Found ${count} required fields:`);

  for (let i = 0; i < count; i++) {
    const labelText = await requiredFields.nth(i).innerText();
    console.log(`- ${labelText}`);
  }
  await fillCompanyDetails(page);
  await fillServiceInformation(page);
  await fillSocialMediaDetails(page);
  await fillBankDetails(page);
}

async function fillServiceInformation(page) {
  const serviceExpertise = page.getByRole("combobox", {
    name: "Select Service Expertise",
  });
  await serviceExpertise.click();

  const serviceExpertiseOptions = page.getByRole("option", {
    name: "Sale's Consultant",
  });
  await expect(serviceExpertiseOptions).toBeVisible();
  await serviceExpertiseOptions.click();
  const countrySelect = page.getByRole("combobox", { name: "Select Country" });
  await countrySelect.click();
  const countryUAE = page.getByRole("option", { name: "United Arab Emirates" });
  await expect(countryUAE).toBeVisible();
  await countryUAE.click();
  const serviceArea = page.getByRole("combobox", {
    name: "Select Service Area",
  });
  await serviceArea.click();
  const serviceAreaOption = page.getByRole("option", { name: "Dubai" });
  await expect(serviceAreaOption).toBeVisible();
  await serviceAreaOption.click();
  const languages = page.getByRole("combobox", { name: "Select Languages" });
  await languages.click();
  const languageSelect = page.getByRole("option", { name: "Arabic" });
  await expect(languageSelect).toBeVisible();
  await languageSelect.click();
  const experienceSince = page.getByRole("textbox", { name: "MM/DD/YYYY" });
  await experienceSince.fill("01/01/2015");
}

async function fillCompanyDetails(page) {
  const individualName = page.getByRole("combobox", {
    name: "Please Select Individual Type",
  });
  await individualName.click();
  const freelancerOption = page.getByRole("option", { name: "freelancer" });
  await expect(freelancerOption).toBeVisible();
  await freelancerOption.click();
  const userName = page.getByRole("textbox", { name: "Enter Username" });
  //Generating Random String for Uniqueness and Repeated Automation
  const randomString = Math.random().toString(36).substring(2, 5);
  await userName.fill(`testUser${randomString}`.toLowerCase());
  //Generating Random String for Uniqueness and Repeated Automation

  const firstName = page
    .getByTestId("first-name")
    .getByRole("textbox", { name: "Enter First Name" });
  await firstName.fill(`Test${randomString}`);
  const lastName = page
    .getByTestId("last-name")
    .getByRole("textbox", { name: "Enter Last Name" });
  await lastName.fill(`User${randomString}`);
  const email = page.getByRole("textbox", { name: "Admin email address" });
  await email.fill(`TestUser${randomString}@example.com`);
  const contactNum = page.getByPlaceholder("Enter Contact Phone no");
  await contactNum.fill(`1234567890`);
  //Uploading the Profile Picture
  const profilePictureUpload = page
    .getByTestId("profile-picture")
    .getByRole("button", { name: "Choose File" });
  await profilePictureUpload.setInputFiles(
    "C:\\Users\\umar\\Downloads\\scannerr.png"
  );
  await page.waitForTimeout(1000);
  const about = page.getByRole("textbox", { name: "Description.." });
  await about.fill(
    "This is a test individual account created via automated Playwright script."
  );
}

async function fillSocialMediaDetails(page) {
  const platformName = page.getByRole("combobox", {
    name: "Select platform name",
  });
  await platformName.click();
  const platformFacebook = page.getByRole("option", { name: "Facebook" });

  await expect(platformFacebook).toBeVisible();
  await platformFacebook.click();
  const platformURL = page.getByRole("textbox", { name: "Enter paltform url" });
  await platformURL.fill("https://www.facebook.com/testuser");
  await expect(page.getByTestId("add-platform")).toBeVisible();
}

async function fillBankDetails(page) {
  const bankName = page.getByRole("textbox", { name: "Bank Name" });
  await bankName.fill("Test Bank");
  const countrySelect = page.getByRole("combobox", {
    name: "Please a Country",
  });
  await countrySelect.click();
  const countryUAE = page.getByRole("option", { name: "United Arab Emirates" });
  await expect(countryUAE).toBeVisible();
  await countryUAE.click();
  const currencies = page.getByRole("combobox", { name: "Please a Currency" });
  await currencies.click();
  const currencyDirham = page.getByRole("option", {
    name: "UAE DirhamUAE Dirham",
  });
  await expect(currencyDirham).toBeVisible();
  await currencyDirham.click();
}

test("Testing the Individual Account Creation", async ({ page }) => {
  await createIndividualAccount(page);
  //Checking the Clear Functionality
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  /*const clearButton = page.getByRole("button", { name: "clear", exact: true });
  await expect(clearButton).toBeVisible();
  await clearButton.click();
  await page.waitForTimeout(1000);
  //Filling the form again to submit
  await createIndividualAccount(page);*/
  const submitButton = page.getByRole("button", { name: "submit" });
  await expect(submitButton).toBeVisible();
  await submitButton.click();
});
