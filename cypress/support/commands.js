/// <reference types="cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('goToCategory', (category) => {
    cy.get(`a[href="${category}"].menu-list__link`).click();
});
Cypress.Commands.add('getProductById', (productId) => {
    cy.get(`[data-id^="${productId}_"]`)
});
Cypress.Commands.add('closeShoppingCart', () => {
    cy.get('.popup__window > .popup-close').click()
});
Cypress.Commands.add('findProductPrice', () => {
    cy.find('.product__price').invoke('text')
});
Cypress.Commands.add('priceVerify', (prodId, prodPrice) => {
    cy.getProductById(prodId).find('.product__price').invoke('text').then((text) => {
        const baskprice = parseInt(text.replace(/[^\d]/g, ''))
        expect(baskprice).to.eq(parseInt(prodPrice))
    });
});

Cypress.Commands.add('checkTotalPrice', (prodPrice1, prodPrice2 = 0) => {
    cy.get('div.total strong').invoke('text').then((text) => {
        const total = parseInt(text.replace(/\D/g, ''));
        expect(total).to.eq(parseInt(prodPrice2) + parseInt(prodPrice1))
    })
});

Cypress.Commands.add('searchField', (brand) => {
    cy.get('#search-input').type(brand + "{enter}");
});

Cypress.Commands.add('verifyBrand', (brand) => {
    cy.get('.catalog-products li[data-id]').filter(':visible').each(($el) => {
        const text = $el.text().toLowerCase()
        expect(text).to.contain(brand.toLowerCase())
    })
});

Cypress.Commands.add('selectCheckboxById', (id) => {
    cy.get(`#input-checkbox-${id}`).scrollIntoView().should('be.visible').click()
});

Cypress.Commands.add('enterLowerPrice', (price) => {
    cy.get('input#price-from').scrollIntoView().should('be.visible').clear().type(price);
});

Cypress.Commands.add('enterUpperPrice', (price) => {
    cy.get('input#price-to').scrollIntoView().should('be.visible').clear().type(price);
});

Cypress.Commands.add('interceptFilterRequest', () => {
    cy.intercept('POST', '**/ajax/filter/**').as("fromToFilter");
    cy.wait("@fromToFilter");
});

Cypress.Commands.add('verifyPriceRange', (minPrice, maxPrice) => {
    cy.get('li[data-price]').filter(':visible').each(($el) => {
        const price = parseFloat($el.attr('data-price'))
        expect(price).to.be.within(minPrice, maxPrice) 
    });
});

Cypress.Commands.add('increaseQuantity', (prodId) => {
    cy.getProductById(prodId).find('.product__button-increase').click()
});
Cypress.Commands.add('increaseQuantityXtimes', (prodId1) => {
let q = Math.floor(Math.random() * 5)
    for(let n = 0; n < q; n ++){
        cy.increaseQuantity(prodId1)
    }
});

Cypress.Commands.add('productQuantity', (prodId) => {
    cy.getProductById(prodId).get('input[name="count[]"]').invoke('attr', 'value').then((value) => {
    });

});
Cypress.Commands.add('interceptQuantityUpdate', () => {
    cy.intercept('PATCH', 'https://makeup.com.ua/ajax/cart/').as("quantityUpdate");
    cy.wait("@quantityUpdate");
});