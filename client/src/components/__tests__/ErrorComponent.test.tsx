import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import ErrorComponent from "../ErrorComponent";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

const rendered = () => render(<ErrorComponent />, { wrapper: MemoryRouter });

describe("Renders Error Component", () => {
    it("Fully Renders Error Component", () => {
        rendered();
        const goBackBtn = screen.getByText('Go Back')
        expect(goBackBtn).toBeInTheDocument()
    });

    it("Clicks the go back button", async() => {
        rendered()
        const goBackBtn = screen.getByText('Go Back')
        await userEvent.click(goBackBtn)
    })
});
