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
  selectlatlang,
} from "../../utils/helpers";

async function addCommunity(page) {
  await Login(page);
  await tillSettings(page);
  await tillGeneralSettings(page);
  const community = page.getByRole("button", {
    name: "Community",
    exact: true,
  });
  await expect(community).toBeVisible();
  await community.click();
  const addCommunity = page.getByRole("button", { name: "Add Community" });
  await expect(addCommunity).toBeVisible();
  await addCommunity.click();
  console.log("Asserting the Add Community Pop up");
  const addCommunityHeadAssert = page.getByRole("heading", {
    name: "Add Community",
  });
  await expect(addCommunityHeadAssert).toBeVisible();
  console.log("Invoking the Methods to Add Country, State and City ...");
  await selectCountry(page);
  await selectState(page);
  await selectCity(page);
  const comm = page.getByRole("textbox", {
    name: "Community Name",
    exact: true,
  });
  const commAR = page.getByRole("textbox", { name: "Community Name Arabic" });
  await randomStringGenerator(page, comm);
  await randomStringGenerator(page, commAR);
  await selectlatlang(page);
  await submitButton(page);
  const url = page.url();
  console.log("Current URL: ", url);
}

test("This test adds a Community", async ({ page }) => {
  await addCommunity(page);
});
