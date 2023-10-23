import { Mock, describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmailVerificationModal from "../EmailVerificationModal";
import { MemoryRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const props = {
    apiBaseUrl: 'http://18.191.60.138:4000',
    userId: 15,
};

(axios.get as Mock).mockResolvedValue

const rendered = (props: any) =>
    render(<EmailVerificationModal {...props} />, { wrapper: MemoryRouter });


describe("Renders Email Verification Component", () => {

    it("renders with email modal", () => {
        rendered(props);
        screen.debug()
    });

    it("clicks the resend button", () => {
        rendered(props);
        const resendBtn = screen.getByText("Click here to send/resend")
        userEvent.click(resendBtn)
    })
});
