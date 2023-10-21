describe("Auth0", () => {
    beforeEach(() => {
        cy.loginToAuth0(
            Cypress.env('auth0_username'),
            Cypress.env('auth0_password')
        )    
    })

    it("logs in", () => {
        cy.visit("/");
    });

});
