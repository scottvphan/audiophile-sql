/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import HomePage from "../HomePage";
import { MemoryRouter } from "react-router-dom";

const rendered = () =>
    render(<HomePage/>, { wrapper: MemoryRouter });

describe("Renders Product Details Component", () => {
    it("Fully renders with product details", () => {
        rendered();
        screen.debug();
    });
});
