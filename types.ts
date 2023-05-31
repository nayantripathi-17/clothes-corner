import { Product } from "@shopify/shopify-api/rest/admin/2023-04/product"
import { ConfirmationResult } from "firebase/auth"
import { RequestInternal } from "next-auth"
import { StaticImageData } from "next/image"
import { MutableRefObject } from "react"


export declare interface NavbarProps {
    pages: {
        title: string,
        link: string
    }[],
    logo_URL: string | StaticImageData,
    getRef: MutableRefObject<HTMLButtonElement>
}

export declare interface FooterLinksProps {
    logo_URL: string | StaticImageData,
    data: {
        title: string;
        links: { label: string; link: string }[];
    }[];
}

export declare interface BannerProps {
    imgsrc: string | StaticImageData,
    link: string,
    alt: string,
    width: number
}

export declare interface CatergoriesProps {
    title: string,
}
export declare interface ProductCarouselProps {
    title: string,
    products: Product[]
}
export declare interface ProductMiniProps {
    product: Product
}

export declare interface FeaturesProps {
    source: string,
    title: string,
    description: string
}

export declare interface CredentialType {
    phone: string,
    otp: string,
    confirmationResult: ConfirmationResult
}

export declare interface authorizeType {
    credentials: CredentialType,
    req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
}

export declare interface CartObject {
    [key: string]: {
        variant: {
            [key: string]: string
        },
        quantity: number,
        image: string,
        productName: string,
        actualPricePerUnit: number,
        actualPriceTotal: number,
    }
}

export declare interface CartProductProps {
    variantId: string,
    imgSrc: string,
    productName: string,
    quantity: number,
    productTitle: string,
    price: number,
    actualPricePerUnit: number
    removeFromCart: (variantId: string) => Promise<void>,
    actualPriceTotal: number
}

export declare interface AddressComponentProps {
    address: {
        streetAddressLine1: string;
        streetAddressLine2: string;
        city: string;
        state: string;
        zip: string;
    },
    setAddress: React.Dispatch<React.SetStateAction<{
        streetAddressLine1: string;
        streetAddressLine2: string;
        city: string;
        state: string;
        zip: string;
    }>>,
    disabled: boolean
}

export declare interface CustomerDetails {
    title: "mr" | "mrs" | "ms",
    fName: string,
    lName: string,
    email: string,
    phone: string,
    shippingAddress: {
        streetAddressLine1: string;
        streetAddressLine2: string;
        city: string;
        state: string;
        zip: string;
    },
    billingAddress: {
        streetAddressLine1: string;
        streetAddressLine2: string;
        city: string;
        state: string;
        zip: string;
    }
}