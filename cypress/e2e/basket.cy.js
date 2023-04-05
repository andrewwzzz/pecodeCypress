describe('Add items to basket', () => {
    let category;
    let randomIndex;
    let randomCategory;
    let prodId1;
    let prodPrice1;
    let prodId2;
    let prodPrice2;

    it('should add items to basket', () => {
        cy.visit('/')
        // Url Verification
        cy.url().should('eq', Cypress.config('baseUrl'));
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
            //Verify product in the basked by id
            cy.getProductById(prodId1).should('exist')
            //Verify basket price with the "shelf" price
            cy.priceVerify(prodId1, prodPrice1)
        })
        cy.closeShoppingCart()
        cy.goToCategory(randomCategory)
        cy.get('li[data-id]').then((items) => {
            // Select a random item from the items
            const randomIndex = Math.floor(Math.random() * items.length)
            const selectedItem = items[randomIndex]

            prodId2 = selectedItem.getAttribute('data-id')
            prodPrice2 = selectedItem.getAttribute('data-price')
            selectedItem.querySelector('.button.buy').click()
            //Verify product in the basked by id
            cy.getProductById(prodId1).should('exist')
            //Verify basket price with the "shelf" price
            cy.priceVerify(prodId2, prodPrice2)
            //Verify total basket price
            cy.checkTotalPrice(prodPrice1, prodPrice2)
            cy.getProductById(prodId2)
            cy.getProductById(prodId2).find('div.product__button-remove').should('be.visible').click()
            //Verify product was deleted
            cy.getProductById(prodId2).should('not.exist')
        });
    });
});