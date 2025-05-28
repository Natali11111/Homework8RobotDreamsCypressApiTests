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

Cypress.Commands.add('sendRequest', (endpoint, method, body = null) => {
    cy.request({
        url: endpoint,
        method: method,
        headers: {
            Authorization: 'pk_200450570_VYZ446IXI5CHUBKP6N5OCPPTUS5NRF9T',
            'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
        body: body,
    });
});

Cypress.Commands.add('sendRequestWithoutAuthorization', (endpoint, method, body = null, token) => {
    cy.request({
        url: endpoint,
        method: method,
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
        body: body,
    });
});