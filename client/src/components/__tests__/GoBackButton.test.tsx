import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GoBackButton from "../GoBackButton";
import { MemoryRouter } from "react-router-dom";

const rendered = () =>
    render(<GoBackButton />, { wrapper: MemoryRouter });

describe("Renders Go Back Button", () => {
    it('renders go back button', () => {
        rendered()
        expect(screen.getByText('Go Back')).toBeInTheDocument()
    })
    it('clicks the go back button', async() => {
        rendered()
        await userEvent.click(screen.getByText('Go Back'))
    })
})