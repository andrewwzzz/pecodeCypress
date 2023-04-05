describe('Search the item', () => {
  let cosmeticsBrands = Cypress.config('cosmeticsBrands')

  it('should search item by name', () => {
    cy.visit('/')
    // Url Verification
    cy.url().should('eq', Cypress.config('baseUrl'));
    let randomBrand = cosmeticsBrands[Math.floor(Math.random() * cosmeticsBrands.length)];
    cy.searchField(randomBrand);
    cy.verifyBrand(randomBrand);
  });
});