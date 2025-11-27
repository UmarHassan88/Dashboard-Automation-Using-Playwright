import { test, expect } from "@playwright/test";
import {
  tillSettings,
  Login,
  tillGeneralSettings,
  countryGenerator,
  dropdownSelect,
  randomStringGenerator,
  randomIntGenerator,
  submitButton,
  selectCountry,
  selectlatlang,
  mandatoryfieldValidation,
} from "../../utils/helpers";

async function createState(page) {
  console.log("Invoking the Methods to Reach till Add State");
  await Login(page);
  await tillSettings(page);
  await tillGeneralSettings(page);
  const stateOption = page.getByRole("button", { name: "State" });
  await expect(stateOption).toBeVisible();
  await stateOption.click();
  console.log("Asserting Add State Page");
  const addState = page.getByRole("button", { name: "Add State" });
  await expect(addState).toBeVisible();
  await addState.click();
  console.log("Asserting the Add State pop up");
  const addStatePopUp = page.getByRole("heading", { name: "Add State" });
  await expect(addStatePopUp).toBeVisible();
  await mandatoryfieldValidation(page); //Validating Mandatory Fields
  await selectCountry(page);
  const stateName = page.locator('input[name="state_name"]');
  await randomStringGenerator(page, stateName);
  const stateNameAR = page.locator('input[name="state_name_arabic"]');
  await randomStringGenerator(page, stateNameAR);
  //Generating Random Lat and long Values
  await selectlatlang(page);
  await submitButton(page);
}

test("This test creates a new State", async ({ page }) => {
  await createState(page);
});
