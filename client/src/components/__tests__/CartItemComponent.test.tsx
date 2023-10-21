import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItemComponent from "../CartItemComponent";

const data = {
    name: "YX1 Wireless Earphones",
    image: "/assets/cart/image-yx1-earphones.jpg",
    quantity: 1,
    price: "599.00",
    total: 599,
    id: 1,
    weight: "0.70",
}

const props = {
    image: data.image,
    fixedName: data.name,
    quantity: data.quantity,
    price: data.price
};

const rendered = (props: any) => render(<CartItemComponent {...props} />);

describe("Renders Cart Component", () => {
    it("Fully Renders Cart Component", () => {
        rendered(props);
        const productName = screen.getByText("YX1 Wireless Earphones");
        const productPrice = screen.getByText(/^\$\s*599\.00$/);
        expect(productName).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
    });
});