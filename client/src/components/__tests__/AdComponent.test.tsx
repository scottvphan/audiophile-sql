import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import AdComponent from "../AdComponent";

const rendered = () => render(<AdComponent />);

describe("Renders AdComponent", () => {
    it("Fully Renders AdComponent", () => {
        rendered();
        const paragraphElement = screen.getByText(
            /Located at the heart of New York City/i
        );

        expect(screen.getByRole("heading")).toHaveTextContent(
            "BRINGING YOU THE"
        );
        expect(paragraphElement).toBeInTheDocument();
    });
});
