import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import ProductList from "../ProductList";
import { MemoryRouter } from "react-router-dom";

const rendered = () =>
    render(<ProductList />, { wrapper: MemoryRouter });

describe("Renders Product List ", () => {
    it("Fully renders with product list", () => {
        rendered();
        screen.debug();
    });
});
