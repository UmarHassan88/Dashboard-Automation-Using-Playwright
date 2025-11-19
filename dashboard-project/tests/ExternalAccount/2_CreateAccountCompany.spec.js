import { test, expect } from "@playwright/test";
import {
  dropdownSelect,
  fillLocationDetails,
  Login,
  randomStringGenerator,
} from "../utils/helpers.js";
import { tillAccounts } from "../utils/helpers.js";

async function fillAccountCompanyDetails(page) {
  //Assert for the Current URL after selecting Company Type
  const currentURL = page.url();
  const expectedURL = "http://192.168.1.193:3000/en/dashboard/accounts/create";
  await expect(currentURL).toEqual(expectedURL);
  await expect(currentURL).toContain("/dashboard/accounts/create");
  //Assert if the Dynamic Values for Company appear upon selecting Company Type
  const companyName = page.getByRole("textbox", {
    name: "Enter a company name",
  });
  await randomStringGenerator(page, companyName);

  async function readValues(locator) {
    const readValue = locator.getInputValue();
    await expect;
  }

  const companyIndustry = page.getByRole("combobox", {
    name: "Choose Industry",
  });
  await companyIndustry.click();
  const industryOption = page.getByRole("option", { name: "Marko" });
  await expect(industryOption).toBeVisible();
  //Invoking the Drop down functions
  await dropdownSelect(page, companyIndustry, 1);
  await expect(companyIndustry).toHaveValue("Real Estate");
  const companyType = page.getByRole("combobox", {
    name: "Please Select Company Type",
  });
  await companyType.click();
  await dropdownSelect(page, companyType, 2);
  await expect(companyType).toHaveValue("Broker Company");
  const companyActivity = page.getByRole("combobox", {
    name: "Choose a company activity",
  });
  await companyActivity.click();
  await dropdownSelect(page, companyActivity, 1);
  await expect.soft(companyActivity).toHaveValue("Real Estate");
  console.log("Exception Faced at the Company Activity Assertion!");
}

async function fieldsValidation(page) {
  await tillAccounts(page);
  const companyOption = page.getByRole("option", { name: "Company" });
  await expect(companyOption).toBeVisible();
  await companyOption.click();
  const usernameField = page.locator('[data-testid="username"] input');

  // Clear input (if any)
  await usernameField.fill("");

  // Click outside or try to submit form to trigger validation
  await page.getByRole("button", { name: "Submit" }).click();

  // Assert the field is required (has error class)
  const usernameContainer = page.locator('[data-testid="username"]');
  await expect(usernameContainer.locator("label")).toHaveClass(/Mui-error/);

  // Assert the error message is visible
  const errorMessage = usernameContainer.locator("p.MuiFormHelperText-root");
  await expect(errorMessage).toHaveText(
    "Username should contain at least 3 characters"
  );

  // Optional: Enter invalid username and check validation
  await usernameField.fill("ab");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(errorMessage).toHaveText(
    "Username should contain at least 3 characters"
  );

  // Enter valid username and check error disappears
  await usernameField.fill("abc");
  await page.getByRole("button", { name: "Submit" }).click();
  // await expect(errorMessage).toHaveCount(0); // error should disappear
}

async function fillAccountCompanyLocationInformation(page) {
  await fillLocationDetails(page);
}

async function fillcompanyPresentation(page) {
  const emailAddress = page.getByRole("textbox", {
    name: "Email address",
    exact: true,
  });
  const randomInt = Math.random(1, 10) * 10;
  const emailValue = "umarhassanzia88+test" + randomInt + "@gmail.com";
  await emailAddress.fill(emailValue);
  const contactNo = page.getByPlaceholder("Enter Phone No");
  await contactNo.fill(randomInt.toString().substring(1, 10));
  const logoAttach = page
    .getByTestId("logo")
    .getByRole("button", { name: "Choose File" });
  await logoAttach.setInputFiles("C:\\Users\\umar\\Downloads\\scannerr.png");
  const confirmCrop = page.getByRole("button", { name: "Confirm" });
  await confirmCrop.click();
}

async function companyAdminContact(page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const userName = page.getByRole("textbox", { name: "Enter Username" });
  await randomStringGenerator(page, userName);
  const userNameAssert = page.getByText("Username must start with a");
  await expect.soft(userNameAssert).toBeHidden();
  const lastName = page.getByRole("textbox", { name: "Enter Last Name" });
  await lastName.fill("Temp");
  const adminEmail = page.getByRole("textbox", { name: "Admin email address" });
  const emailVal = page.getByText("Invalid email address");
  await expect.soft(emailVal).toBeVisible();
  await randomStringGenerator(page, adminEmail);
  const invalidEmailAssert = page.getByText("Invalid email address");
  await expect(invalidEmailAssert).toBeVisible();
  //Appending gmail.com to Email
  const emailInput = await adminEmail.inputValue();
  await adminEmail.fill(`${emailInput}@gmail.com`);

  const contactNumValue = "123456";
  const contactNum = page.getByPlaceholder("Enter Contact Phone no");
  await contactNum.fill(contactNumValue);

  const assertContact = page.getByText("Admin Phone No is required");
  await expect.soft(assertContact).toBeVisible();
  const whatsappNo = page.getByPlaceholder("Enter Whats App  Number");
  await whatsappNo.fill("12345");
  const profilePic = page
    .getByTestId("profile-picture")
    .getByRole("button", { name: "Choose File" });
  await profilePic.setInputFiles("C:\\Users\\umar\\Downloads\\scannerr.png");
  const submitButton = page.getByRole("button", { name: "submit" });
  await submitButton.click();
}

test("Testing the Add Company Account Type Section", async ({ page }) => {
  await fieldsValidation(page);
  await fillAccountCompanyDetails(page);
  await fillAccountCompanyLocationInformation(page);
  await fillcompanyPresentation(page);
  await companyAdminContact(page);
});
