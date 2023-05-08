import { Product } from "@shopify/shopify-api/rest/admin/2023-04/product"
import { ConfirmationResult } from "firebase/auth"
import { RequestInternal } from "next-auth"
import { StaticImageData } from "next/image"

export declare interface NavbarProps {
    pages: string[],
    logo_URL: string
}

export declare interface BannerProps {
    imgsrc: StaticImageData,
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