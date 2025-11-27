import { test, expect } from "@playwright/test";
import {
  Login,
  mandatoryfieldsValidationCustom,
  randomStringGenerator,
  randomIntGenerator,
  submitButton,
  tillGeneralSettings,
  tillSettings,
} from "../../utils/helpers";
import { randomInt } from "crypto";

async function addLanguage(page) {
  await Login(page);
  await tillSettings(page);
  await tillGeneralSettings(page);
  const languageOption = page.getByRole("button", { name: "Language" });
  await expect(languageOption).toBeVisible();
  await languageOption.click();
  const addLanguage = page.getByRole("button", { name: "Add Language" });
  await expect(addLanguage).toBeVisible();
  await addLanguage.click();
  const mandatoryfieldTitle = page.getByText("Language Title *");
  await mandatoryfieldsValidationCustom(page, mandatoryfieldTitle);
  const languagetitleField = page.getByRole("textbox", {
    name: "Please enter title",
  });
  await randomStringGenerator(page, languagetitleField);
  const languageTitleAR = page.getByRole("textbox", {
    name: "أدخل العنوان بالعربية",
  });
  await randomStringGenerator(page, languageTitleAR);
  const alphaCodeField = page.getByRole("textbox", {
    name: "Enter Language Code",
  });
  await randomIntGenerator(page, alphaCodeField);
  const flagIcon = page.getByRole("button", { name: "Choose File" });
  //   await flagIcon.click();
  await flagIcon.setInputFiles("C:\\Users\\umar\\Downloads\\scannerr.png");
  await submitButton(page);
}

test("This test adds a new Language", async ({ page }) => {
  await addLanguage(page);
});
