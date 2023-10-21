import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartModal from "../CartModal";
import { MemoryRouter } from "react-router-dom";
const cart = {
    1: {
        name: "YX1 Wireless Earphones",
        image: "/assets/cart/image-yx1-earphones.jpg",
        quantity: 1,
        price: "599.00",
        total: 599,
        id: 1,
        weight: "0.70",
    },
};

const props = {
    cart: cart,
    setCart: vi.fn(),
    setIsCartOpen: vi.fn(),
};

const emptyCartProps = {
    cart: {},
    setCart: vi.fn(),
    setIsCartOpen: vi.fn(),
};

const rendered = (props: any) =>
    render(<CartModal {...props} />, { wrapper: MemoryRouter });

describe("Renders Cart Modal Component", () => {
    it("Fully renders Cart Modal Component", () => {
        rendered(props);
        const productName = screen.getByText("YX1 Wireless Earphones");
        const productPrice = screen.getByText(/^\$\s*599\.00$/);
        expect(productName).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
    });
    it("Clicks the VIEW YOUR CART BUTTON", async() => {
        rendered(props);
        const orangeButton = screen.getByRole("button", {
            name: "VIEW YOUR CART",
        });
        await userEvent.click(orangeButton);
        await waitFor(() => {
            screen.debug()
        })
    });
    it("Clicks remove all", async () => {
        rendered(props);
        const removeAll = screen.getByText("Remove All");
        await userEvent.click(removeAll);
        await waitFor(() => {
            screen.debug()
        })
    });
});

describe("Renders cart modal with an empty cart prop", () => {
    it("Fully renders Cart Modal Component", async () => {
        rendered(emptyCartProps);
        const emptyText = screen.getByText("Cart is empty...");
        expect(emptyText).toBeInTheDocument();
    });
});
