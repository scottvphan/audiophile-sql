describe("Tests the cart", () => {
    beforeEach(() => {
        cy.visit("/products/details/xx99-mark-two-headphones");
        cy.get("#add-button").click();
        cy.get("button").contains("ADD TO CART").click();
    });
    it("adds item to cart", () => {
        cy.get("#cart-item-quantity-amount").contains(1);
    });

    it("removes all from cart", () => {
        cy.get("p").contains("Remove All").click();
    });

    it("views the cart summary page", () => {
        cy.get("button").contains("VIEW YOUR CART").click();
    });

    it("visits checkout", () => {
        cy.get("button").contains("VIEW YOUR CART").click();
        cy.get("button").contains("CONTINUE TO CART").click();
        cy.get("button").contains("CONFIRM PURCHASE").should("be.visible");
    });

    it("tests adds an item with the item component", () => {
        cy.get("#cart-add-button").click();
        cy.get("#cart-item-quantity-amount").contains(2);
    });

    it("removes an item with the item component", () => {
        cy.get("#cart-minus-button").click();
    });
});

describe(
    "Tests the cart in mobile view",
    {
        viewportWidth: 412,
        viewportHeight: 892,
    },
    () => {
        beforeEach(() => {
            cy.visit("/products/details/xx99-mark-two-headphones");
            cy.get("#add-button").click();
            cy.get("button").contains("ADD TO CART").click();
        });
        it("adds item to cart", () => {
            cy.get("#cart-item-quantity-amount").contains(1);
        });

        it("removes all from cart", () => {
            cy.get("p").contains("Remove All").click();
        });

        it("views the cart summary page", () => {
            cy.get("button").contains("VIEW YOUR CART").click();
        });

        it("visits checkout", () => {
            cy.get("button").contains("VIEW YOUR CART").click();
            cy.get("button").contains("CONTINUE TO CART").click();
            cy.get("button").contains("CONFIRM PURCHASE").should("be.visible");
        });

        it("tests adds an item with the item component", () => {
            cy.get("#cart-add-button").click();
            cy.get("#cart-item-quantity-amount").contains(2);
        });

        it("removes an item with the item component", () => {
            cy.get("#cart-minus-button").click();
        });
    }
);

describe("Tests the cart form using the credit form", () => {
    beforeEach(() => {
        cy.visit("/products/details/xx99-mark-two-headphones");
        cy.get("#add-button").click();
        cy.get("button").contains("ADD TO CART").click();
        cy.get("button").contains("VIEW YOUR CART").click();
        cy.get("button").contains("CONTINUE TO CART").click();
    });

    it("tests the credit form validation", () => {
        cy.get("#name").type("1");
        cy.get("#email").type("1");
        cy.get("#phone").type("1");
        cy.get("#address").type("1");
        cy.get("#zipcode").type("1");
        cy.get("#city").type("1");
        cy.get("#state").type("1");
        cy.get("#country").type("1");
        cy.get("#eMoneyNumber").type("1");
        cy.get("#eMoneyPin").type("1");
        cy.get("button").contains("CONFIRM PURCHASE").click();
        cy.get("#name-error").should("be.visible");
        cy.get("#email-error").should("be.visible");
        cy.get("#phone-error").should("be.visible");
        cy.get("#address-error").should("be.visible");
        cy.get("#zipcode-error").should("be.visible");
        cy.get("#city-error").should("be.visible");
        cy.get("#state-error").should("be.visible");
        cy.get("#country-error").should("be.visible");
        cy.get("#emoney-error").should("be.visible");
        cy.get("#epin-error").should("be.visible");
    });

    it("submits a valid credit form with an invalid address", () => {
        cy.get("#name").type("Some Name");
        cy.get("#email").type("idk123@gmail.com");
        cy.get("#phone").type("1111111111");
        cy.get("#address").type("111 Beach Ave");
        cy.get("#zipcode").type("11111");
        cy.get("#city").type("Philadelphia");
        cy.get("#state").type("PA");
        cy.get("#country").type("US");
        cy.get("#eMoneyNumber").type("1111111111111111");
        cy.get("#eMoneyPin").type("111");
        cy.get("button").contains("CONFIRM PURCHASE").click();
        cy.url().should("include", "/confirmation");
        cy.get("button").contains("GO BACK").should("be.visible");
    });
    it("submits a valid credit form with a valid address", () => {
        cy.get("#name").type("Some Name");
        cy.get("#email").type("idk123@gmail.com");
        cy.get("#phone").type("1111111111");
        cy.get("#address").type("949 Edwards Dr");
        cy.get("#zipcode").type("19064");
        cy.get("#city").type("Springfield");
        cy.get("#state").type("PA");
        cy.get("#country").type("US");
        cy.get("#eMoneyNumber").type("1111111111111111");
        cy.get("#eMoneyPin").type("111");
        cy.get("button").contains("CONFIRM PURCHASE").click();
        cy.url().should("include", "/confirmation");
        cy.get("button").contains("GO BACK").should("not.exist");
    });
});

describe(
    "Tests the cart form using the credit form in mobile view",
    {
        viewportWidth: 412,
        viewportHeight: 892,
    },
    () => {
        beforeEach(() => {
            cy.visit("/products/details/xx99-mark-two-headphones");
            cy.get("#add-button").click();
            cy.get("button").contains("ADD TO CART").click();
            cy.get("button").contains("VIEW YOUR CART").click();
            cy.get("button").contains("CONTINUE TO CART").click();
        });

        it("tests the credit form validation", () => {
            cy.get("#name").type("1");
            cy.get("#email").type("1");
            cy.get("#phone").type("1");
            cy.get("#address").type("1");
            cy.get("#zipcode").type("1");
            cy.get("#city").type("1");
            cy.get("#state").type("1");
            cy.get("#country").type("1");
            cy.get("#eMoneyNumber").type("1");
            cy.get("#eMoneyPin").type("1");
            cy.get("button").contains("CONFIRM PURCHASE").click();
            cy.get("#name-error").should("be.visible");
            cy.get("#email-error").should("be.visible");
            cy.get("#phone-error").should("be.visible");
            cy.get("#address-error").should("be.visible");
            cy.get("#zipcode-error").should("be.visible");
            cy.get("#city-error").should("be.visible");
            cy.get("#state-error").should("be.visible");
            cy.get("#country-error").should("be.visible");
            cy.get("#emoney-error").should("be.visible");
            cy.get("#epin-error").should("be.visible");
        });

        it("submits a valid credit form with an invalid address", () => {
            cy.get("#name").type("Some Name");
            cy.get("#email").type("idk123@gmail.com");
            cy.get("#phone").type("1111111111");
            cy.get("#address").type("111 Beach Ave");
            cy.get("#zipcode").type("11111");
            cy.get("#city").type("Philadelphia");
            cy.get("#state").type("PA");
            cy.get("#country").type("US");
            cy.get("#eMoneyNumber").type("1111111111111111");
            cy.get("#eMoneyPin").type("111");
            cy.get("button").contains("CONFIRM PURCHASE").click();
            cy.url().should("include", "/confirmation");
            cy.get("button").contains("GO BACK").should("be.visible");
        });
        it("submits a valid credit form with a valid address", () => {
            cy.get("#name").type("Some Name");
            cy.get("#email").type("idk123@gmail.com");
            cy.get("#phone").type("1111111111");
            cy.get("#address").type("949 Edwards Dr");
            cy.get("#zipcode").type("19064");
            cy.get("#city").type("Springfield");
            cy.get("#state").type("PA");
            cy.get("#country").type("US");
            cy.get("#eMoneyNumber").type("1111111111111111");
            cy.get("#eMoneyPin").type("111");
            cy.get("button").contains("CONFIRM PURCHASE").click();
            cy.url().should("include", "/confirmation");
            cy.get("button").contains("GO BACK").should("not.exist");
        });
    }
);

describe("Tests the cart form using the cash form", () => {
    beforeEach(() => {
        cy.visit("/products/details/xx99-mark-two-headphones");
        cy.get("#add-button").click();
        cy.get("button").contains("ADD TO CART").click();
        cy.get("button").contains("VIEW YOUR CART").click();
        cy.get("button").contains("CONTINUE TO CART").click();
    });

    it("tests the cash form validation", () => {
        cy.get("#name").type("1");
        cy.get("#email").type("1");
        cy.get("#phone").type("1");
        cy.get("#address").type("1");
        cy.get("#zipcode").type("1");
        cy.get("#city").type("1");
        cy.get("#state").type("1");
        cy.get("#country").type("1");
        cy.get("#cash").click();
        cy.get("#emoney-error").should("not.exist");
        cy.get("#epin-error").should("not.exist");
        cy.get("button").contains("CONFIRM PURCHASE").click();
        cy.get("#name-error").should("be.visible");
        cy.get("#email-error").should("be.visible");
        cy.get("#phone-error").should("be.visible");
        cy.get("#address-error").should("be.visible");
        cy.get("#zipcode-error").should("be.visible");
        cy.get("#city-error").should("be.visible");
        cy.get("#state-error").should("be.visible");
        cy.get("#country-error").should("be.visible");
    });

    it("submits a valid cash form with an invalid address", () => {
        cy.get("#name").type("Some Name");
        cy.get("#email").type("idk123@gmail.com");
        cy.get("#phone").type("1111111111");
        cy.get("#address").type("111 Beach Ave");
        cy.get("#zipcode").type("11111");
        cy.get("#city").type("Philadelphia");
        cy.get("#state").type("PA");
        cy.get("#country").type("US");
        cy.get("#cash").click();
        cy.get("button").contains("CONFIRM PURCHASE").click();
        cy.url().should("include", "/confirmation");
        cy.get("button").contains("GO BACK").should("be.visible");
    });
    it("submits a valid cash form with a valid address", () => {
        cy.get("#name").type("Some Name");
        cy.get("#email").type("idk123@gmail.com");
        cy.get("#phone").type("1111111111");
        cy.get("#address").type("949 Edwards Dr");
        cy.get("#zipcode").type("19064");
        cy.get("#city").type("Springfield");
        cy.get("#state").type("PA");
        cy.get("#country").type("US");
        cy.get("#cash").click();
        cy.get("button").contains("CONFIRM PURCHASE").click();
        cy.url().should("include", "/confirmation");
        cy.get("button").contains("GO BACK").should("not.exist");
    });
});

describe(
    "Tests the cart form using the cash form in mobile view",
    {
        viewportWidth: 412,
        viewportHeight: 892,
    },
    () => {
        beforeEach(() => {
            cy.visit("/products/details/xx99-mark-two-headphones");
            cy.get("#add-button").click();
            cy.get("button").contains("ADD TO CART").click();
            cy.get("button").contains("VIEW YOUR CART").click();
            cy.get("button").contains("CONTINUE TO CART").click();
        });

        it("tests the cash form validation", () => {
            cy.get("#name").type("1");
            cy.get("#email").type("1");
            cy.get("#phone").type("1");
            cy.get("#address").type("1");
            cy.get("#zipcode").type("1");
            cy.get("#city").type("1");
            cy.get("#state").type("1");
            cy.get("#country").type("1");
            cy.get("#cash").click();
            cy.get("#emoney-error").should("not.exist");
            cy.get("#epin-error").should("not.exist");
            cy.get("button").contains("CONFIRM PURCHASE").click();
            cy.get("#name-error").should("be.visible");
            cy.get("#email-error").should("be.visible");
            cy.get("#phone-error").should("be.visible");
            cy.get("#address-error").should("be.visible");
            cy.get("#zipcode-error").should("be.visible");
            cy.get("#city-error").should("be.visible");
            cy.get("#state-error").should("be.visible");
            cy.get("#country-error").should("be.visible");
        });

        it("submits a valid cash form with an invalid address", () => {
            cy.get("#name").type("Some Name");
            cy.get("#email").type("idk123@gmail.com");
            cy.get("#phone").type("1111111111");
            cy.get("#address").type("111 Beach Ave");
            cy.get("#zipcode").type("11111");
            cy.get("#city").type("Philadelphia");
            cy.get("#state").type("PA");
            cy.get("#country").type("US");
            cy.get("#cash").click();
            cy.get("button").contains("CONFIRM PURCHASE").click();
            cy.url().should("include", "/confirmation");
            cy.get("button").contains("GO BACK").should("be.visible");
        });
        it("submits a valid cash form with a valid address", () => {
            cy.get("#name").type("Some Name");
            cy.get("#email").type("idk123@gmail.com");
            cy.get("#phone").type("1111111111");
            cy.get("#address").type("949 Edwards Dr");
            cy.get("#zipcode").type("19064");
            cy.get("#city").type("Springfield");
            cy.get("#state").type("PA");
            cy.get("#country").type("US");
            cy.get("#cash").click();
            cy.get("button").contains("CONFIRM PURCHASE").click();
            cy.url().should("include", "/confirmation");
            cy.get("button").contains("GO BACK").should("not.exist");
        });
    }
);
