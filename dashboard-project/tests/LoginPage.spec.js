import { test } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage.js";
import { CredentialsPage } from "./pages/credentials.js";

test.describe("Login Page Validation", () => {
  test("Success Validation", async ({ page }) => {
    const dashboard = new LoginPage(page);
    await dashboard.goto();
    await dashboard.assertLoaded();
    await dashboard.login(
      CredentialsPage.validCredentials.username,
      CredentialsPage.validCredentials.password
    );
    await dashboard.assertLoginSuccess();
    await page.context().storageState({ path: "auth.json" }); // Save storage state after login
  });
  test("Invalid Validation", async ({ page }) => {
    const dashboard = new LoginPage(page);
    await dashboard.goto();
    await dashboard.assertLoaded();
    await dashboard.login(
      CredentialsPage.invalidCredentials.username,
      CredentialsPage.invalidCredentials.password
    );
    await dashboard.assertInvalidLogin();
  });
});
