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
  dropdownSelectOnly,
  uploadFile,
  selectState,
  selectCity,
  selectCommunity,
  selectlatlang,
} from "../../utils/helpers";

async function addSubcommunity(page) {
  await Login(page);
  await tillSettings(page);
  await tillGeneralSettings(page);
  await expect(page).toHaveURL(
    "http://192.168.1.193:3000/en/dashboard/settings/general"
  );
  console.log("Navigating to the Sub community Settings");
  const subCommunityOption = page.getByRole("button", {
    name: "Sub Community",
  });
  await subCommunityOption.click();
  const addSubcommunity = page.getByRole("button", {
    name: "Add Sub Community",
  });
  await addSubcommunity.click();
  await selectCountry(page);
  await selectState(page);
  await selectCity(page);
  await selectCommunity(page);
  const subCommunityfield = page.getByRole("textbox", {
    name: "Sub Community",
    exact: true,
  });
  const subCommunityfieldAR = page.getByRole("textbox", {
    name: "Sub Community Arabic",
  });
  await randomStringGenerator(page, subCommunityfield);
  await randomStringGenerator(page, subCommunityfieldAR);
  await selectlatlang(page);
  await submitButton(page);
}

test("This test adds a subcommunity", async ({ page }) => {
  await addSubcommunity(page);
});
