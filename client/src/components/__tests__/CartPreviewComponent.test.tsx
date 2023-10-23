import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartPreviewComponent from "../CartPreviewComponent";
import { MemoryRouter } from "react-router-dom";
const data = {
    name: "YX1 Wireless Earphones",
    image: "/assets/cart/image-yx1-earphones.jpg",
    quantity: 1,
    price: "599.00",
    total: 599,
    id: 1,
    weight: "0.70",
};
const setCartMock = vi.fn();

const props = {
    data: data,
    setCart: setCartMock,
};

const rendered = (props: any) =>
    render(<CartPreviewComponent {...props} />, { wrapper: MemoryRouter });

describe("Renders Cart Preview Component", () => {
    it("Fully renders Cart Preview Component", () => {
        rendered(props);
        const productName = screen.getByText("YX1");
        const productPrice = screen.getByText(/^\$\s*599\.00$/);
        expect(productName).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
    });

    it("Clicks the delete button", async () => {
        rendered(props);
        const deleteBtn = screen.getByText("DELETE");
        await userEvent.click(deleteBtn);
        expect(setCartMock).toHaveBeenCalledWith(expect.any(Function));
    });
});
