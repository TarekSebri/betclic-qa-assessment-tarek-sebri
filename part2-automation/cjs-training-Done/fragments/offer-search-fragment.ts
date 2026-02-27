const { I } = inject();

class OfferSearchFragment {
  // More robust locator than the legacy "#forms_inputText"
  // Works even if the exact id changes, as long as the placeholder/type is consistent.
  private searchInput =
    "//input[@type='search' " +
    "or contains(@placeholder,'Joueur') " +
    "or contains(@placeholder,'équipe') " +
    "or contains(@placeholder,'compétition') " +
    "or contains(@aria-label,'Joueur') " +
    "or contains(@id,'search') " +
    "or contains(@name,'search')]";

  // Kept from original code (still useful if the web component exists)
  private searchResults = "//sports-search-page";

  // Old “no result” locators were based on internal classes and can be brittle.
  // We'll assert by expected texts instead.
  private noResultContainer = "//div[contains(@class,'errorPage_content') or contains(@class,'errorPage')]";

  public async typeInTheSearch(input: string): Promise<void> {
    await I.waitForElement(this.searchInput, 20);
    await I.click(this.searchInput);
    await I.fillField(this.searchInput, input);

    // Trigger the search explicitly (UI often needs Enter)
    await I.pressKey("Enter");

    // Wait for either results page or no-result container (do not rely only on network)
    try {
      await I.waitForElement(this.searchResults, 10);
    } catch (e) {
      await I.waitForElement(this.noResultContainer, 10);
    }
  }

  public async validateNoContent(dataTable: any): Promise<void> {
    const row = dataTable.parse().hashes()[0];
    const expectedTitle = row.expectedTitle;
    const expectedDescription = row.expectedDescription;

    await I.waitForText(expectedTitle, 20);

    const pageText = await I.grabTextFrom("body");

    const norm = (s: string) =>
      String(s || "")
        .replace(/\s+/g, " ")
        .replace(/[’]/g, "'")
        .trim();

    I.assertContain(norm(pageText), norm(expectedTitle));
    I.assertContain(norm(pageText), norm(expectedDescription));
  }

  public async validateAtLeastOneResult(): Promise<void> {
    await I.waitForElement(this.searchResults, 20);

    // Must NOT be the "no result" state
    await I.dontSee("Pas de résultat");

    // When results exist, odds buttons are displayed (French decimals with comma)
    const oddsButton = "//sports-search-page//button[contains(normalize-space(.), ',')]";
    await I.waitForElement(oddsButton, 15);

    // Optional: ensure we have at least one
    const n = await I.grabNumberOfVisibleElements(oddsButton);
    if (n < 1) {
      throw new Error("Expected at least one visible odds button in search results, but found none.");
    }
  }
}

export = new OfferSearchFragment();