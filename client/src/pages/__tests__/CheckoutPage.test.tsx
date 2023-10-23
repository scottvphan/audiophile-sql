import { describe, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";

import CheckoutPage from "../CheckoutPage";
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
    }),
}));

const rendered = () => render(<CheckoutPage />, { wrapper: MemoryRouter });

describe("Renders Checkout Form Component", () => {
    it("Fully renders Checkout Form Component without a new product", () => {
        rendered();
        screen.debug();
    });
    it("Clicks confirm purchase", async() => {
        rendered();
        const nameLabel = screen.getByLabelText('Name')
        const emailLabel = screen.getByLabelText('Email Address')
        const phoneLabel = screen.getByLabelText('Phone Address')
        const addressLabel = screen.getByLabelText('Address')
        const zipCodeLabel = screen.getByLabelText('ZIP Code')
        const cityLabel = screen.getByLabelText('City')
        const stateLabel = screen.getByLabelText('State')
        const countryLabel = screen.getByLabelText('Country')
        const cashOption = screen.getByLabelText('e-Money')
        
        waitFor(async() => {
            await userEvent.type(nameLabel, "Some Name");
            await userEvent.type(emailLabel, "idk123@gmail.com");
            await userEvent.type(phoneLabel, "1111111111");
            await userEvent.type(addressLabel, "111 Beach Ave");
            await userEvent.type(zipCodeLabel, "11111");
            await userEvent.type(cityLabel, "Philadelphia");
            await userEvent.type(stateLabel, "PA");
            await userEvent.type(countryLabel, "US");
            await userEvent.click(cashOption)
            // userEvent.type("1111111111111111");
            // userEvent.type("111");
    
            // await userEvent.click(screen.getByText('Submit'))
            screen.debug()
            userEvent.click(screen.getByText('CONFIRM PURCHASE'))
        })
    })
});
