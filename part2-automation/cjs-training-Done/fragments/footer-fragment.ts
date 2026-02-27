const { I, homePage } = inject();

class FooterFragment {
  public async goToFooterLink(dataTable: any, state: any): Promise<void> {
    const rows = dataTable.parse().hashes();

    for (let i = 0; i < rows.length; i++) {
      const { linkName, expectedDescription } = rows[i];

      state["expectedDescription" + i] = expectedDescription;

      // Scroll + click the footer link by its visible name
      const footerLink = locate("a").withText(linkName);
      await I.scrollTo(footerLink);
      await I.click(footerLink);

      // Wait for the expected content to be visible
      const snippet = String(expectedDescription).slice(0, 25);
      await I.waitForText(snippet, 20);

      // Grab body text (robust) and store it
      state["currentDescription" + i] = await I.grabTextFrom("body");

      // Return to main page for next iteration
      await homePage.goToMainPage();
    }
  }

  public validateContent(state: any, current: string, expected: string): void {
    let i = 0;
    while (state[current + i] != undefined) {
      const normalizedCurrent = String(state[current + i])
        .replace(/\n/g, " ")
        .replace(/ +/g, " ")
        .trim();

      // Use contain (not strict equal) to avoid brittle exact-text matching
      I.assertContain(normalizedCurrent, state[expected + i]);
      i++;
    }
  }
}

export = new FooterFragment();