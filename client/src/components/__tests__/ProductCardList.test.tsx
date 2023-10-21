/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCardList from "../ProductCardList";
import { MemoryRouter } from "react-router-dom";

const props = {
    handleMenu: vi.fn()
} 
const rendered = (props: any) =>
    render(<ProductCardList {...props} />, { wrapper: MemoryRouter });

describe("Renders Product Card List Component", () => {
    it("Fully renders with closed cart", () => {
        rendered(props);
        screen.debug()
        expect(screen.findAllByText('SHOP'))
    })
});
