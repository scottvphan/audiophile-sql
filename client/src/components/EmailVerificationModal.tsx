import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { OrangeButton } from "./StyledComponents";

const CheckoutModalContainer = styled.div`
    background-color: white;
    z-index: 101;
    padding: 3rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.5rem;
    max-width: 648px;
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
    text-align: center;
`;

const EmailHeading = styled.h1`
    font-size: 2rem;
    margin: 1.5rem 0;
`;
const EmailSubHeading = styled.h5`
    font-size: 1rem;
    margin: 1.5rem 0;
`;
const ResendVerification = styled.h6`
    color: lightskyblue;
    font-size: 0.8rem;
    cursor: pointer;
    margin: 1.5rem 0;
`;
const EmailParagraph = styled.h6`
    font-size: 0.8rem;
    margin: 1.5rem 0;
`;
export default function EmailVerificationModal({ userId, apiBaseUrl }: any) {
    const { user } = useAuth0();
    const [isVerificationSent, setIsVerificatonSent] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState<unknown>(undefined);

    function checkAuthToken() {
        console.log("checking token");
        axios
            .get(`${apiBaseUrl}/api/v1/verifications/${userId}`)
            .then((res) => {
                if (res.data.is_token_expired === false) {
                    setAuthToken(res.data.token);
                    console.log("setting token");
                }
                if (res.data.is_verification_sent === true) {
                    setIsVerificatonSent(true);
                    console.log("setting verification");
                }
            });
    }

    checkAuthToken();

    function handleVerification() {
        if (authToken) {
            console.log("hello?");
            const postData = {
                email: user?.email,
                authToken: authToken,
                user_id: userId,
            };
            axios
                .post(`${apiBaseUrl}/api/v1/verifications/email`, postData)
                .then((res) => {
                    console.log(res);
                });
            setIsVerificatonSent(true);
        } else {
            console.log("hello??");
            const userData = {
                user_id: userId,
            };
            // Creates a new token
            axios.post(`${apiBaseUrl}/api/v1/verifications/token`, userData);
            console.log(userData);
        }
    }

    const handleButtonClick = () => {
        window.location.reload();
    };

    return (
        <>
            {isVerificationSent ? (
                <CheckoutModalContainer>
                    <EmailHeading>The verification email was sent</EmailHeading>
                    <EmailParagraph>
                        Please check your inbox, if it doesn't appear please
                        check your spam folder
                    </EmailParagraph>
                    <EmailParagraph>
                        Your link will expire in 1 hour
                    </EmailParagraph>
                    <EmailParagraph>
                        Once you verified your email please click the button below
                    </EmailParagraph>
                    <OrangeButton onClick={handleButtonClick}>
                        Click Here
                    </OrangeButton>
                </CheckoutModalContainer>
            ) : (
                <CheckoutModalContainer>
                    <EmailHeading>Your email is not verified</EmailHeading>
                    <EmailSubHeading>
                        Please check your email and verify before you can
                        continue
                    </EmailSubHeading>
                    <ResendVerification onClick={handleVerification}>
                        Click here to send/resend
                    </ResendVerification>
                </CheckoutModalContainer>
            )}
        </>
    );
}
