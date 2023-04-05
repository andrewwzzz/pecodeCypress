describe('Change items quantity inside the pasket', () => {
    let category;
    let randomIndex;
    let randomCategory;
    let prodId1;
    let prodPrice1;

    it('should calculate price after increasing quantity inside a cart', () => {
        cy.visit('/')
        // Url Verification
        cy.url().should('eq', Cypress.config('baseUrl'));
        //Go to random category
        category = Cypress.config('categories')
        randomIndex = Math.floor(Math.random() * category.length)
        randomCategory = category[randomIndex]
        cy.goToCategory(randomCategory)
        cy.get('li[data-id]').then((items) => {
            // Select a random item from the items
            const randomIndex = Math.floor(Math.random() * items.length)
            const selectedItem = items[randomIndex]

            prodId1 = selectedItem.getAttribute('data-id')
            prodPrice1 = selectedItem.getAttribute('data-price')
            selectedItem.querySelector('.button.buy').click()
            //Verify product in the basket by id
            cy.getProductById(prodId1).should('exist')
            cy.priceVerify(prodId1, prodPrice1)
            cy.increaseQuantity(prodId1)
            //I know it's terrible, it just won't work any other way
            cy.wait(1000)
            cy.checkTotalPrice(prodPrice1 * 2)
        })
    });
});
