import styled from "styled-components";
import ProductCardList from "./ProductCardList";
import { Backdrop } from "./StyledComponents";

const HamburgerMenuContainer = styled.div`
    background-color: white;
    z-index:100;
    padding:1rem;
    position:absolute;
    width:100vw;
    box-sizing:border-box;
`

interface HamburgerMenuProps {
    setIsHamburgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HamburgerMenu({ setIsHamburgerOpen }: HamburgerMenuProps){
    function handleMenu(){
        setIsHamburgerOpen((prevState:boolean) => !prevState)
    }
    return(
        <>
            <Backdrop data-testid={'hamburger-backdrop'} top={false} onClick={handleMenu} />
            <HamburgerMenuContainer>
                <ProductCardList handleMenu = {handleMenu} />
            </HamburgerMenuContainer>
        </>
    )
}