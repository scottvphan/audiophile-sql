import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import CartComponent from "../CartComponent";
import userEvent from "@testing-library/user-event";

const props = {
    setCart: vi.fn(),
    data: {
        name: "YX1 Wireless Earphones",
        image: "/assets/cart/image-yx1-earphones.jpg",
        quantity: 1,
        price: "599.00",
        total: 599,
        id: 1,
        weight: "0.70",
    },
};

const rendered = (props: any) => render(<CartComponent {...props} />);

describe("Renders Cart Component", () => {
    it("Fully Renders Cart Component", () => {
        rendered(props);
        const productName = screen.getByText("YX1 Wireless Earphones");
        const productPrice = screen.getByText(/^\$\s*599\.00$/);
        expect(productName).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
    });
});

describe("It changes the cart", async () => {
    it("checks for the item quantity component", async () => {
        rendered(props);
        const subtract = screen.getByText("-");
        const add = screen.getByText("+");
        const user = userEvent.setup();
        expect(subtract).toBeInTheDocument();
        expect(add).toBeInTheDocument();
        screen.debug();
    });
    it("tests item quantity component", async () => {
        rendered(props);
        const subtract = screen.getByText("-");
        const add = screen.getByText("+");
        const user = userEvent.setup();
        user.click(add);
        screen.debug();
    });
});
