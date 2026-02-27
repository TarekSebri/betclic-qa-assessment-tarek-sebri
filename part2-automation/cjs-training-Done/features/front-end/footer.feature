@footer @ui
Feature: Footer
  In order to provide some mandatory information to the user in the footer
  As a user
  I want to see footer mandatory elements and access to the pages and their content

  @linksAndPages
  Scenario: Links and pages content by ui
    Given a user coming to Betclic
    When the user goes to the link in footer
      | item              | linkName                          | expectedDescription                     |
      | responsibleGaming | Jeu responsable                   | Le guide Betclic du Jeu responsable     |
      | termsAndConditions| Conditions générales d'utilisation | Conditions générales d'utilisation      |
      | privacyPolicy | Respect de la vie privée | POLITIQUE VIE PRIVÉE ET COOKIES |
    Then the user should see text content in the page
