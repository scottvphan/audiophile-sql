/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartModal from "./CartModal";
import { useAuth0 } from "@auth0/auth0-react";
import { Backdrop } from "./StyledComponents";
import CheckoutModal from "./CheckoutModal";
import HamburgerMenu from "./HamburgerMenu";
import axios from "axios";
import EmailVerificationModal from "./EmailVerificationModal";

export default function Layout({apiBaseUrl}:any) {
    const { isAuthenticated, user, isLoading } = useAuth0();
    const [formData, setFormData] = useState<any>("");
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
    const [cart, setCart] = useState<any>(
        JSON.parse(sessionStorage.getItem("cart") ?? '{}')
    );
    const [isCartLoaded, setIsCartLoaded] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<any>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const NavbarProps = {
        cart: cart,
        setCart: setCart,
        isCartOpen: isCartOpen,
        setIsCartOpen: setIsCartOpen,
        isHamburgerOpen: isHamburgerOpen,
        setIsHamburgerOpen: setIsHamburgerOpen,
    };
    const [shippingData, setShippingData] = useState<any>("");
    const [isShippingDataLoaded, setIsShippingDataLoaded] =
        useState<boolean>(false);
    const [shippingPrice, setShippingPrice] = useState<any>("");
    const [isEmailVerificationOpen, setIsEmailVerificationOpen] =
        useState<boolean>(false);
    const [userId, setUserId] = useState<number>(0);
    const [isUserIdLoaded, setIsUserIdLoaded] = useState<boolean>(false);
    const postOrder = async (tax: number) => {
        console.log(formData)
        const dataPosted = {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            cart: cart,
            credit: formData?.credit,
            cash: formData?.cash,
            shippingPrice: shippingPrice,
            tax: tax,
            totalPrice: totalPrice,
            user_id: userId
        };
        console.log(dataPosted)
        await axios.post(`${apiBaseUrl}/api/v1/orders`, dataPosted);
    };

    const getUserId = async () => {
        const userEmail = user?.email;
        await axios
            .get(`${apiBaseUrl}/api/v1/user/${userEmail}`)
            .then((res) => {
                console.log(res.data);
                setUserId(res.data[0].user_id);
            });
    };

    const addCart = async () => {
        const userData = {
            userId: userId,
        };
        axios.post(`${apiBaseUrl}/api/v1/cart`, userData);
    };

    const updateCart = async () => {
        const userCart = {
            userId: userId,
            cartData: cart,
        };
        if(cart){
            await axios.patch(`${apiBaseUrl}/api/v1/cart`, userCart);
        }
    };

    const getCart = async () => {
        console.log("getting cart");
        try {
            const response = await axios.get(
                `${apiBaseUrl}/api/v1/cart/${userId}`
            );
            console.log(response.data);
            if(response.data){
                console.log(response.data)
                setCart(response.data);
                setIsCartLoaded(true);
            } else {
                setCart({});
                setIsCartLoaded(true);
            }
        } catch (error) {
            // Handle errors here
            console.error(`Error in getCart:`, error);
        }
    };

    const addUser = async () => {
        const userData = {
            name: user?.name,
            email: user?.email,
            email_verified: user?.email_verified,
        };
        await axios.post(`${apiBaseUrl}/api/v1/user`, userData);
        setUserId(-1)
    };

    const checkVerification = async () => {
        console.log(userId);
        const userData = {
            user_id: userId,
            name: user?.name,
            email: user?.email,
        };

        try {
            await axios.get(
                `${apiBaseUrl}/api/v1/verifications/${userId}`
            );
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                try {
                    await axios.post(
                        `${apiBaseUrl}/api/v1/verifications/`,
                        userData
                    );
                    console.log(userData);
                } catch (error) {
                    // Handle errors here
                    console.error("Error in checkVerification (post):", error);
                }
            } else {
                // Handle other types of errors if needed
                console.error("Error in checkVerification (get):", error);
            }
        }
    };

    const getShippingData = async () => {
        console.log('calling shipping data using:', formData);
        axios
            .get(`${apiBaseUrl}/api/v1/orders/rates`, {
                params: {
                    form: JSON.stringify(formData),
                },
            })
            
            .then((res) => {
                console.log(res.data)
                console.log(res.data.shippingRate.rateResponse.rates);
                const rates = res.data.shippingRate.rateResponse.rates;
                const mappedRates = rates.map((data: any) => {
                    return {
                        shippingAmount: data.shippingAmount,
                        deliveryDays: data.deliveryDays,
                        estimatedDeliveryDate: data.estimatedDeliveryDate,
                        serviceType: data.serviceType,
                    };
                });
                console.log(rates)
                if(rates.length > 0) {
                    setShippingData(mappedRates);
                } else {
                    console.log('should set')
                    setShippingData('')
                    setShippingPrice('')
                }
                setIsShippingDataLoaded(true);
            });
    };

    useEffect(() => {
        if (shippingData) {
            setShippingPrice(shippingData[2].shippingAmount.amount);
        }
    }, [shippingData]);

    useEffect(() => {
        if (isAuthenticated) {
            addUser();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        // If Email is not verified, modal should be opened
        isAuthenticated && !user?.email_verified
            ? setIsEmailVerificationOpen(true)
            : setIsEmailVerificationOpen(false);
        // SessionStorage for users that are not logged in
        if (!isAuthenticated && !isLoading) {
            if (JSON.stringify(cart) !== sessionStorage.getItem("cart")) {
                sessionStorage.setItem("cart", JSON.stringify(cart));
                setIsCartLoaded(true);
            }
        } else {
            if (isCartLoaded) {
                sessionStorage.removeItem("cart");
                updateCart();
                setIsShippingDataLoaded(false);
            }
        }
    }, [cart, isAuthenticated, user, isLoading, isCartLoaded]);

    useEffect(() => {
            if (userId !== 0 && userId !== undefined && userId !== -1) {
                setIsUserIdLoaded(true)
                if(!isUserIdLoaded){
                    addCart();
                    checkVerification();
                    getCart();
                }
            }
            if (userId === -1) {
                getUserId();
            }
    }, [userId]);

    useEffect(() => {
        if (formData) {
            getShippingData();
        }
    }, [formData]);

    useEffect(() => {
        if (shippingData) {
            sessionStorage.setItem(
                "shippingData",
                JSON.stringify(shippingData)
            );
        }
    }, [shippingData]);

    useEffect(() => {
        if (isCartLoaded) {
            const sessionShippingData = JSON.parse(
                sessionStorage.getItem("shippingData") as any
            );
            if (sessionShippingData) {
                setShippingData(sessionShippingData);
                setIsShippingDataLoaded(true);
            }
        }
    }, [isCartLoaded]);

    function handleCloseModal() {
        setIsCartOpen(false);
    }

    useEffect(() => {
        // updateCart()
    }, [cart]);

    return (
        <>
            {isEmailVerificationOpen && userId !== 0 && (
                <>
                    <EmailVerificationModal
                        apiBaseUrl = {apiBaseUrl}
                        userId={userId}
                        setIsEmailVerificationOpen={setIsEmailVerificationOpen}
                    />
                    <Backdrop top />
                </>
            )}
            {isCartOpen && <Backdrop top={false} onClick={handleCloseModal} />}
            {isCheckoutModalOpen && (
                <CheckoutModal
                    cart={cart}
                    setIsCheckoutModalOpen={setIsCheckoutModalOpen}
                    setCart={setCart}
                    totalPrice={totalPrice}
                />
            )}
            {isCheckoutModalOpen && <Backdrop top />}
            <Navbar {...NavbarProps} />
            {isHamburgerOpen && <HamburgerMenu {...NavbarProps} />}
            {isCartOpen && <CartModal {...NavbarProps} />}
            <Outlet
                context={{
                    cart,
                    setCart,
                    isCartOpen,
                    setIsCartOpen,
                    formData,
                    setFormData,
                    isCheckoutModalOpen,
                    setIsCheckoutModalOpen,
                    isCartLoaded,
                    shippingData,
                    isShippingDataLoaded,
                    shippingPrice,
                    setShippingPrice,
                    postOrder,
                    totalPrice,
                    setTotalPrice,
                }}
            />
            <Footer />
        </>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLayoutOutletContext() {
    return useOutletContext<any>();
}
