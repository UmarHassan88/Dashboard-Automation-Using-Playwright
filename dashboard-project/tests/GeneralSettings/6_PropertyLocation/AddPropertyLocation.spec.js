import { test, expect } from "@playwright/test";
import {
  Login,
  tillSettings,
  tillGeneralSettings,
  countryGenerator,
  randomIntGenerator,
  randomStringGenerator,
  dropdownSelectOnly,
  selectCountry,
  selectState,
  selectCity,
  selectCommunity,
  selectSubCommunity,
  submitButton,
  selectlatlang,
  mandatoryfieldValidation,
} from "../../utils/helpers.js";

async function addPropertyLocation(page) {
  console.log("Reaching till Add Property Location via Methods Invoke...");
  await Login(page);
  await tillSettings(page);
  await tillGeneralSettings(page);

  const propertyLocationTab = page.getByRole("button", {
    name: "Property Location",
  });
  await expect(propertyLocationTab).toBeVisible();
  await propertyLocationTab.click();
  const addPropertyLocationButton = page.getByRole("button", {
    name: "Add Property Location",
  });
  await expect(addPropertyLocationButton).toBeVisible();
  await addPropertyLocationButton.click();
  await mandatoryfieldValidation(page); //Validating Mandatory Fields

  //Filling the Country Manually
  const countryField = page.getByRole("combobox", { name: "Select Country" });
  await countryField.click();
  await countryGenerator(page, countryField, 1);
  await dropdownSelectOnly(page, countryField);

  await selectState(page);
  await selectCity(page);
  await selectCommunity(page);
  await selectSubCommunity(page);
  const propertyName = page.getByRole("textbox", {
    name: "Property Name",
    exact: true,
  });
  await randomStringGenerator(page, propertyName);
  const propertyNameAR = page.getByRole("textbox", {
    name: "Property Name Arabic",
    exact: true,
  });
  await randomStringGenerator(page, propertyNameAR);
  const propertyLocation = page.getByRole("textbox", {
    name: "https://www.google.com/maps/",
  });
  await propertyLocation.fill(
    "https://www.google.com/maps/place/Eiffel+Tower/@48.8583701,2.2922926,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66efda8eb6f8f:0x423d9521f3e4e4!8m2!3d48.8583701!4d2.2944813"
  );
  await selectlatlang(page);
  await submitButton(page);
}

test("This test adds a Property Location", async ({ page }) => {
  await addPropertyLocation(page);
});
