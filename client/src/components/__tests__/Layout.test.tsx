import { Mock, describe, expect, it, vi } from "vitest";
import { screen, render, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Layout, { useLayoutOutletContext } from "../Layout";
import { MemoryRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useOutletContext } from "react-router-dom";
import { renderHook } from "@testing-library/react";
import axios from "axios";

const apiBaseUrl = "http://18.191.60.138:4000";

const props = {
    apiBaseUrl: apiBaseUrl,
};

const rendered = (props: any) =>
    render(<Layout {...props} />, { wrapper: MemoryRouter });

vi.mock("@auth0/auth0-react");

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...(actual as Mock),
        useOutletContext: vi.fn(),
    };
});

// vi.mock("axios", async () => {
//     const actual = await vi.importActual("axios");
//     return {
//         ...(actual as Mock)
//     }
// });

vi.mock("axios");
const mockedAxios = axios as vi.mock<typeof axios>;
(useAuth0 as Mock).mockReturnValue({
    isAuthenticated: false,
    isLoading: false,
    user: {
        email: "test@example.com",
        sub: "auth0|1234567890",
        name: "Test User",
        picture: "https://example.com/picture.jpg",
        email_verified: false,
    },
    logout: vi.fn(),
    loginWithRedirect: vi.fn(),
});

describe("Renders Layout Component", () => {
    it("renders with preview prop", async () => {
        await act(async () => {
            await rendered(props);
        });
        await waitFor(() => {
            screen.debug();
        });
    });

    // it("tests the email verification boolean"), async () => {
    //     rendered(props)
    //     await userEvent.click(screen.getByTestId('setIsEmailVerificationOpen'))
    // };
});

describe("Tests the http requests", () => {
    it("opens cart modal", async () => {
        rendered(props);
        userEvent.click(screen.getByTestId("handleCloseModal"));
    });

    it("tests postOrder request", async () => {
        rendered(props);

        await userEvent.click(screen.getByTestId("postOrder"));
    });

    it("tests addCart request", async () => {
        rendered(props);

        await userEvent.click(screen.getByTestId("addCart"));
    });

    it("tests addUser request", async () => {
        rendered(props);
        const axiosGetSpy = vi.spyOn(axios, "get");

        const mockResponse = {
            data: [
                {
                    user_id: 7,
                    name: "Scott Phan",
                    email: "scott19023@gmail.com",
                },
            ],
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
        };

        const axiosGetMock = vi.fn().mockResolvedValue(mockResponse);

        axiosGetSpy.mockImplementation(axiosGetMock);
        await userEvent.click(screen.getByTestId("addUser"));
        axiosGetSpy.mockRestore();
    });

    it("tests checkVerification request", async () => {
        rendered(props);

        await userEvent.click(screen.getByTestId("checkVerification"));
    });

    it("tests getUserId request", async () => {
        rendered(props);

        const axiosGetSpy = vi.spyOn(axios, "get");

        const mockResponse = {
            data: [
                {
                    user_id: 7,
                    name: "Scott Phan",
                    email: "scott19023@gmail.com",
                },
            ],
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
        };

        const axiosGetMock = vi.fn().mockResolvedValue(mockResponse);

        axiosGetSpy.mockImplementation(axiosGetMock);
        await userEvent.click(screen.getByTestId("getUserId"));
        axiosGetSpy.mockRestore();
    });

    it("tests getCart request", async () => {
        rendered(props);

        const axiosGetSpy = vi.spyOn(axios, "get");

        const mockResponse = {
            data: [
                {
                    4: {
                        name: "XX99 Mark II Headphones",
                        image: "/assets/cart/image-xx99-mark-two-headphones.jpg",
                        quantity: 1,
                        price: "2999.00",
                        total: 2999,
                        id: 4,
                        weight: "1.60",
                    },
                },
            ],
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
        };

        const axiosGetMock = vi.fn().mockResolvedValue(mockResponse);

        axiosGetSpy.mockImplementation(axiosGetMock);
        await userEvent.click(screen.getByTestId("getCart"));
        axiosGetSpy.mockRestore();
    });

    it("tests getShippingData request", async () => {
        rendered(props);

        const axiosGetSpy = vi.spyOn(axios, "get");

        const mockResponse = {
            data: {
                shippingRate: {
                    rateResponse: {
                        rates: [
                            {
                                rateId: "se-4375069240",
                                rateType: "shipment",
                                carrierId: "se-5035034",
                                shippingAmount: {
                                    currency: "usd",
                                    amount: 124.98,
                                },
                                insuranceAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                confirmationAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                otherAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                taxAmount: null,
                                zone: null,
                                packageType: null,
                                deliveryDays: 1,
                                guaranteedService: true,
                                estimatedDeliveryDate: "2023-10-21T12:00:00Z",
                                carrierDeliveryDays: "Tomorrow by 12:00 PM",
                                shipDate: "2023-10-20T00:00:00Z",
                                negotiatedRate: false,
                                serviceType: "UPS Next Day Air®",
                                serviceCode: "ups_next_day_air",
                                trackable: true,
                                carrierCode: "ups",
                                carrierNickname:
                                    "ShipEngine Test Account - UPS",
                                carrierFriendlyName: "UPS",
                                validationStatus: "valid",
                                warningMessages: [],
                                errorMessages: [],
                            },
                            {
                                rateId: "se-4375069241",
                                rateType: "shipment",
                                carrierId: "se-5035034",
                                shippingAmount: {
                                    currency: "usd",
                                    amount: 58.48,
                                },
                                insuranceAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                confirmationAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                otherAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                taxAmount: null,
                                zone: null,
                                packageType: null,
                                deliveryDays: 2,
                                guaranteedService: true,
                                estimatedDeliveryDate: "2023-10-24T23:00:00Z",
                                carrierDeliveryDays:
                                    "Tuesday 10/24 by 11:00 PM",
                                shipDate: "2023-10-20T00:00:00Z",
                                negotiatedRate: false,
                                serviceType: "UPS 2nd Day Air®",
                                serviceCode: "ups_2nd_day_air",
                                trackable: true,
                                carrierCode: "ups",
                                carrierNickname:
                                    "ShipEngine Test Account - UPS",
                                carrierFriendlyName: "UPS",
                                validationStatus: "valid",
                                warningMessages: [],
                                errorMessages: [],
                            },
                            {
                                rateId: "se-4375069242",
                                rateType: "shipment",
                                carrierId: "se-5035034",
                                shippingAmount: {
                                    currency: "usd",
                                    amount: 22.81,
                                },
                                insuranceAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                confirmationAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                otherAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                taxAmount: null,
                                zone: null,
                                packageType: null,
                                deliveryDays: 3,
                                guaranteedService: true,
                                estimatedDeliveryDate: "2023-10-25T23:00:00Z",
                                carrierDeliveryDays:
                                    "Wednesday 10/25 by 11:00 PM",
                                shipDate: "2023-10-20T00:00:00Z",
                                negotiatedRate: false,
                                serviceType: "UPS® Ground",
                                serviceCode: "ups_ground",
                                trackable: true,
                                carrierCode: "ups",
                                carrierNickname:
                                    "ShipEngine Test Account - UPS",
                                carrierFriendlyName: "UPS",
                                validationStatus: "valid",
                                warningMessages: [],
                                errorMessages: [],
                            },
                            {
                                rateId: "se-4375069243",
                                rateType: "shipment",
                                carrierId: "se-5035034",
                                shippingAmount: {
                                    currency: "usd",
                                    amount: 47.77,
                                },
                                insuranceAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                confirmationAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                otherAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                taxAmount: null,
                                zone: null,
                                packageType: null,
                                deliveryDays: 3,
                                guaranteedService: true,
                                estimatedDeliveryDate: "2023-10-25T23:00:00Z",
                                carrierDeliveryDays:
                                    "Wednesday 10/25 by 11:00 PM",
                                shipDate: "2023-10-20T00:00:00Z",
                                negotiatedRate: false,
                                serviceType: "UPS 3 Day Select®",
                                serviceCode: "ups_3_day_select",
                                trackable: true,
                                carrierCode: "ups",
                                carrierNickname:
                                    "ShipEngine Test Account - UPS",
                                carrierFriendlyName: "UPS",
                                validationStatus: "valid",
                                warningMessages: [],
                                errorMessages: [],
                            },
                            {
                                rateId: "se-4375069244",
                                rateType: "shipment",
                                carrierId: "se-5035034",
                                shippingAmount: {
                                    currency: "usd",
                                    amount: 118.04,
                                },
                                insuranceAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                confirmationAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                otherAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                taxAmount: null,
                                zone: null,
                                packageType: null,
                                deliveryDays: 1,
                                guaranteedService: true,
                                estimatedDeliveryDate: "2023-10-23T23:00:00Z",
                                carrierDeliveryDays: "Monday 10/23 by 11:00 PM",
                                shipDate: "2023-10-20T00:00:00Z",
                                negotiatedRate: false,
                                serviceType: "UPS Next Day Air Saver®",
                                serviceCode: "ups_next_day_air_saver",
                                trackable: true,
                                carrierCode: "ups",
                                carrierNickname:
                                    "ShipEngine Test Account - UPS",
                                carrierFriendlyName: "UPS",
                                validationStatus: "valid",
                                warningMessages: [],
                                errorMessages: [],
                            },
                            {
                                rateId: "se-4375069245",
                                rateType: "shipment",
                                carrierId: "se-5035034",
                                shippingAmount: {
                                    currency: "usd",
                                    amount: 160.53,
                                },
                                insuranceAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                confirmationAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                otherAmount: {
                                    currency: "usd",
                                    amount: 0,
                                },
                                taxAmount: null,
                                zone: null,
                                packageType: null,
                                deliveryDays: 1,
                                guaranteedService: true,
                                estimatedDeliveryDate: "2023-10-21T09:00:00Z",
                                carrierDeliveryDays: "Tomorrow by 09:00 AM",
                                shipDate: "2023-10-20T00:00:00Z",
                                negotiatedRate: false,
                                serviceType: "UPS Next Day Air® Early",
                                serviceCode: "ups_next_day_air_early_am",
                                trackable: true,
                                carrierCode: "ups",
                                carrierNickname:
                                    "ShipEngine Test Account - UPS",
                                carrierFriendlyName: "UPS",
                                validationStatus: "valid",
                                warningMessages: [],
                                errorMessages: [],
                            },
                        ],
                    },
                },
            },
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
        };

        const axiosGetMock = vi.fn().mockResolvedValue(mockResponse);

        axiosGetSpy.mockImplementation(axiosGetMock);
        await userEvent.click(screen.getByTestId("getShippingData"));
        axiosGetSpy.mockRestore();
    });
});

describe("useLayoutContext", () => {
    it("calls useOutletContext and returns its result", () => {
        const mockContext = "Mocked Context";
        (useOutletContext as Mock).mockReturnValue(mockContext);

        const { result } = renderHook(() => useLayoutOutletContext());

        expect(useOutletContext).toHaveBeenCalledTimes(1);
        expect(result.current).toBe(mockContext);
    });
});
