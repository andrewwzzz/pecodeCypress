describe('Verify if the price filter working correctly for the following marketplaces', () => {

  it('should filter items by price', () => {
    const lowerPrice = 500;
    const upperPrice = 1000;
    cy.visit('/')
    // Url Verification
    cy.url().should('eq', Cypress.config('baseUrl'));
    let category = Cypress.config('categories')
    let randomIndex = Math.floor(Math.random() * category.length)
    let randomCategory = category[randomIndex]
    cy.goToCategory(randomCategory)
    cy.selectCheckboxById('2259-22435');
    cy.selectCheckboxById('637811-1358811');
    cy.enterLowerPrice(lowerPrice);
    cy.enterUpperPrice(upperPrice);
    cy.interceptFilterRequest();
    cy.verifyPriceRange(lowerPrice, upperPrice);
  });
}); 