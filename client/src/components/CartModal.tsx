/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import CartComponent from "./CartComponent";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { OrangeButton, UnStyledLink } from "./StyledComponents";

const CartContainer = styled.div`
    position: absolute;
    top: 10%;
    left: 65%;
    background-color: white;
    z-index: 11;
    padding: 1rem;
    border-radius: 0.5rem;
    min-width: 320px;
    @media screen and (max-width: 1440px) {
        left: 50%;
    }
    @media screen and (max-width: 768px) {
        left: 30%;
    }
    @media screen and (max-width:500px) {
        left:0%;
        width:100vw;
        box-sizing:border-box;
    }
    z-index:90;
`;
const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const CartHeading = styled.h1`
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    letter-spacing: 1.28571px;
    text-transform: uppercase;
    color: #000000;
`;
const RemoveAll = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 25px;
    color: #000000;
    mix-blend-mode: normal;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
const TotalContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const TotalPrice = styled.h6`
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 25px;
    color: #000000;
    mix-blend-mode: normal;
    opacity: 0.5;
`;
const MappedContainer = styled.div`
    display: grid;
    gap: 0.5rem;
    align-items: center;
`;
const EmptyMessage = styled.h1`
    font-size: 2rem;
    text-align: center;
`;
interface Cart {
    name: string;
    image: string;
    quantity: string;
    total: number;
}

interface CartModalProps {
    cart: Cart
    setCart: React.Dispatch<React.SetStateAction<Record<string, Cart>>>;
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartModal({ cart, setCart, setIsCartOpen }: CartModalProps) {
    console.log(cart)
    const [mappedData, setMappedData] = useState<any>("");
    const [totalPrice, setTotalPrice] = useState<any>(0);
    useEffect(() => {
        const mappeddata = Object.values(cart).map((data: any) => {
            return (
                <CartComponent
                    key={uuidv4()}
                    cart={cart}
                    setCart={setCart}
                    data={data}
                />
            );
        });
        setMappedData(mappeddata);
        const total = Object.values(cart).reduce(
            (accumulator: number, item: unknown) => {
                const cartItem = item as Cart;
                return accumulator + cartItem.total;
            },
            0
        );
        setTotalPrice(total);
    }, [cart, setCart]);
    function removeAllItems() {
        setCart({});
        setIsCartOpen(false);
    }
    
    const cartLength = Object.values(cart).length;

    return (
        <>
            <CartContainer>
                {cartLength > 0 ? (
                    <>
                        <TopContainer>
                            <CartHeading>Cart ({cartLength})</CartHeading>
                            <RemoveAll onClick={removeAllItems}>
                                Remove All
                            </RemoveAll>
                        </TopContainer>
                        <MappedContainer>{mappedData}</MappedContainer>
                        <TotalContainer>
                            <TotalPrice>TOTAL</TotalPrice>
                            <h4>$ {totalPrice}</h4>
                        </TotalContainer>
                        <UnStyledLink to={"/cart"}>
                            <OrangeButton
                                onClick={() => {
                                    setIsCartOpen(false);
                                }}
                            >
                                VIEW YOUR CART
                            </OrangeButton>
                        </UnStyledLink>
                    </>
                ) : (
                    <>
                        <TopContainer>
                            <CartHeading>Cart ({cartLength})</CartHeading>
                        </TopContainer>
                        <EmptyMessage>Cart is empty...</EmptyMessage>
                        <OrangeButton disabled>CHECKOUT</OrangeButton>
                    </>
                )}
            </CartContainer>
        </>
    );
}
