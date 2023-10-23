import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutSummary from "../CheckoutSummary";
import { MemoryRouter } from "react-router-dom";

const props = {
    isPreview: false,
    isCheckout: false,
    isConfirmation: false,
    setIsCheckoutSummaryOpen: vi.fn(),
};

const isPreviewProp = {
    ...props,
    isPreview: true,
};

const isCheckoutProp = {
    ...props,
    isCheckout: true,
};

const isConfirmationProp = {
    ...props,
    isConfirmation: true,
};

const rendered = (props: any) =>
    render(<CheckoutSummary {...props} />, { wrapper: MemoryRouter });

vi.mock("../Layout")

describe("Renders CheckoutSummary Component with a loaded cart", () => {
    vi.mock("../Layout", () => ({
        useLayoutOutletContext: () => ({
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
            setFormData: vi.fn(),
            totalPrice: 2999.0,
            setTotalPrice: vi.fn(),
        }),
    }));

    it("renders with preview prop", () => {
        act(() => {
            rendered(isPreviewProp);
        });
    });

    it("renders with checkout prop", () => {
        act(() => {
            rendered(isCheckoutProp);
        });
    });

    it("Renders with confirmation prop", async() => {
        act(() => {
            rendered(isConfirmationProp);
            waitFor(async() => {
                await userEvent.click(screen.getByText('CHECKOUT'))
            })
        });
    });
});
