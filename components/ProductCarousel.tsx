import { Carousel } from "@mantine/carousel"
import { Title } from "@mantine/core"
import { ProductCarouselProps } from "../types"
import ProductMini from "./ProductMini"
import { useState } from "react"
import { Product } from "@shopify/shopify-api/rest/admin/2023-04/product"

function ProductCarousel({ title, products }: ProductCarouselProps) {


    return (
        products.length > 0 ?
            (<>
                <Title order={1} className="uppercase text-gray-600 pb-10" > {title} </Title>
                <div>
                    {<Carousel className="w-full" loop withControls={false} slideGap="md" slideSize="25%" align="center" slidesToScroll={3}>
                        {products.map((product) => {
                            return <Carousel.Slide key={product.id}>
                                <ProductMini product={product} />
                            </Carousel.Slide>
                        })}
                    </Carousel>}
                </div>
            </>
            ) : <></>
    )
}

export default ProductCarousel