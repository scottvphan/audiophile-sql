export interface ProductImage {
    mobile: string;
    tablet: string;
    desktop: string;
}

export interface ProductCategory {
    mobile: string;
    tablet: string;
    desktop: string;
}

export interface ProductIncludesItem {
    quantity: number;
    item: string;
}

export interface ProductGalleryImages {
    mobile: string;
    tablet: string;
    desktop: string;
}

export interface Product {
    id: number;
    slug: string;
    name: string;
    image: ProductImage;
    category: string;
    categoryImage: ProductCategory;
    new: boolean;
    price: number;
    weight: number;
    description: string;
    features: string;
    includes: ProductIncludesItem[];
    gallery: {
        first: ProductGalleryImages;
        second: ProductGalleryImages;
        third: ProductGalleryImages;
    };
    others: {
        slug: string;
        name: string;
        image: ProductImage;
    }[];
}

export type ProductArray = Product[];
