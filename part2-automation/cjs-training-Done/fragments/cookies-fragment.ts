const { I } = inject();

class CookiesFragment {
  // locators
  private rejectCookiesButton = "Continuer sans accepter";

  // methods
  public async rejectCookies(): Promise<void> {
    await I.waitForText(this.rejectCookiesButton, 30);
    await I.click(this.rejectCookiesButton);
  }
}

export = new CookiesFragment();
