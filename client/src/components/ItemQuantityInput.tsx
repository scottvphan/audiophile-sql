/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
// import SVG from "react-inlinesvg";
import { useState, useEffect, useRef } from "react";

const InputContainer = styled.div`
    width: 100%;
    background-color: #f1f1f1;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const InputAmount = styled.div`
    color: #000;
    text-align: center;
    font-size: 0.8rem;
    font-family: Manrope;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: default;
`;
const InputIcons = styled.p`
    color: #000;
    text-align: center;
    font-size: 1rem;
    font-family: Manrope;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    opacity: 0.25;
    transition: 0.3s;
    user-select: none;
`;
const InputIconContainer = styled.div`
    width: 100%;
    cursor: pointer;
    &:hover {
        p {
            color: #d87d4a;
            transition: 0.3s;
            opacity: 1;
            cursor: pointer;
        }
    }
`;
export default function ItemQuantityInput({
    id,
    quantity,
    price,
    setItemAmount,
    setCart,
}: any) {
    const [currentQuantity, setCurrentQuantity] = useState<number>(
        setCart ? +quantity : 0
    );
    const prevQuantityRef = useRef<number>(currentQuantity);

    function handleMinus() {
        setCurrentQuantity((prevQuantity) =>
            prevQuantity !== 0 ? prevQuantity - 1 : 0
        );
    }

    function handleAdd() {
        setCurrentQuantity((prevQuantity) => prevQuantity + 1);
    }
    useEffect(() => {
        if (setCart) {
            if (prevQuantityRef.current !== currentQuantity) {
                if (currentQuantity > 0) {
                    setCart((prevCart: any) => ({
                        ...prevCart,
                        [id]: {
                            ...prevCart[id],
                            quantity: currentQuantity,
                            total: currentQuantity * price,
                        },
                    }));
                    prevQuantityRef.current = currentQuantity;
                } else {
                    setCart((prevState: any) => {
                        const updatedCart = { ...prevState };
                        delete updatedCart[id];
                        return updatedCart;
                    });
                }
            }
        }
        if (setItemAmount) {
            setItemAmount(currentQuantity);
        }
    }, [currentQuantity, id, setCart, price, setItemAmount]);

    return setCart ? (
        <InputContainer>
            <InputIconContainer id="cart-minus-button" onClick={handleMinus}>
                <InputIcons>-</InputIcons>
            </InputIconContainer>
            <InputAmount id="cart-item-quantity-amount">{quantity ? currentQuantity : 0}</InputAmount>
            <InputIconContainer id="cart-add-button" onClick={handleAdd}>
                <InputIcons>+</InputIcons>
            </InputIconContainer>
        </InputContainer>
    ) : (
        <InputContainer>
            <InputIconContainer id="minus-button" onClick={handleMinus}>
                <InputIcons>-</InputIcons>
            </InputIconContainer>
            <InputAmount id="item-quantity-amount">{currentQuantity}</InputAmount>
            <InputIconContainer id="add-button" onClick={handleAdd}>
                <InputIcons>+</InputIcons>
            </InputIconContainer>
        </InputContainer>
    );
}
