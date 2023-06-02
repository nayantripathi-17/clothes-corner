import { Carousel } from "@mantine/carousel"
import { Title } from "@mantine/core"
import { ProductCarouselProps } from "../types"
import ProductMini from "./ProductMini"
import { useViewportSize } from "@mantine/hooks"
function ProductCarousel({ title, products }: ProductCarouselProps) {
    const { width } = useViewportSize()


    return (
        products.length > 0 ?
            (<>
                <Title order={1} className="uppercase text-gray-600 lg:pb-10" > {title} </Title>
                <div>
                    {<Carousel className={width >= 768 ? "w-full" : "w-fit mx-20 h-screen overflow-y-hidden mt-5"} withControls={false} loop slideGap={width >= 768 ? "md" : "xs"} slideSize="25%" align={width >= 768 ? "center" : "start"} slidesToScroll={1} orientation={width >= 768 ? "horizontal" : "vertical"}>
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