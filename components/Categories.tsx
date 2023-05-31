import { Title } from "@mantine/core"
import { CatergoriesProps } from "../types"
import { Carousel } from "@mantine/carousel"

import Image from "next/image"

function Categories({ title }: CatergoriesProps) {
    return (
        <>
            <Title order={1} className="uppercase text-gray-600 pb-10" > {title} </Title>
            <div>
                <Carousel className="w-full" loop withControls={false} slideGap="md" slideSize="25%" align="center" slidesToScroll={3}>
                    <Carousel.Slide>
                        <Image src={""} alt="" />
                    </Carousel.Slide>
                </Carousel>
            </div>
        </>
    )
}

export default Categories