import { Carousel } from "@mantine/carousel"
import { Title } from "@mantine/core"
import Image from "next/image"

import Men1 from "../public/menssweat.webp"
import Men2 from "../public/mensbottom.webp"
import Women1 from "../public/womenssweat.webp"
import Women2 from "../public/womensbottom.webp"
import Men3 from "../public/mensbasic.webp"
import Men4 from "../public/mensOST.webp"
import Women3 from "../public/womensbasic.webp"
import Women4 from "../public/womensOST.webp"
import { ProductCarouselProps } from "../types"
import ProductMini from "./ProductMini"

function ProductCarousel({ title }: ProductCarouselProps) {
    return (
        <>
            <Title order={1} className="uppercase text-gray-600 pb-10" > {title} </Title>
            <div>
                <Carousel className="w-full" loop withControls={false} slideGap="md" slideSize="25%" align="center" slidesToScroll={3}>
                    <Carousel.Slide>
                        <ProductMini />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <ProductMini />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <ProductMini />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <ProductMini />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <ProductMini />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <ProductMini />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <ProductMini />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <ProductMini />
                    </Carousel.Slide>
                </Carousel>
            </div>
        </>
    )
}

export default ProductCarousel