/* eslint-disable @typescript-eslint/no-explicit-any */
import SVG from "react-inlinesvg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "/assets/shared/desktop/logo.svg";
import hamburger from "/assets/hamburger.svg";
import { StyledSVG, UnStyledLink } from "./StyledComponents";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Nav = styled.nav`
    background-color: #101010;
    color: white;
    padding: 0rem 20rem;
    z-index: 100;
    position: relative;
    @media screen and (max-width: 1440px) {
        padding: 0rem 5rem;
    }
    @media screen and (max-width: 1024px) {
        padding: 0rem 2rem;
    }
    min-height:10vh;
`;
const LinkContainer = styled.div`
    display: flex;
    gap: 2.5rem;
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;
const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ffffff33;
    padding: 2rem 0;
`;
const StyledLink = styled(Link)`
    color: white;
    font-weight: 700;
    text-decoration: none;
    transition: 0.3s;
    transform: scale(1);
    letter-spacing: 2px;
    &:hover {
        color: #d87d4a;
        transition: 0.3s;
        transform: scale(1.1);
        letter-spacing: 4px;
    }
`;
const HamburgerMenu = styled(SVG)`
    display: none;
    @media screen and (max-width: 1024px) {
        display: block;
    }
    @media screen and (max-width: 568px) {
        width:80px;
    }
`;
const SVGContainer = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    height:100%;
`;
const StyledLogo = styled(SVG)`
    width: 100%;
    height: 50%;
    transition:0.3s;
    &:hover{
        path{
            transition:0.3s;
            fill:#D87D4A;
        }
    }
    @media screen and (max-width: 560px) {
        display:none
    }
`;
const RightContainer = styled.div`
    display:flex;
    align-items:center;
    gap:1rem;
`
const HiddenBtn = styled.button`
    display:none;
`
export default function Navbar({
    cart,
    setIsCartOpen,
    isCartOpen,
    setIsHamburgerOpen,
}: any) {
    const { isAuthenticated } = useAuth0();
    
    function handleCart() {
        if (Object.keys(cart).length !== 0) {
            setIsCartOpen(!isCartOpen);
        }
    }

    function setHamburgerMenu() {
        console.log('setting menu')
        setIsHamburgerOpen(
            (prevState: boolean) => !prevState
        );
    }
    
    return (
        <Nav>
            <NavContainer>
                <SVGContainer>
                    <HamburgerMenu
                        id="hamburger-menu"
                        onClick={setHamburgerMenu}
                        src={hamburger}
                    />
                    <UnStyledLink to="/">
                        <StyledLogo src={logo} />
                    </UnStyledLink>
                </SVGContainer>
                <LinkContainer>
                    <StyledLink id="home-link" to="/">HOME</StyledLink>
                    <StyledLink id="headphones-link" to="/products/headphones">HEADPHONES</StyledLink>
                    <StyledLink id="speakers-link" to="/products/speakers">SPEAKERS</StyledLink>
                    <StyledLink id="earphones-link" to="/products/earphones">EARPHONES</StyledLink>
                </LinkContainer>
                <RightContainer data-testid="svg-container">
                    {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
                    <StyledSVG
                        id="cart-icon"
                        onClick={handleCart}
                        src="/assets/shared/desktop/icon-cart.svg"
                    />
                    <HiddenBtn onClick={handleCart} data-testid="cartBtn">cart</HiddenBtn>
                    <HiddenBtn onClick={setHamburgerMenu} data-testid="setHamburgerMenu">hamburger-menu</HiddenBtn>
                </RightContainer>
            </NavContainer>
        </Nav>
    );
}
