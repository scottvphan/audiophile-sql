import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutModal from "../CheckoutModal";
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
    setIsCheckoutModalOpen: vi.fn(),
    totalPrice: 599
};

const modifiedProps = {
    cart: {
        1: {
            name: "YX1 Wireless Earphones",
            image: "/assets/cart/image-yx1-earphones.jpg",
            quantity: 1,
            price: "599.00",
            total: 599,
            id: 1,
            weight: "0.70",
        },
        2: {
            name: "YX1 Wireless Earphones",
            image: "/assets/cart/image-yx1-earphones.jpg",
            quantity: 1,
            price: "599.00",
            total: 599,
            id: 1,
            weight: "0.70",
        }
    },
    ...cart
}

const rendered = (props: any) =>
    render(<CheckoutModal {...props} />, { wrapper: MemoryRouter });

describe("Renders Cart Modal Component with one cart item", () => {
    it("Fully renders Cart Modal Component", () => {
        rendered(props);
        expect(screen.getByText('THANK YOU FOR YOUR ORDER'))
    });

    it('Clicks the close button', async() => {
        rendered(props);
        await userEvent.click(screen.getByText('CLOSE'))
    })
});

describe("Renders Cart Modal Component with multiple cart items", () => {
    it("Fully renders Card Modal Component", () => {
        rendered(modifiedProps)
        screen.debug()
    })
    it('Clicks the more item button', async() => {
        rendered(modifiedProps)
        const moreItemsButton = screen.getByText("and 1 other item(s)")
        await userEvent.click(moreItemsButton)
        await waitFor(() => {
            const viewLessButton = screen.getByText('View Less');
            expect(viewLessButton).toBeInTheDocument()
        })
    })
    it('Closes the more items information', async() => {
        rendered(modifiedProps)
        const moreItemsButton = screen.getByText("and 1 other item(s)")
        await userEvent.click(moreItemsButton)
        await waitFor(async() => {
            const viewLessButton = screen.getByText('View Less');
            await userEvent.click(viewLessButton)
            screen.debug()
        })
    })
})