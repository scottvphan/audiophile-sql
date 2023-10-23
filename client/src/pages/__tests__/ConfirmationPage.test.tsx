import { describe, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import ConfirmationPage from "../ConfirmationPage";
import { MemoryRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";

vi.mock("../../components/Layout", () => ({
    useLayoutOutletContext: () => ({
        setFormData: vi.fn(),
        cart: {},
        isCartLoaded: true,
        shippingData: [
            {
                shippingAmount: { currency: "usd", amount: 245.29 },
                deliveryDays: 1,
                estimatedDeliveryDate: "2023-10-06T12:00:00Z",
                serviceType: "UPS Next Day Air®",
            },
            {
                shippingAmount: { currency: "usd", amount: 109.47 },
                deliveryDays: 2,
                estimatedDeliveryDate: "2023-10-07T23:00:00Z",
                serviceType: "UPS 2nd Day Air®",
            },
            {
                shippingAmount: { currency: "usd", amount: 43.43 },
                deliveryDays: 3,
                estimatedDeliveryDate: "2023-10-10T23:00:00Z",
                serviceType: "UPS® Ground",
            },
            {
                shippingAmount: { currency: "usd", amount: 91.15 },
                deliveryDays: 3,
                estimatedDeliveryDate: "2023-10-10T23:00:00Z",
                serviceType: "UPS 3 Day Select®",
            },
            {
                shippingAmount: { currency: "usd", amount: 221.98 },
                deliveryDays: 1,
                estimatedDeliveryDate: "2023-10-06T23:00:00Z",
                serviceType: "UPS Next Day Air Saver®",
            },
            {
                shippingAmount: { currency: "usd", amount: 316.39 },
                deliveryDays: 1,
                estimatedDeliveryDate: "2023-10-06T08:00:00Z",
                serviceType: "UPS Next Day Air® Early",
            },
        ],
        shippingPrice: 43.43,
        postOrder: vi.fn(),
        totalPrice: 2999.0,
        setTotalPrice: vi.fn(),
        isShippingDataLoaded: true,
        setIsCheckoutModalOpen: true,
    }),
}));

const rendered = () => render(<ConfirmationPage />, { wrapper: MemoryRouter });

describe("Renders Confirmation Page", () => {
    it("Fully renders Confirmation Page without a new product", () => {
        rendered();
        screen.debug();
    });

    it("Clicks checkout button"), async() => {
        await userEvent.click(screen.getByText("CHECKOUT"))
        await waitFor(() => {
            screen.debug()
        })
    }
});
