/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartPage from "../CartPage";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../components/Layout", () => ({
    useLayoutOutletContext: () => ({
        cart: {
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
        },
        setCart: vi.fn(),
        isCartLoaded: false,
        shippingPrice:43.43,
        postOrder: vi.fn(),
        setFormData: vi.fn(),
        totalPrice: 2999.0,
        setTotalPrice: vi.fn()
    }),
}));

const rendered = () => render(<CartPage />, { wrapper: MemoryRouter });

describe("Renders Product Details Component", () => {
    it("Fully renders with product details", () => {
        rendered();
    });
});
