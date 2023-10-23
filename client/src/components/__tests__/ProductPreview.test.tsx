import { describe, expect, it } from "vitest";
import { screen, render,  } from "@testing-library/react";
import ProductPreview from "../ProductPreview";
import { MemoryRouter } from "react-router-dom";

const rendered = () =>
    render(<ProductPreview />, { wrapper: MemoryRouter });

describe("Renders Product Preview ", () => {
    it("Fully renders with product preview", () => {
        rendered();
        screen.debug();
        expect(screen.findAllByText("SEE PRODUCT"))
    });
});
