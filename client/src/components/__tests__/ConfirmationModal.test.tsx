import { Mock, describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmationModal from "../ConfirmationModal";
import { MemoryRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const rendered = () =>
    render(<ConfirmationModal />, { wrapper: MemoryRouter });

vi.mock("../Layout", () => ({
    useLayoutOutletContext: () => ({
        setIsShippingDataLoaded: vi.fn()
    }),
}));

describe("Renders ConfirmationModal Component", () => {
    it("renders with preview prop", () => {
        rendered();
        screen.debug()
    });

    it("clicks the back button", async() => {
        rendered();
        await waitFor(async() => {
            await userEvent.click(screen.getByText("GO BACK"))
        })
    })
});
