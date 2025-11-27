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
  selectlatlang,
  mandatoryfieldValidation,
} from "../../utils/helpers";

async function addCity(page) {
  await Login(page);
  await tillSettings(page);
  await tillGeneralSettings(page);

  const citySection = page.getByRole("button", { name: "City" });
  await expect(citySection).toBeVisible();
  await citySection.click();
  const addCity = page.getByRole("button", { name: "Add City" });
  await expect(addCity).toBeVisible();
  await addCity.click();
  console.log("Selecting the Country via Invoked Method");
  await mandatoryfieldValidation(page); //Validating Mandatory Fields
  await selectCountry(page);
  await selectState(page);
  const createCity = page.getByRole("textbox", {
    name: "City Name",
    exact: true,
  });
  await randomStringGenerator(page, createCity);
  const createCityAR = page.getByRole("textbox", { name: "City Name Arabic" });
  await randomStringGenerator(page, createCityAR);
  const upload = page.getByRole("button", { name: "Choose File" });
  await uploadFile(page, upload);
  const description = page.getByRole("textbox", { name: "Description" });
  await description.fill("This is test description");
  await selectlatlang(page);
  await submitButton(page);
}

test("This test creates a new City", async ({ page }) => {
  await addCity(page);
});
