import { test, expect } from "@playwright/test";
import {
  Login,
  tillSettings,
  randomStringGenerator,
  tillGeneralSettings,
  dropdownSelectOnly,
  submitButton,
  mandatoryfieldsValidationCustom,
} from "../../utils/helpers";

async function addDocumentCategory(page) {
  await Login(page);
  await tillSettings(page);
  await tillGeneralSettings(page);
  const documentCategoriesOption = page.getByRole("button", {
    name: "Document Categories",
  });
  await expect(documentCategoriesOption).toBeVisible();
  await documentCategoriesOption.click();
  const addDocumentCategoryButton = page.getByRole("button", {
    name: "Add Document Category",
  });
  await expect(addDocumentCategoryButton).toContainText("Document");
  await addDocumentCategoryButton.click();
  const documentCategorymandatoryField = page.getByText("Document Category *");
  await mandatoryfieldsValidationCustom(page, documentCategorymandatoryField);
  //Filling the Document Category Field
  const documentCategoryField = page.getByRole("textbox", {
    name: "Enter Document Category",
    exact: true,
  });
  await randomStringGenerator(page, documentCategoryField);
  const documentCategoryFieldAR = page.getByRole("textbox", {
    name: "Enter Document Category Arabic",
  });
  await randomStringGenerator(page, documentCategoryFieldAR);
  const sizeLimit = page.getByPlaceholder("Enter Document Size Limit");
  await sizeLimit.fill("40");
  await submitButton(page);
}

test("This test adds a new Document Category", async ({ page }) => {
  await addDocumentCategory(page);
});
