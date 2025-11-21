import { test, expect } from "@playwright/test";
import {
  Login,
  tillSettings,
  dropdownSelectOnly,
  tillAddCountry,
  countryGenerator,
  randomIntGenerator,
  randomStringGenerator,
} from "../../utils/helpers.js";
import { type } from "os";

async function addCountry(page) {
  console.log("Reaching till Add Country via Methods Invoke...");
  await tillAddCountry(page);
  const countryName = page.getByRole("textbox", { name: "Enter Country name" });
  await expect(countryName).toBeVisible();
  await countryGenerator(page, countryName);
  const countryNameAR = page.getByRole("textbox", { name: "Insert Country" });
  await randomStringGenerator(page, countryNameAR);
  const countryCode = page.getByPlaceholder("Enter Country Code");
  await randomIntGenerator(page, countryCode);
  const alphaCode = page.getByRole("textbox", { name: "Enter Alpha Code 2" });
  await randomIntGenerator(page, alphaCode);
  const isoCode = page.getByRole("textbox", { name: "Enter ISO Code" });
  await randomIntGenerator(page, isoCode);
  const currency = page.getByRole("combobox", { name: "Select a currency" });
  await currency.click();
  await dropdownSelectOnly(page, currency);

  //Scroll to the Bottom of the Page
  await page.evaluate(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });
  const countryFlag = page.getByRole("button", { name: "Choose File" });
  await countryFlag.setInputFiles("C:\\Users\\umar\\Downloads\\scannerr.png");
  const submitButton = page.getByRole("button", { name: "submit" });
  await submitButton.click();

  console.log("Country is Added!");
}

test("Adding a Country", async ({ page }) => {
  await addCountry(page);
});
