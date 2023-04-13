import { Title } from "@mantine/core"
import { CatergoriesProps } from "../types"
import { Carousel } from "@mantine/carousel"

import Men1 from "../public/menssweat.webp"
import Men2 from "../public/mensbottom.webp"
import Women1 from "../public/womenssweat.webp"
import Women2 from "../public/womensbottom.webp"
import Men3 from "../public/mensbasic.webp"
import Men4 from "../public/mensOST.webp"
import Women3 from "../public/womensbasic.webp"
import Women4 from "../public/womensOST.webp"

import Image from "next/image"

function Categories({ title }: CatergoriesProps) {
    return (
        <>
            <Title order={1} className="uppercase text-gray-600 pb-10" > {title} </Title>
            <div>
                <Carousel className="w-full" loop withControls={false} slideGap="md" slideSize="25%" align="center" slidesToScroll={3}>
                    <Carousel.Slide>
                        <Image src={Men1} alt="" />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={Women1} alt="" />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={Men2} alt="" />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={Women2} alt="" />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={Men3} alt="" />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={Women3} alt="" />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={Men4} alt="" />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={Women4} alt="" />
                    </Carousel.Slide>
                </Carousel>
            </div>
        </>
    )
}

export default Categories