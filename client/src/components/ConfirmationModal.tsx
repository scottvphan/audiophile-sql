/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import SVG from "react-inlinesvg/esm";
import { OrangeButton} from "./StyledComponents";
import { useNavigate } from "react-router-dom";
import { useLayoutOutletContext } from "./Layout";

const ConfirmationModalContainer = styled.div`
    background-color: white;
    z-index: 100;
    padding: 3rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.5rem;
    max-width: 548px;
    box-sizing: border-box;
    transition: 0.5s;
    a {
        button {
            margin: 2rem 0 0rem 0;
        }
    }
    @media screen and (max-width: 1024px) {
        width: 80%;
        top: 50%;
        padding: 1rem;
        transition: 0.5s;
    }
    @media screen and (max-width: 768px) {
        width: 90%;
        top: 50%;
        padding: 1rem;
        transition: 0.5s;
    }
`;
const ConfirmationHeading = styled.h1`
    color: #000;
    font-size: 32px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: 1.143px;
    text-transform: uppercase;
`;
const ConfirmationSubHeading = styled.h6`
    color: #000;
    font-size: 15px;
    font-weight: 500;
    line-height: 25px;
    opacity: 0.5;
`;

export default function ConfirmationModal() {
    const { setIsShippingDataLoaded } = useLayoutOutletContext()
    const nav = useNavigate();
    function handleConfirmation() {
        setIsShippingDataLoaded(false)
        nav('/checkout')
    }

    return (
        <ConfirmationModalContainer>
            <SVG src="/assets/Confirmation/icon-order-confirmation.svg" />
            <ConfirmationHeading>Address not found...</ConfirmationHeading>
            <ConfirmationSubHeading>
                The address seems to be either invalid or unable to be shipped to, please go back and re-enter your address.
            </ConfirmationSubHeading>
                <OrangeButton onClick={handleConfirmation}>GO BACK</OrangeButton>
        </ConfirmationModalContainer>
    );
}
