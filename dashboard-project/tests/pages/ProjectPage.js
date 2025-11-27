import { expect } from "@playwright/test";

export class ProjectsPage {
  constructor(page) {
    this.page = page;
    this.lastReadyProjectName = null;
    this.lastOffplanProjectName = null;
    this.lastMultiphaseProjectName = null;
  }

  // ---------- High-level flows ----------
  async addProjectReady() {
    const name = this._randomProjectName();
    this.lastReadyProjectName = name;
    const licenseNumber = this._randomNumber(1, 999999999).toString();
    const projectNumber = this._randomNumber(1, 999999999).toString();
    const startingPrice = this._randomNumber(1, 9999999).toString();

    await this.page.getByRole("button", { name: "Projects" }).click();
    await this.page.getByRole("button", { name: "Add Project" }).click();

    await this.page.fill('input[name="project_name"]', name);
    await this.page.fill('input[name="license_no"]', licenseNumber);
    await this.page.fill('input[name="project_no"]', projectNumber);
    await this.page.fill('input[name="starting_price"]', startingPrice);
    await this.page
      .getByRole("combobox", { name: "Enter developer company" })
      .click();
    await this.page.locator('ul[role="listbox"] >> li').nth(0).click();

    await this._locationRandom();
    await this.page.evaluate(() => window.scrollBy(0, 250));
    await this._drawPolygonOnMap();
    await this._readyDetails();
    await this._writeDescription();
    await this._facilities();
    await this._amenities();
    await this.page.getByRole("button", { name: "submit" }).click();
  }

  async addProjectOffplan() {
    const name = this._randomProjectName();
    this.lastOffplanProjectName = name;
    const licenseNumber = this._randomNumber(1, 999999999).toString();
    const projectNumber = this._randomNumber(1, 999999999).toString();
    const startingPrice = this._randomNumber(1, 9999999).toString();

    await this.page.getByRole("button", { name: "Projects" }).click();
    await this.page.getByRole("button", { name: "Add Project" }).click();

    await this.page.fill('input[name="project_name"]', name);
    await this.page.fill('input[name="license_no"]', licenseNumber);
    await this.page.fill('input[name="project_no"]', projectNumber);
    await this.page.fill('input[name="starting_price"]', startingPrice);
    await this.page
      .locator('input[placeholder="Enter developer company"]')
      .click();
    await this.page.locator('ul[role="listbox"] >> li').nth(0).click();

    await this._locationRandom();
    await this.page.evaluate(() => window.scrollBy(0, 250));
    await this._drawPolygonOnMap();
    await this._projectDetails();
    await this._writeDescription();
    await this._facilities();
    await this._amenities();
    await this.page.getByRole("button", { name: "submit" }).click();
  }

  async addProjectMultiphase() {
    const name = this._randomProjectName();
    this.lastMultiphaseProjectName = name;
    const licenseNumber = this._randomNumber(1, 999999999).toString();
    const projectNumber = this._randomNumber(1, 999999999).toString();
    const startingPrice = this._randomNumber(1, 9999999).toString();

    await this.page.getByRole("button", { name: "Projects" }).click();
    await this.page.getByRole("button", { name: "Add Project" }).click();

    await this.page.fill('input[name="project_name"]', name);
    await this.page.fill('input[name="license_no"]', licenseNumber);
    await this.page.fill('input[name="project_no"]', projectNumber);
    await this.page.fill('input[name="starting_price"]', startingPrice);
    await this.page
      .locator('input[placeholder="Enter developer company"]')
      .click();
    await this.page.locator('ul[role="listbox"] >> li').nth(0).click();
    await this.page.getByRole("checkbox").click();

    await this._locationRandom();
    await this.page.evaluate(() => window.scrollBy(0, 250));
    await this._drawPolygonOnMap();
    await this.page.locator('input[placeholder="Select Life Style"]').click();
    await this.page
      .locator('ul[role="listbox"] >> li')
      .nth(this._randomNumber(0, 1))
      .click();
    await this.page.locator('input[name="start_date"]').fill("01/01/2025");
    await this.page.evaluate(() => window.scrollBy(0, 350));
    await this._writeDescription();
    await this._facilities();
    await this.page.getByRole("button", { name: "submit" }).click();
  }

  async addReadyProjectProperty() {
    if (!this.lastReadyProjectName)
      throw new Error("No ready project name set");
    await this._openProjectSecondaryActions(
      this.lastReadyProjectName,
      "Listing Properties"
    );
    await this.page.getByRole("button", { name: "Add Property" }).click();

    const projectName = await this.page
      .locator('input[name="project_name"]')
      .inputValue();
    const propName = `${projectName} Properties`;
    await this.page.getByPlaceholder("Enter property name").fill(propName);

    this.page.setDefaultTimeout(5000);
    await this._clickCenterMap();

    await this.page.getByPlaceholder("Select Property type").click();
    const indices = [0, 1, 3, 4, 5, 6, 9, 10, 11];
    const randomValue = indices[this._randomNumber(0, indices.length - 1)];
    const listItems = this.page.locator('ul[role="listbox"] >> li');
    const selectedOption = listItems.nth(randomValue);
    let selectedText = "";
    try {
      selectedText = await selectedOption.textContent();
    } catch {}
    await selectedOption.click();

    if (
      selectedText === "Commercial Lands" ||
      selectedText === "Mixed used lands" ||
      selectedText === "Residential Lands"
    ) {
      await this.page
        .getByPlaceholder("Enter Plot Area")
        .fill(this._randomNumber(100, 1098).toString());
      await this.page
        .getByPlaceholder("Built up Area")
        .fill(this._randomNumber(100, 1098).toString());
      await this.page
        .getByPlaceholder("Enter Min Area")
        .fill(this._randomNumber(1, 1000).toString());
      await this.page
        .getByPlaceholder("Enter Max Area")
        .fill(this._randomNumber(1000, 2499).toString());
      await this.page
        .getByPlaceholder("No of units")
        .fill(this._randomNumber(1000, 2499).toString());
      await this.page.getByText("currency").click();
      await this.page.getByRole("option", { name: "UAE Dirham AED" }).click();
      await this.page
        .getByPlaceholder("Enter service charge")
        .fill(this._randomNumber(1, 1000).toString());
      await this.page.getByText("measure", { exact: true }).click();
      await this.page.getByRole("option", { name: "sqft" }).click();
    }

    await this.page.getByPlaceholder("Select Unit type").click();
    await this.page.locator('ul[role="listbox"] >> li').nth(0).click();

    if (
      await this.page.getByRole("combobox", { name: "Furnished" }).isVisible()
    ) {
      await this.page.getByRole("combobox", { name: "Furnished" }).click();
      await this.page
        .locator('ul[role="listbox"] >> li')
        .nth(this._randomNumber(0, 2))
        .click();
    }

    await this._randomView();

    if (await this.page.getByPlaceholder("Enter Plot Area").isVisible()) {
      await this.page
        .getByPlaceholder("Enter Plot Area")
        .fill(this._randomNumber(500, 1499).toString());
    }
    if (await this.page.getByPlaceholder("Built up Area").isVisible()) {
      await this.page
        .getByPlaceholder("Built up Area")
        .fill(this._randomNumber(1, 499).toString());
    }
    await this.page
      .getByPlaceholder("Enter Min Area")
      .fill(this._randomNumber(1, 1000).toString());
    await this.page
      .getByPlaceholder("Enter Max Area")
      .fill(this._randomNumber(1000, 2499).toString());
    await this.page
      .getByPlaceholder("No of units")
      .fill(this._randomNumber(1, 100).toString());
    if (await this.page.getByPlaceholder("No of floor").isVisible()) {
      await this.page
        .getByPlaceholder("No of floor")
        .fill(this._randomNumber(1, 100).toString());
    }
    if (await this.page.getByPlaceholder("Enter number of pools").isVisible()) {
      await this.page
        .getByPlaceholder("Enter number of pools")
        .fill(this._randomNumber(1, 100).toString());
    }
    if (await this.page.getByPlaceholder("No of elevator").isVisible()) {
      await this.page
        .getByPlaceholder("No of elevator")
        .fill(this._randomNumber(1, 100).toString());
    }
    if (
      await this.page.getByPlaceholder("Enter no of retail centers").isVisible()
    ) {
      await this.page
        .getByPlaceholder("Enter no of retail centers")
        .fill(this._randomNumber(1, 100).toString());
    }
    if (await this.page.getByPlaceholder("No. of Parking").isVisible()) {
      await this.page
        .getByPlaceholder("No. of Parking")
        .fill(this._randomNumber(1, 100).toString());
    }
    if (await this.page.getByText("currency").isVisible()) {
      await this.page.getByText("currency").click();
      await this.page.getByRole("option", { name: "UAE Dirham AED" }).click();
      await this.page
        .getByPlaceholder("Enter service charge")
        .fill(this._randomNumber(1, 1000).toString());
      await this.page.getByText("measure", { exact: true }).click();
      await this.page.getByRole("option", { name: "sqft" }).click();
    }

    await this._writeDescription();
    await this._clickRandomAmenities();

    await this.page.getByRole("button", { name: "submit" }).click();
  }

  async addOffplanPlan() {
    if (!this.lastOffplanProjectName)
      throw new Error("No offplan project name set");
    await this._openProjectSecondaryActions(
      this.lastOffplanProjectName,
      "Manage Plan"
    );
    for (let i = 0; i < 3; i++) {
      await this.page.getByRole("button", { name: "Add Plan" }).click();
      await this.page.getByPlaceholder("Select Plan Type").click();
      await this.page
        .locator('ul[role="listbox"] >> li')
        .nth(this._randomNumber(0, 2))
        .click();
      await this._uploadRandomFile();
      await this.page.getByRole("button", { name: "submit" }).click();
      await expect(
        this.page.getByText(/Created plan successfully/)
      ).toBeVisible();
    }
    await this.page
      .getByRole("link", { name: "Projects", exact: true })
      .click();
  }

  async addReadyPlan() {
    if (!this.lastReadyProjectName)
      throw new Error("No ready project name set");
    await this._openProjectSecondaryActions(
      this.lastReadyProjectName,
      "Manage Plan"
    );
    for (let i = 0; i < 3; i++) {
      await this.page.getByRole("button", { name: "Add Plan" }).click();
      await this.page.getByPlaceholder("Select Plan Type").click();
      await this.page
        .locator('ul[role="listbox"] >> li')
        .nth(this._randomNumber(0, 2))
        .click();
      await this._uploadRandomFile();
      await this.page.getByRole("button", { name: "submit" }).click();
    }
    await this.page
      .getByRole("link", { name: "Projects", exact: true })
      .click();
  }

  async addMultiphasePlan() {
    if (!this.lastMultiphaseProjectName)
      throw new Error("No multiphase project name set");
    await this._openProjectSecondaryActions(
      this.lastMultiphaseProjectName,
      "Manage Plan"
    );
    for (let i = 0; i < 3; i++) {
      await this.page.getByRole("button", { name: "Add Plan" }).click();
      await this.page.getByPlaceholder("Select Plan Type").click();
      await this.page
        .locator('ul[role="listbox"] >> li')
        .nth(this._randomNumber(0, 2))
        .click();
      await this._uploadRandomFile();
      await this.page.getByRole("button", { name: "submit" }).click();
      await expect(
        this.page.getByText(/Created plan successfully/)
      ).toBeVisible();
    }
    await this.page
      .getByRole("link", { name: "Projects", exact: true })
      .click();
  }

  async addOffplanGallery() {
    if (!this.lastOffplanProjectName)
      throw new Error("No offplan project name set");
    await this._openProjectSecondaryActions(
      this.lastOffplanProjectName,
      "Gallery"
    );
    for (let i = 0; i < 5; i++) {
      await this.page.getByRole("button", { name: "Add Gallery" }).click();
      await this.page.getByPlaceholder("Select Gallery Type").click();
      await this.page.locator('ul[role="listbox"] >> li').nth(0).click();
      await this.page.getByPlaceholder("Select Media Type").click();
      await this.page.locator('ul[role="listbox"] >> li').nth(0).click();
      await this._uploadRandomFile();
      await this.page.getByRole("button", { name: "submit" }).click();
    }
    await this.page.getByRole("link", { name: "Project gallery" }).click();
  }

  async addReadyGallery() {
    if (!this.lastReadyProjectName)
      throw new Error("No ready project name set");
    await this._openProjectSecondaryActions(
      this.lastReadyProjectName,
      "Gallery"
    );
    for (let i = 0; i < 5; i++) {
      await this.page.getByRole("button", { name: "Add Gallery" }).click();
      await this.page.getByPlaceholder("Select Gallery Type").click();
      await this.page.locator('ul[role="listbox"] >> li').nth(0).click();
      await this.page.getByPlaceholder("Select Media Type").click();
      await this.page.locator('ul[role="listbox"] >> li').nth(0).click();
      await this._uploadRandomFile();
      await this.page.getByRole("button", { name: "submit" }).click();
    }
    await this.page.getByRole("link", { name: "Project gallery" }).click();
  }

  async addMultiphaseGallery() {
    if (!this.lastMultiphaseProjectName)
      throw new Error("No multiphase project name set");
    await this._openProjectSecondaryActions(
      this.lastMultiphaseProjectName,
      "Gallery"
    );
    for (let i = 0; i < 5; i++) {
      await this.page.getByRole("button", { name: "Add Gallery" }).click();
      await this.page.getByPlaceholder("Select Gallery Type").click();
      await this.page.locator('ul[role="listbox"] >> li').nth(0).click();
      await this.page.getByPlaceholder("Select Media Type").click();
      await this.page.locator('ul[role="listbox"] >> li').nth(0).click();
      await this._uploadRandomFile();
      await this.page.getByRole("button", { name: "submit" }).click();
      await expect(this.page.getByText(/Created successfully/)).toBeVisible();
    }
    await this.page.getByRole("link", { name: "Project gallery" }).click();
  }

  // ---------- Helpers ----------
  async _openProjectSecondaryActions(projectName, menuText) {
    let menuIndex = 5; // default
    if (menuText === "Manage Plan") menuIndex = 5;
    if (menuText === "Gallery") menuIndex = 5;
    if (menuText === "Listing Properties") menuIndex = 0; // uses testid instead

    const row = this.page.getByRole("row", { name: `${projectName}` });
    if (menuText === "Listing Properties") {
      await row.getByTestId("secondary-actions").click();
    } else {
      await row.getByRole("button").nth(5).click();
    }
    await this.page
      .locator("div")
      .filter({ hasText: new RegExp(`^${menuText}$`) })
      .getByRole("link")
      .click();
  }

  async _projectDetails() {
    await this.page
      .getByRole("textbox", { name: "Enter Bank" })
      .fill("Emirates NBD");
    await this.page
      .getByRole("textbox", { name: "Enter number" })
      .fill(this._randomNumber(100000, 999999).toString());
    await this.page
      .locator('input[name="registration_date"]')
      .fill("01/01/2025");
    await this.page
      .locator('input[placeholder="Select Completion Status"]')
      .click();
    await this.page.locator('ul[role="listbox"] >> li').nth(0).click();
    await this.page.fill(
      'input[name="completion_percentage"]',
      this._randomNumber(1, 100).toString()
    );
    await this.page.locator('input[placeholder="Select Life Style"]').click();
    await this.page
      .locator('ul[role="listbox"] >> li')
      .nth(this._randomNumber(0, 1))
      .click();
    await this.page
      .locator('input[name="completion_percentage_date"]')
      .fill("01/08/2025");
    await this.page.locator('input[name="completion_date"]').fill("01/20/2025");
    await this.page.locator('input[name="handover_date"]').fill("01/31/2025");
    await this.page.locator('input[name="start_date"]').fill("01/01/2025");
    await this.page.fill(
      'input[name="plot_area"]',
      this._randomNumber(1, 1000).toString()
    );
    await this.page.fill(
      'input[name="built_up_area"]',
      this._randomNumber(1, 200).toString()
    );
    await this.page.locator('input[placeholder="Select Furnished"]').click();
    await this.page
      .locator('ul[role="listbox"] >> li')
      .nth(this._randomNumber(0, 2))
      .click();
    await this.page.fill(
      'input[name="no_of_properties"]',
      this._randomNumber(1, 150).toString()
    );
    await this.page.locator('input[placeholder="Select Ownership"]').click();
    await this.page
      .locator('ul[role="listbox"] >> li')
      .nth(this._randomNumber(0, 5))
      .click();
    await this.page.evaluate(() => window.scrollBy(0, 350));
    // await this.page.getByText("currency").click();
    // await this.page.getByRole("option", { name: "UAE Dirham AED" }).click();
    await this.page
      .getByPlaceholder("Enter service charge")
      .fill(this._randomNumber(1, 1000).toString());
    // await this.page.getByText("measure", { exact: true }).click();
    // await this.page.getByRole("option", { name: "sqft" }).click();
  }

  async _readyDetails() {
    await this.page
      .locator('input[placeholder="Select Completion Status"]')
      .click();
    await this.page.locator('ul[role="listbox"] >> li').nth(1).click();
    await this.page.locator('input[placeholder="Select Life Style"]').click();
    await this.page
      .locator('ul[role="listbox"] >> li')
      .nth(this._randomNumber(0, 1))
      .click();
    await this.page.locator('input[name="completion_date"]').fill("01/20/2025");
    await this.page.locator('input[name="handover_date"]').fill("01/31/2025");
    await this.page.locator('input[name="start_date"]').fill("01/01/2025");
    await this.page.fill(
      'input[name="plot_area"]',
      this._randomNumber(1, 1000).toString()
    );
    await this.page.fill(
      'input[name="built_up_area"]',
      this._randomNumber(1, 200).toString()
    );
    await this.page.locator('input[placeholder="Select Furnished"]').click();
    await this.page
      .locator('ul[role="listbox"] >> li')
      .nth(this._randomNumber(0, 2))
      .click();
    await this.page.fill(
      'input[name="no_of_properties"]',
      this._randomNumber(1, 150).toString()
    );
    await this.page.locator('input[placeholder="Select Ownership"]').click();
    await this.page
      .locator('ul[role="listbox"] >> li')
      .nth(this._randomNumber(0, 5))
      .click();
    await this.page.evaluate(() => window.scrollBy(0, 350));
    // await this.page.getByText("currency").click();
    // await this.page.getByRole("option", { name: "UAE Dirham AED" }).click();
    await this.page
      .getByPlaceholder("Enter service charge")
      .fill(this._randomNumber(1, 1000).toString());
    // await this.page.getByText("measure", { exact: true }).click();
    // await this.page.getByRole("option", { name: "sqft" }).click();
  }

  async _locationRandom() {
    await this.page.locator('input[placeholder="Select Country"]').click();
    await this.page.locator('ul[role="listbox"] >> li').nth(0).click();
    await this.page.locator('input[placeholder="Select State"]').click();
    await this.page.locator('ul[role="listbox"] >> li').nth(0).click();
    await this.page.locator('input[placeholder="Select City"]').click();
    await this.page.locator('ul[role="listbox"] >> li').nth(0).click();
    await this.page.locator('input[placeholder="Select Community"]').click();
    await this.page
      .locator('ul[role="listbox"] >> li')
      .nth(this._randomNumber(0, 59))
      .click();
    await this.page
      .locator('input[placeholder="Select Sub Community"]')
      .click();
    await this.page.locator('ul[role="listbox"] >> li').nth(0).click();
  }

  async _facilities() {
    const ids = this._uniqueRandoms(10, 1, 77);
    for (const id of ids) {
      try {
        await this.page.getByTestId(String(id)).click();
      } catch {}
    }
  }

  async _amenities() {
    const ids = this._uniqueRandoms(10, 78, 200);
    for (const id of ids) {
      try {
        await this.page.getByTestId(String(id)).click();
      } catch {}
    }
  }

  async _clickRandomAmenities() {
    await this.page.waitForSelector("[data-testid]", { timeout: 10000 });
    let testIds = await this.page
      .locator("[data-testid]")
      .evaluateAll((elements) =>
        elements
          .map((el) => el.getAttribute("data-testid"))
          .filter((id) => id && !isNaN(id) && id >= 77)
      );
    testIds = testIds.sort(() => Math.random() - 0.5).slice(0, 5);
    for (const testId of testIds) {
      await this.page.getByTestId(testId).click();
    }
  }

  async _randomView() {
    for (let i = 0; i < 5; i++) {
      await this.page.getByPlaceholder("Select View").click();
      await this.page
        .locator('ul[role="listbox"] >> li')
        .nth(this._randomNumber(0, 19))
        .click();
    }
  }

  async _writeDescription() {
    const phrases = [
      "Spacious and modern",
      "Located in the heart of the city",
      "Breathtaking views of the skyline",
      "Ideal for families and professionals",
      "Featuring state-of-the-art amenities",
      "Open-concept living spaces",
      "Designed for ultimate comfort and convenience",
      "Luxury finishes throughout",
    ];
    let description = "";
    while (description.length < 800) {
      const randomPhrase = phrases[this._randomNumber(0, phrases.length - 1)];
      if (description.length + randomPhrase.length + 2 <= 800) {
        description += `${randomPhrase}. `;
      } else {
        break;
      }
    }
    await this.page.fill('textarea[name="description"]', description.trim());
  }

  async _drawPolygonOnMap() {
    const mapContainer = await this.page.waitForSelector("#map", {
      state: "visible",
    });
    await mapContainer.scrollIntoViewIfNeeded();
    const polygonButton = await this.page.locator(
      "//html[1]/body[1]/div[2]/main[1]/form[1]/div[2]/div[1]/div[2]/div[1]/div[6]/div[2]/div[1]/div[3]/div[4]/button[1]"
    );
    await polygonButton.click();
    await this.page.waitForTimeout(500);

    const mapBoundingBox = await mapContainer.boundingBox();
    if (!mapBoundingBox) {
      throw new Error("Failed to retrieve map bounding box");
    }
    const { width, height, x, y } = mapBoundingBox;
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const boxWidth = 20;
    const boxHeight = 20;
    const startX = centerX - boxWidth / 2;
    const startY = centerY - boxHeight / 2;

    // await this.page.mouse.move(startX, startY);
    await this.page.mouse.click(startX, startY);
    // await this.page.waitForTimeout(300);
    // await this.page.mouse.move(startX + boxWidth, startY);
    // await this.page.mouse.click(startX + boxWidth, startY);
    // await this.page.waitForTimeout(300);
    // await this.page.mouse.move(startX + boxWidth, startY + boxHeight);
    // await this.page.mouse.click(startX + boxWidth, startY + boxHeight);
    // await this.page.waitForTimeout(300);
    // await this.page.mouse.move(startX, startY + boxHeight);
    // await this.page.mouse.click(startX, startY + boxHeight);
    // await this.page.waitForTimeout(300);
    // await this.page.mouse.move(startX, startY);
    // await this.page.mouse.click(startX, startY);
    // await this.page.waitForTimeout(300);
    // await this.page.mouse.click(startX + 1, startY + 1);
    // await this.page.waitForTimeout(300);
  }

  async _clickCenterMap() {
    await this.page
      .getByRole("button", { name: "Map camera controls" })
      .click();
    for (let i = 0; i < 3; i++) {
      await this.page.getByRole("button", { name: "Zoom in" }).click();
      await this.page.getByRole("button", { name: "Zoom in" }).click();
    }
    const mapContainer = await this.page.waitForSelector("#map", {
      state: "visible",
    });
    await this.page.waitForSelector(".leaflet-tile-loaded, .gm-style", {
      timeout: 5000,
    });
    const mapBoundingBox = await mapContainer.boundingBox();
    if (!mapBoundingBox) throw new Error("Failed to retrieve map bounding box");
    const { width, height, x, y } = mapBoundingBox;
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    await this.page.mouse.move(centerX, centerY);
    await this.page.mouse.click(centerX, centerY);
  }

  async _uploadRandomFile() {
    // Use an image committed in the repository to ensure availability
    const fileInput = await this.page.$('//input[@type="file"]');
    await fileInput.setInputFiles("dealsPage.png");
  }

  _randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _uniqueRandoms(count, min, max) {
    const ids = new Set();
    while (ids.size < count) {
      ids.add(this._randomNumber(min, max));
    }
    return Array.from(ids);
  }

  _randomProjectName() {
    const base = [
      "Burj Khalifa Residences",
      "Palm Jumeirah Villas",
      "Downtown Dubai Towers",
      "Business Bay Heights",
      "Dubai Marina Skyrise",
    ];
    return (
      base[this._randomNumber(0, base.length - 1)] +
      " " +
      this._randomNumber(100000, 999999)
    );
  }
}
