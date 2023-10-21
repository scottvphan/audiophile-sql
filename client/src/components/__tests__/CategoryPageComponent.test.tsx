import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryPageComponent from "../CategoryPageComponent";
import { MemoryRouter } from "react-router-dom";

const data = {
    id: 2,
    slug: "xx59-headphones",
    name: "XX59 Headphones",
    image: {
        mobile: "/assets/product-xx59-headphones/mobile/image-product.jpg",
        tablet: "/assets/product-xx59-headphones/tablet/image-product.jpg",
        desktop: "/assets/product-xx59-headphones/desktop/image-product.jpg",
    },
    category: "headphones",
    category_image: {
        mobile: "/assets/product-xx59-headphones/mobile/image-category-page-preview.jpg",
        tablet: "/assets/product-xx59-headphones/tablet/image-category-page-preview.jpg",
        desktop:
            "/assets/product-xx59-headphones/desktop/image-category-page-preview.jpg",
    },
    new: false,
    price: "899.00",
    weight: "1.20",
    description:
        "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
    features:
        "These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.\n" +
        "\n" +
        "More than a simple pair of headphones, this headset features a pair of built-in microphones for clear, hands-free calling when paired with a compatible smartphone. Controlling music and calls is also intuitive thanks to easy-access touch buttons on the earcups. Regardless of how you use the XX59 headphones, you can do so all day thanks to an impressive 30-hour battery life that can be rapidly recharged via USB-C.",
    includes: [
        { item: "Headphone unit", quantity: 1 },
        { item: "Replacement earcups", quantity: 2 },
        { item: "User manual", quantity: 1 },
        { item: "3.5mm 5m audio cable", quantity: 1 },
    ],
    gallery: {
        first: {
            mobile: "/assets/product-xx59-headphones/mobile/image-gallery-1.jpg",
            tablet: "/assets/product-xx59-headphones/tablet/image-gallery-1.jpg",
            desktop:
                "/assets/product-xx59-headphones/desktop/image-gallery-1.jpg",
        },
        third: {
            mobile: "/assets/product-xx59-headphones/mobile/image-gallery-3.jpg",
            tablet: "/assets/product-xx59-headphones/tablet/image-gallery-3.jpg",
            desktop:
                "/assets/product-xx59-headphones/desktop/image-gallery-3.jpg",
        },
        second: {
            mobile: "/assets/product-xx59-headphones/mobile/image-gallery-2.jpg",
            tablet: "/assets/product-xx59-headphones/tablet/image-gallery-2.jpg",
            desktop:
                "/assets/product-xx59-headphones/desktop/image-gallery-2.jpg",
        },
    },
    others: [
        {
            name: "XX99 Mark II",
            slug: "xx99-mark-two-headphones",
            image: {
                mobile: "/assets/shared/mobile/image-xx99-mark-two-headphones.jpg",
                tablet: "/assets/shared/tablet/image-xx99-mark-two-headphones.jpg",
                desktop:
                    "/assets/shared/desktop/image-xx99-mark-two-headphones.jpg",
            },
        },
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
            name: "ZX9 Speaker",
            slug: "zx9-speaker",
            image: {
                mobile: "/assets/shared/mobile/image-zx9-speaker.jpg",
                tablet: "/assets/shared/tablet/image-zx9-speaker.jpg",
                desktop: "/assets/shared/desktop/image-zx9-speaker.jpg",
            },
        },
    ],
};
const props = {
    data: data,
};

const modifiedData = { ...data, new: true };
const moddedProps = {
    data: modifiedData
}

const rendered = (props: any) =>
    render(<CategoryPageComponent {...props} />, { wrapper: MemoryRouter });

describe("Renders Category Page Component", () => {
    it("Fully renders Category Page Component without a new product", () => {
        rendered(props);
        expect(screen.getByText('XX59 Headphones')).toBeInTheDocument()
    });
    it("Fully renders Category Page Component with a new product", () => {
        render(<CategoryPageComponent {...moddedProps} />, {wrapper: MemoryRouter})
        expect(screen.getByText('NEW PRODUCT')).toBeInTheDocument()
        screen.debug();
    })
});

