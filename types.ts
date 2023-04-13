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
}

export declare interface FeaturesProps {
    source: string,
    title: string,
    description: string
}