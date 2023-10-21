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

describe("Renders CheckoutSummary Component without shipping data", () => {
    vi.mock("../Layout", () => ({
        useLayoutOutletContext: () => ({
            cart: {
                "4": {
                    name: "XX99 Mark II Headphones",
                    image: "/assets/cart/image-xx99-mark-two-headphones.jpg",
                    quantity: 1,
                    price: "2999.00",
                    total: 2999,
                    id: 4,
                    weight: "1.60",
                },
            },
            isCartLoaded: true,
            postOrder: vi.fn(),
            setFormData: vi.fn(),
            totalPrice: 2999.0,
            setTotalPrice: vi.fn(),
        }),
    }));

    it("renders with confirmation prop", () => {
        act(() => {
            rendered(isConfirmationProp);
        });
    });
});
