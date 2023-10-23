/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import Navbar from "../Navbar";
import { MemoryRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";

const cart = {
    1: {
        id: 1,
        name: "YX1 Wireless Earphones",
        image: "/assets/cart/image-yx1-earphones.jpg",
        price: "599.00",
        total: 599,
        weight: "0.70",
        quantity: 1,
    },
    4: {
        id: 4,
        name: "XX99 Mark II Headphones",
        image: "/assets/cart/image-xx99-mark-two-headphones.jpg",
        price: "2999.00",
        total: 2999,
        weight: "1.60",
        quantity: 1,
    },
};

const closedCartProps = {
    cart: cart,
    setIsCartOpen: vi.fn(),
    isCartOpen: false,
    setIsHamburgerOpen: vi.fn(),
};

const openCartProps = {
    ...closedCartProps,
    isCartOpen: true,
};

const rendered = (props: any) =>
    render(<Navbar {...props} />, { wrapper: MemoryRouter });

describe("Renders Navbar Component", () => {
    it("Fully renders with closed cart", () => {
        rendered(closedCartProps);
        expect(screen.getByText("HOME")).toBeInTheDocument();
    });
    it("Fully renders with open cart", () => {
        rendered(openCartProps);
    });
    it("Opens the cart with the cart button", async () => {
        rendered(closedCartProps);
        const cartBtn = screen.getByTestId('cartBtn')
        expect(cartBtn).toBeInTheDocument()
        await userEvent.click(cartBtn)
    });
    it("Opens the hamburger menu with the hamburger button", async () => {
        rendered(closedCartProps);
        const hamburgerMenu = screen.getByTestId('setHamburgerMenu');
        await userEvent.click(hamburgerMenu)
    })
});
