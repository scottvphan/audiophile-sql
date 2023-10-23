import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "../Footer";
import { MemoryRouter } from "react-router-dom";

const rendered = () =>
    render(<Footer />, { wrapper: MemoryRouter });

describe("Renders Footer Component", () => {
    it("renders footer component", () => {
        rendered();
        expect(screen.findAllByText('Copyright 2021. All Rights Reserved'))
    });
});
