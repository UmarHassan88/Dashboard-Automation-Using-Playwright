import { test } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage.js";
import { ProjectsPage } from "./pages/ProjectPage.js";
import { CredentialsPage } from "./pages/credentials.js";

test.describe("Projects Section Functional", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(
      CredentialsPage.validCredentials.username,
      CredentialsPage.validCredentials.password
    );
    await login.assertLoaded();
    await page
      .getByRole("banner")
      .getByRole("main")
      .getByRole("button")
      .filter({ hasText: /^$/ })
      .nth(4)
      .click();
    await page.getByRole("checkbox", { name: "Switch to v2" }).click();
  });

  test("Add Ready Project and Property", async ({ page }) => {
    const projects = new ProjectsPage(page);
    await projects.addProjectReady();
    await projects.addReadyProjectProperty();
  });

  test("Add Offplan Project with Gallery and Plans", async ({ page }) => {
    const projects = new ProjectsPage(page);
    await projects.addProjectOffplan();
    await projects.addOffplanGallery();
    await projects.addOffplanPlan();
  });

  test("Add Multiphase Project with Gallery and Plans", async ({ page }) => {
    const projects = new ProjectsPage(page);
    await projects.addProjectMultiphase();
    await projects.addMultiphaseGallery();
    await projects.addMultiphasePlan();
  });
});
