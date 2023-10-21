describe("Loading the home page", () => {
    beforeEach(() => {
        cy.loginToAuth0(
            Cypress.env("auth0_username"),
            Cypress.env("auth0_password")
        );
        cy.intercept("POST", "http://18.191.60.138:4000/api/v1/cart").as(
            "cartRequest"
        );
        cy.visit("/");
        cy.wait("@cartRequest");
    });

    it("should load and display content", () => {
        cy.visit("/");
        cy.get("#ad-container").should("be.visible");
        cy.get("#product-list-container").should("be.visible");
        cy.get("#product-preview-container");
        cy.get("h1").contains("XX99 MARK II HEADPHONES"); // Change as needed
        cy.get("button").contains("SEE PRODUCT");
    });
});

describe(
    "tests the tablet/mobile frontend navbar routing",
    {
        viewportWidth: 412,
        viewportHeight: 892,
    },
    () => {
        beforeEach(() => {
            cy.loginToAuth0(
                Cypress.env("auth0_username"),
                Cypress.env("auth0_password")
            );
            cy.intercept("POST", "http://18.191.60.138:4000/api/v1/cart").as(
                "cartRequest"
            );
            cy.visit("/");
            cy.wait("@cartRequest");
        });

        it("should open the hamburger menu", () => {
            cy.get("#hamburger-menu").click();
            cy.get("#headphone-card").should("be.visible");
            cy.get("#speaker-card").should("be.visible");
            cy.get("#earphone-card").should("be.visible");
        });

        it("should open the headphone page", () => {
            cy.get("#hamburger-menu").click();
            cy.get("#headphone-card").click();
            cy.url().should("include", "/products/headphones");
        });

        it("should open the speaker page", () => {
            cy.get("#hamburger-menu").click();
            cy.get("#speaker-card").click();
            cy.url().should("include", "/products/speakers");
        });

        it("should open the earphone page", () => {
            cy.get("#hamburger-menu").click();
            cy.get("#earphone-card").click();
            cy.url().should("include", "/products/earphones");
        });
    }
);

describe(
    "tests the tablet/mobile frontend footer routing",
    {
        viewportWidth: 412,
        viewportHeight: 892,
    },
    () => {
        beforeEach(() => {
            cy.loginToAuth0(
                Cypress.env("auth0_username"),
                Cypress.env("auth0_password")
            );
            cy.intercept("POST", "http://18.191.60.138:4000/api/v1/cart").as(
                "cartRequest"
            );
            cy.visit("/");
            cy.wait("@cartRequest");
        });

        it("should open the home page", () => {
            cy.get("#mobile-home-footer-link").click();
            cy.url().should("include", "/");
        });

        it("should open the headphone page", () => {
            cy.get("#mobile-headphone-footer-link").click();
            cy.url().should("include", "/products/headphones");
        });

        it("should open the speaker page", () => {
            cy.get("#mobile-speaker-footer-link").click();
            cy.url().should("include", "/products/speakers");
        });

        it("should open the earphone page", () => {
            cy.get("#mobile-earphone-footer-link").click();
            cy.url().should("include", "/products/earphones");
        });
    }
);

describe("tests the desktop frontend footer routing", () => {
    beforeEach(() => {
        cy.loginToAuth0(
            Cypress.env("auth0_username"),
            Cypress.env("auth0_password")
        );
        cy.intercept("POST", "http://18.191.60.138:4000/api/v1/cart").as(
            "cartRequest"
        );
        cy.visit("/");
        cy.wait("@cartRequest");
    });

    it("should open the home page", () => {
        cy.get("#home-footer-link").click();
        cy.url().should("include", "/");
    });

    it("should open the headphone page", () => {
        cy.get("#headphone-footer-link").click();
        cy.url().should("include", "/products/headphones");
    });

    it("should open the speaker page", () => {
        cy.get("#speaker-footer-link").click();
        cy.url().should("include", "/products/speakers");
    });

    it("should open the earphone page", () => {
        cy.get("#earphone-footer-link").click();
        cy.url().should("include", "/products/earphones");
    });
});
