# Part 2 — Test Automation (CodeceptJS + Playwright)

This folder contains the fixes and extensions requested in **Part 2** of the QA Automation Engineer take‑home assessment.

---

## Tech stack

- **CodeceptJS** (Gherkin runner)
- **Playwright** (browser automation)

---

## Prerequisites

- Admin rights to install Node.js and npm globally (as requested in the instructions)
- Node.js and npm installed and available in the terminal:
  ```bash
  node -v
  npm -v
  ```

---

## Setup

From the repository root:

```bash
npm install
```

> Note: `npm install` may report vulnerabilities via `npm audit`. This assessment focuses on test maintenance/implementation rather than dependency patching.

---

## Run the requested scenarios

### Important (PowerShell)
In **PowerShell**, `@tag` can be interpreted by the shell. Always pass the tag **after `--`**:

```powershell
npm run test -- "@noResult"
npm run test -- "@atLeastOneResult"
npm run test -- "@linksAndPages"
```

### Alternative (direct CodeceptJS)
```bash
npx codeceptjs run --steps --verbose --grep "@noResult"
```

---

## What was done

### 1a — Maintain a test (`@noResult`)
**Problem:** The search input selector used by the existing test was outdated (element not found), and the search interaction was not reliably triggered.

**Fix:**
- Updated the search input locator to a **more resilient selector strategy** (based on input type/attributes and visible UI patterns).
- Triggered the search explicitly (e.g., **Enter key**).
- Made the **no-result assertion** robust by normalizing whitespace / line breaks before checking the expected content.

**Command:**
```powershell
npm run test -- "@noResult"
```

---

### 1b — Implement a missing step (`@atLeastOneResult`)
**Problem:** The scenario was partially implemented and missing the final step definition.

**Fix:**
- Implemented the missing step definition.
- Added a robust check ensuring **at least one search result** is displayed using stable UI signals from the results list.

**Command:**
```powershell
npm run test -- "@atLeastOneResult"
```

---

### Extend existing tests — Footer links (`@linksAndPages`)
**Problem:** The footer test relied on a fragile DOM structure and a “non‑standard” implementation approach.

**Fix:**
- Reviewed and adjusted the implementation to be less brittle.
- Extended the Scenario Outline to include the new footer item:
  - **“Respect de la vie privée”**
- Updated expected content checks to match the current destination page content.

**Command:**
```powershell
npm run test -- "@linksAndPages"
```

---

## Files touched (high level)

- `features/front-end/offer-search.feature`
- `step_definitions/offer-search-steps.ts`
- `fragments/offer-search-fragment.ts`
- `features/front-end/footer.feature`
- `fragments/footer-fragment.ts`

---

## Design notes (why these choices)

- **Prefer UI state assertions over network URL assertions** when possible: UI changes less often than internal endpoints.
- **Normalize text** before asserting: avoids failures due to line breaks or typographic apostrophes.
- **Use stable UI anchors** (e.g., common visible labels / semantic input type) to reduce selector brittleness.

---

## Troubleshooting

### `error: option '--grep <pattern>' argument missing`
This happens when the tag is not passed correctly to the script. Use:

```powershell
npm run test -- "@noResult"
```

### Element not found
- Ensure cookies banner is dismissed.
- Re-run with:
  ```bash
  npx codeceptjs run --steps --verbose --grep "@noResult"
  ```
  Then inspect the failing step and screenshot under `output/`.


---

## Author
Tarek Sebri
