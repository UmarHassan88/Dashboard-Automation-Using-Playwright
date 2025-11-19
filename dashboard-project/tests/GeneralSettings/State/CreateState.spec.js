import { test, expect } from "@playwright/test";
import {
  tillSettings,
  Login,
  tillGeneralSettings,
  countryGenerator,
  dropdownSelect,
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
  const selectCountry = page.getByRole("combobox", { name: "Select Country" });
  await selectCountry.click();
  await countryGenerator(page, selectCountry);
  await dropdownSelect(page, selectCountry, 1);
}

test("This test craetes a new State", async ({ page }) => {
  await createState(page);
});
