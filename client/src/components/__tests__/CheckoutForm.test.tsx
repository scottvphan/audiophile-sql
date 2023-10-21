import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutForm from "../CheckoutForm";
import { MemoryRouter } from "react-router-dom";
const props = {
    setFormData: vi.fn(),
};

vi.mock("../Layout", () => ({
    useLayoutOutletContext: () => ({
        cart: [
            {
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
        ],
    }),
}));

const rendered = (props: any) =>
    render(<CheckoutForm {...props} />, { wrapper: MemoryRouter });

describe("Renders Checkout Form Component", () => {
    it("Fully renders Checkout Form Component without a new product", () => {
        rendered(props);
        screen.debug();
    });
});

describe("Tests the form functions", () => {
    it("Clicks the cash option"),
        async () => {
            await act(async () => {
                rendered(props);
                const cashBtn = screen.getByTestId("cash-btn");
                await userEvent.dblClick(cashBtn);
            });
            await waitFor(() => {
                screen.debug();
                expect(
                    screen.getByText("Cash On Delivery")
                ).toBeInTheDocument();
            });
        };
    it("Clicks the credit option"),
        async () => {
            rendered(props);
            await act(async () => {
                const creditOption = screen.getByTestId("credit-btn");
                await userEvent.click(creditOption);
            })
            await waitFor(() => {
                screen.debug();
            });
        };
    it("should show errors in the form", async () => {
        rendered(props);
        const nameLabel = screen.getByLabelText("Name");
        const emailLabel = screen.getByLabelText("Email Address");
        const phoneLabel = screen.getByLabelText("Phone Address");
        const addressLabel = screen.getByLabelText("Address");
        const zipCodeLabel = screen.getByLabelText("ZIP Code");
        const cityLabel = screen.getByLabelText("City");
        const stateLabel = screen.getByLabelText("State");
        const countryLabel = screen.getByLabelText("Country");

        await userEvent.click(screen.getByText("Submit"));
    });

    it("submits a valid form", async () => {
        rendered(props);
        const nameLabel = screen.getByLabelText("Name");
        const emailLabel = screen.getByLabelText("Email Address");
        const phoneLabel = screen.getByLabelText("Phone Address");
        const addressLabel = screen.getByLabelText("Address");
        const zipCodeLabel = screen.getByLabelText("ZIP Code");
        const cityLabel = screen.getByLabelText("City");
        const stateLabel = screen.getByLabelText("State");
        const countryLabel = screen.getByLabelText("Country");
        const cashOption = screen.getByLabelText("e-Money");
        const cashBtn = screen.getByTestId("cash-btn");

        waitFor(async () => {
            await userEvent.type(nameLabel, "Some Name");
            await userEvent.type(emailLabel, "idk123@gmail.com");
            await userEvent.type(phoneLabel, "1111111111");
            await userEvent.type(addressLabel, "111 Beach Ave");
            await userEvent.type(zipCodeLabel, "11111");
            await userEvent.type(cityLabel, "Philadelphia");
            await userEvent.type(stateLabel, "PA");
            await userEvent.type(countryLabel, "US");
            await userEvent.click(cashBtn);
            // userEvent.type("1111111111111111");
            // userEvent.type("111");

            await userEvent.click(screen.getByTestId("submit-btn"));
            screen.debug();
        });
    });
});
