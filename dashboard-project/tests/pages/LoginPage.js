import { expect } from "@playwright/test";
import { CredentialsPage } from "./credentials.js";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", {
      name: "admin@aqaryint.com",
    });
    this.passwordInput = page.getByRole("textbox", {
      name: "Enter your password",
    });
    this.loginButton = page.getByRole("button", { name: "Log in" });
  }
  async goto() {
    const BASE_URL = "http://192.168.1.193:3000/en/login";
    await this.page.goto(BASE_URL);
    // await this.page.getByRole("button", { name: "Discover Now" }).click();
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoaded() {
    await expect(this.page).toHaveTitle(/Aqary International/i);
  }
  async assertLoginSuccess() {
    // await expect(this.page).toHaveTitle(/Dashboard|Aqary/i);
    await expect(this.page).toHaveURL("/en/dashboard");
  }
  async assertInvalidLogin() {
    await expect(
      this.page
        .getByRole("alert")
        .filter({ hasText: CredentialsPage.ValidationMessages.invalidCreds })
    ).toBeVisible({ timeout: 3000 });
  }
}
