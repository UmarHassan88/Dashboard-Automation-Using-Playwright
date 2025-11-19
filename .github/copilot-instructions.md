**Big Picture**
- **Test Framework:** This repository contains Playwright end-to-end tests located under `dashboard-project/tests`. Tests use `@playwright/test` and Playwright's test runner (see `dashboard-project/playwright.config.js`).
- **Project layout:**
  - `dashboard-project/tests/` — all spec files organized into feature folders (e.g. `GeneralSettings`, `SettingsAccount`, `ExternalAccount`).
  - `dashboard-project/tests/utils/helpers.js` — common helper functions (login flow, navigation helpers, dropdown helpers, generators).
  - `dashboard-project/.github/workflows/playwright.yml` — CI workflow that installs dependencies, Playwright browsers and runs `npx playwright test`.

**Key Workflows & Commands**
- **Run all tests locally:** from `dashboard-project` run `npx playwright test` (no `scripts` are defined in `package.json`).
- **Run a single spec:** `npx playwright test tests/GeneralSettings/State/CreateState.spec.js`.
- **Install deps / browsers (local / CI):** `npm ci` then `npx playwright install --with-deps`.
- **Open HTML report:** after a run, open `dashboard-project/playwright-report/index.html` (reporter configured in `playwright.config.js`).

**Project-specific Patterns & Conventions**
- **Numeric prefixes in filenames:** many specs use numeric prefixes to indicate ordering (e.g. `1_CreateAccountIndividual.spec.js`). Preserve these prefixes when adding related tests.
- **Helpers-first approach:** tests import and call functions from `tests/utils/helpers.js` (e.g. `Login`, `tillSettings`, `tillGeneralSettings`). Prefer updating/adding helpers rather than duplicating navigation logic in each spec.
- **Selectors by role + exact text:** tests overwhelmingly use `page.getByRole(...)` and `getByText(...)` with literal labels (for example `page.getByRole('button', { name: 'Log in' })`). When changing UI text or labels, update tests that rely on them.
- **Hard-coded base URL & credentials:** `tests/utils/helpers.js` currently navigates to `http://192.168.1.193:3000/en/login` and contains literal user/password values. Expect tests to assume this local/staging host — changing to a `baseURL` or env-driven host requires coordinated updates across helpers and tests.
- **Fragile selectors exist:** helpers use patterns like `.filter({ hasText: /^$/ }).nth(5)` to find profile icons. Prefer introducing clearer hooks or data attributes in the app if possible; otherwise be careful when refactoring these selectors.

**CI Integration Notes**
- The workflow `dashboard-project/.github/workflows/playwright.yml` runs on pushes/PRs to `main`/`master`. It executes:
  - `npm ci`
  - `npx playwright install --with-deps`
  - `npx playwright test`
- The workflow uploads `playwright-report/` as an artifact. Keep any cross-test changes compatible with CI (e.g. avoid requiring a GUI-only dependency).

**How AI agents should edit tests here**
- **When adding a new test:**
  - Place it under `dashboard-project/tests/<feature>`.
  - Follow existing naming and numeric prefix conventions.
  - Reuse helpers from `tests/utils/helpers.js` for login and navigation.
  - Use `page.getByRole`/`getByText` style selectors to match existing tests.
- **When changing navigation / login behavior:** update `tests/utils/helpers.js` first and then update dependent specs.
- **When introducing environment-driven URLs:** add `baseURL` to `dashboard-project/playwright.config.js` and replace hardcoded URLs in `helpers.js`. Update CI if it needs to pass environment variables.

**Files to inspect for examples**
- `dashboard-project/tests/utils/helpers.js` — canonical helper implementations and examples of selectors.
- `dashboard-project/playwright.config.js` — runner settings: `testDir`, `trace: 'on-first-retry'`, reporter `html`, projects definitions.
- `dashboard-project/.github/workflows/playwright.yml` — exact CI commands and artifact handling.

**Do / Don't (concrete)**
- **Do:** Reuse `helpers.js` navigation functions; keep `getByRole` selectors consistent; run `npx playwright test` locally to verify changes.
- **Don't:** Replace many tests at once without validating in CI; remove numeric prefixes or rename tests without updating references.

If any section is unclear or you'd like more detail (e.g., example test template, suggested `package.json` scripts, or a recommended `.env` pattern), tell me which part to expand and I'll iterate.
