describe("Phone Number Validator end2end test", () => {
  const validPhoneNumberWithCode = "233206909127";
  const validPhoneNumberWithoutCode = "0206909127";
  const invalidPhoneNumber = "12345678";
  const invalidPhoneNumber2 = "0913423423320690";
  const countrySearchName = "gha";
  const countryName = "Ghana";

  beforeEach(() => {
    cy.visit("/");
  });
  it("Visits the initial project page", () => {
    cy.visit("/");
    cy.contains("Phone Number Validator");
  });

  it("Should enter incorrect number and button remain disabled ", () => {
    cy.get('input[formControlName="number"]').type(invalidPhoneNumber);
    cy.get(":button").first().should("be.disabled");
  });

  it("Should enter correct number and button be enabled ", () => {
    cy.get('input[formControlName="number"]').type(validPhoneNumberWithCode);
    cy.get(":button").first().should("be.enabled");
  });

  it("Should search for country  and country name should be returned ", () => {
    cy.get('mat-select[formControlName="country_code"]').click();
    cy.get('input[name="searchCountry"]').type(countrySearchName);
    cy.get("mat-option").last().contains(countryName);
  });

  it("Should search for country  and enter phone number ", () => {
    //  cy.get('input[name="searchCountry"]').type("gha");
    cy.get('mat-select[formControlName="country_code"]').click();
    cy.get('input[name="searchCountry"]').type(countrySearchName);
    cy.get("mat-option").last().click();
    cy.get('input[formControlName="number"]').type(validPhoneNumberWithoutCode);
    cy.get(":button").first().should("be.enabled");
  });

  it("Should search for country , enter a valid phone number, submit and get valid data", () => {
    cy.get('mat-select[formControlName="country_code"]').click();
    cy.get('input[name="searchCountry"]').type(countrySearchName);
    cy.get("mat-option").last().click();
    cy.get('input[formControlName="number"]').type(validPhoneNumberWithoutCode);
    cy.get(":button").first().click();
    cy.get("#valid-number").should("be.visible");
  });

  it("Should search for country , enter a invalid phone number, submit and get invalid data", () => {
    cy.get('input[formControlName="number"]').type(invalidPhoneNumber2);
    cy.get(":button").first().click();
    cy.get("#invalid-number").should("be.visible");
  });
});
