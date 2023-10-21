import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import ItemQuantityInput from "../ItemQuantityInput";
import userEvent from "@testing-library/user-event";

const data = {
    name: "YX1 Wireless Earphones",
    image: "/assets/cart/image-yx1-earphones.jpg",
    quantity: 1,
    price: "599.00",
    total: 599,
    id: 1,
    weight: "0.70",
};

const props = {
    setCart: vi.fn(),
    setItemAmount: vi.fn(),
    price: data.price,
    id: data.id,
};

const savedQuantityProps = {
    ...props,
    quantity: data.quantity,
};

const rendered = (props: any) => render(<ItemQuantityInput {...props} />);

describe("Tests Item Component with new cart item", () => {
    it("Fully renders Item Component", () => {
        rendered(props);
        const subtract = screen.getByText("-");
        const add = screen.getByText("+");
        const user = userEvent.setup();
        expect(subtract).toBeInTheDocument();
        expect(add).toBeInTheDocument();
    });
});

describe("Tests the Item Component with saved cart item", () => {
    it("Decreases the quantity when '-' is clicked", async () => {
        rendered(savedQuantityProps);
        const subtract = screen.getByText("-");
        const quantityDisplay = screen.getByText("1");
        await userEvent.click(subtract);
        expect(quantityDisplay).toHaveTextContent("0");
        screen.debug();
    });

    it("Increases the quantity when '+' is clicked", async() => {
        rendered(savedQuantityProps);
        const add = screen.getByText("+");
        const quantityDisplay = screen.getByText("1");
        await userEvent.click(add);
        expect(quantityDisplay).toHaveTextContent("2");
    });
});
