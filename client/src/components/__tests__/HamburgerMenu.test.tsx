import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HamburgerMenu from "../HamburgerMenu";
import { MemoryRouter } from "react-router-dom";

const props = {
    setIsHamburgerOpen:vi.fn()
};

const rendered = (props: any) =>
    render(<HamburgerMenu {...props} />, { wrapper: MemoryRouter });

describe("Renders HamburgerMenu Component", () => {
    it("renders with preview prop", () => {
        rendered(props);
        screen.debug()
    });

    it("clicks the backdrop", async() => {
        rendered(props)
        await userEvent.click(screen.getByTestId('hamburger-backdrop'));
    })
});
