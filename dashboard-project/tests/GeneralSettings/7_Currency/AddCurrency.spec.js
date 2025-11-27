import { test, expect } from "@playwright/test";
import {
  Login,
  tillSettings,
  tillGeneralSettings,
  dropdownSelectOnly,
  randomStringGenerator,
  randomIntGenerator,
  submitButton,
  mandatoryfieldsValidationCustom,
} from "../../utils/helpers";

async function addCurrency(page) {
  await Login(page);
  await tillSettings(page);
  await tillGeneralSettings(page);
  const manageCurrrencyOption = page.getByRole("button", {
    name: "Manage currency",
  });
  await expect(manageCurrrencyOption).toBeVisible();
  await manageCurrrencyOption.click();
  const addCurrencyButton = page.getByRole("button", { name: "Add Currency" });
  await expect(addCurrencyButton).toContainText("Add");
  await addCurrencyButton.click();
  //   await submitButton(page);
  const currencyMandatoryField = page.getByText("Currency name *");
  await mandatoryfieldsValidationCustom(page, currencyMandatoryField);
  const currencyCodeField = page.getByText("Currency Code *");
  await mandatoryfieldsValidationCustom(page, currencyCodeField);
  //Filling the Currency Fields
  const currencyName = page.getByRole("textbox", {
    name: "Enter Currency name",
  });
  const randomString = Math.random().toString(36).substring(2, 7);
  await currencyName.fill(`Currency${randomString}`);
  const currencyCode = page.getByRole("textbox", {
    name: "Enter Currency Code",
  });
  await randomIntGenerator(page, currencyCode);
  await submitButton(page);
}

test("This test adds a new Currency", async ({ page }) => {
  await addCurrency(page);
});
