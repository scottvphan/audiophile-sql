import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoaderComponent from "../LoaderComponent";
import { MemoryRouter } from "react-router-dom";

const rendered = () =>
    render(<LoaderComponent />, { wrapper: MemoryRouter });

describe("Renders Cart Preview Component", () => {
    it("Renders the main page LoaderComponent", () => {
        rendered();
    })
});
