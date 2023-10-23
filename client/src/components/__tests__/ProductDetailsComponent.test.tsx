/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductDetailsComponent from "../ProductDetailsComponent";
import { MemoryRouter } from "react-router-dom";

const props = {
    data: {
        id: 4,
        slug: "xx99-mark-two-headphones",
        name: "XX99 Mark II Headphones",
        image: {
            mobile: "/assets/product-xx99-mark-two-headphones/mobile/image-product.jpg",
            tablet: "/assets/product-xx99-mark-two-headphones/tablet/image-product.jpg",
            desktop:
                "/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg",
        },
        category: "headphones",
        category_image: {
            mobile: "/assets/product-xx99-mark-two-headphones/mobile/image-category-page-preview.jpg",
            tablet: "/assets/product-xx99-mark-two-headphones/tablet/image-category-page-preview.jpg",
            desktop:
                "/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg",
        },
        new: true,
        price: "2999.00",
        weight: "1.60",
        description:
            "The new XX99 Mark II headphones are the pinnacle of pristine audio. They redefine your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
        features:
            "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you’re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you’ll never miss a beat.\n" +
            "\n" +
            "The advanced Active Noise Cancellation with built-in equalizer allows you to experience your audio world on your terms. It lets you enjoy your audio in peace but quickly interact with your surroundings when you need to. Combined with Bluetooth 5.0 compliant connectivity and 17-hour battery life, the XX99 Mark II headphones give you superior sound, cutting-edge technology, and a modern design aesthetic.",
        includes: [
            { item: "Headphone unit", quantity: 1 },
            { item: "Replacement earcups", quantity: 2 },
            { item: "User manual", quantity: 1 },
            { item: "3.5mm 5m audio cable", quantity: 1 },
            { item: "Travel bag", quantity: 1 },
        ],
        gallery: {
            first: {
                mobile: "/assets/product-xx99-mark-two-headphones/mobile/image-gallery-1.jpg",
                tablet: "/assets/product-xx99-mark-two-headphones/tablet/image-gallery-1.jpg",
                desktop:
                    "/assets/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg",
            },
            third: {
                mobile: "/assets/product-xx99-mark-two-headphones/mobile/image-gallery-3.jpg",
                tablet: "/assets/product-xx99-mark-two-headphones/tablet/image-gallery-3.jpg",
                desktop:
                    "/assets/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg",
            },
            second: {
                mobile: "/assets/product-xx99-mark-two-headphones/mobile/image-gallery-2.jpg",
                tablet: "/assets/product-xx99-mark-two-headphones/tablet/image-gallery-2.jpg",
                desktop:
                    "/assets/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg",
            },
        },
        others: [
            {
                name: "XX99 Mark I",
                slug: "xx99-mark-one-headphones",
                image: {
                    mobile: "/assets/shared/mobile/image-xx99-mark-one-headphones.jpg",
                    tablet: "/assets/shared/tablet/image-xx99-mark-one-headphones.jpg",
                    desktop:
                        "/assets/shared/desktop/image-xx99-mark-one-headphones.jpg",
                },
            },
            {
                name: "XX59",
                slug: "xx59-headphones",
                image: {
                    mobile: "/assets/shared/mobile/image-xx59-headphones.jpg",
                    tablet: "/assets/shared/tablet/image-xx59-headphones.jpg",
                    desktop: "/assets/shared/desktop/image-xx59-headphones.jpg",
                },
            },
            {
                name: "ZX9 Speaker",
                slug: "zx9-speaker",
                image: {
                    mobile: "/assets/shared/mobile/image-zx9-speaker.jpg",
                    tablet: "/assets/shared/tablet/image-zx9-speaker.jpg",
                    desktop: "/assets/shared/desktop/image-zx9-speaker.jpg",
                },
            },
        ],
    }
};

vi.mock("../Layout", () => ({
    useLayoutOutletContext: () => ({
        cart: [
            {
                4: {
                    id: 4,
                    name: "XX99 Mark II Headphones",
                    image: "/assets/cart/image-xx99-mark-two-headphones.jpg",
                    price: "2999.00",
                    total: 2999,
                    weight: "1.60",
                    quantity: 1,
                },
            },
        ],
        setCart: vi.fn(),
        setIsCartOpen: vi.fn()
    }),
}));

const rendered = (props: any) =>
    render(<ProductDetailsComponent {...props} />, { wrapper: MemoryRouter });

describe("Renders Product Details Component", () => {
    it("Fully renders with product details", () => {
        rendered(props);
        screen.debug();
    });
});
