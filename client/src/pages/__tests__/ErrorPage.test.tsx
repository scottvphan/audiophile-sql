/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import ErrorPage from "../ErrorPage";
import { MemoryRouter } from "react-router-dom";

const rendered = () =>
    render(<ErrorPage />, { wrapper: MemoryRouter });

describe("Renders Product Details Component", () => {
    it("Fully renders with product details", () => {
        rendered();
        screen.debug();
        expect(screen.getByText('Go Back'))
    });
});
