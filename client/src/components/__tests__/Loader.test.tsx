import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Loader from "../Loader";
import { MemoryRouter } from "react-router-dom";

const rendered = () =>
    render(<Loader />, { wrapper: MemoryRouter });

describe("Renders Cart Preview Component", () => {
    it("Renders the main page loader", () => {
        rendered();
        expect(screen.getByText('Loading')).toBeInTheDocument()
    })
});
