import { NumberInput } from "@mantine/core"
import { Product } from "@shopify/shopify-api/rest/admin/2023-04/product"
import { Variant } from "@shopify/shopify-api/rest/admin/2023-04/variant"
import Image from "next/image"
import { useEffect, useState } from "react"
import QuantityCounter from "./QuantityCounter"
import { useViewportSize } from "@mantine/hooks"
import { Carousel } from "@mantine/carousel"

function ProductPage({ product }: { product: Product }) {

    const { width, height } = useViewportSize();

    const [selectedImage, setSelectedImage] = useState<string>(Array.isArray(product.images) ? product?.images[0]?.src : "")
    const [variantsAvailable, setVariantsAvailable] = useState<Map<string, Variant>>(new Map())
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(Array.isArray(product.variants) && (product.variants) ? product.variants[0] : {})
    const [selectedOptions, setSelectedOptions] = useState<{ option1: string | null, option2: string | null, option3: string | null }>(
        {
            //@ts-ignore
            option1: (product?.options?.[0]?.values[0]) ? String(product?.options?.[0]?.values[0]).toLowerCase() : null,
            //@ts-ignore
            option2: (product?.options?.[1]?.values[0]) ? String(product?.options?.[1]?.values[0]).toLowerCase() : null,
            //@ts-ignore
            option3: (product?.options?.[2]?.values[0]) ? String(product?.options?.[2]?.values[0]).toLowerCase() : null,
        })

    useEffect(() => {
        if (!product.variants) return

        product.variants.forEach((variant: Variant) => {
            variantsAvailable.set(`${String(variant.option1).toLowerCase()}${String(variant.option2).toLowerCase()}${String(variant.option3).toLowerCase()}`, variant)
        })

        setVariantsAvailable(variantsAvailable)

    }, [product, variantsAvailable])

    useEffect(() => {
        if (!product.variants) return

        const option1 = selectedOptions.option1
        const option2 = selectedOptions.option2
        const option3 = selectedOptions.option3

        const variant = variantsAvailable.get(`${option1}${option2}${option3}`)

        setSelectedVariant(variant ? variant : null)

    }, [selectedOptions, product.variants, variantsAvailable])

    //@ts-ignore
    const changeOption = (event, { value, indexOption }: { value: string, indexOption: number }) => {
        try {

            // const optionName = String(event.currentTarget.getAtrtibute("optionName")).toLowerCase()
            const optionValue = value.trim().toLowerCase()
            const optionNumber = `option${indexOption + 1}`

            setSelectedOptions({ ...selectedOptions, [optionNumber]: optionValue })

        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="lg:flex text-black lg:overflow-y-hidden min-h-screen">
            <div className="p-10 space-y-5 lg:pr-0 lg:flex lg:flex-grow lg:w-1/2 overflow-y-scroll scrollbar-hide">
                {width >= 1024 ?
                    <>
                        <div className="w-1/4 pr-10 space-y-5">
                            {product.images?.map((image: { src: string }, index: number) => {
                                return (
                                    <div key={index} className={`${(selectedImage === image.src) ? "border-2 border-black" : ""} p-1 transition cursor-pointer hover:scale-105`}>
                                        <Image
                                            src={image.src}
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                            alt=""
                                            className="w-full h-auto"
                                            onClick={() => setSelectedImage(image.src)}
                                        />
                                    </div>
                                )
                            })
                            }
                        </div>
                        <div className="w-3/4">
                            <Image
                                src={selectedImage}
                                width="0"
                                height="0"
                                sizes="100vw"
                                alt=""
                                className="w-full h-auto"
                            />
                        </div>
                    </> :
                    <>
                        <div className="">
                            <Image
                                src={selectedImage}
                                width="0"
                                height="0"
                                sizes="100vw"
                                alt=""
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="">
                            <Carousel className="w-full" loop withControls={false} slideGap="lg" slideSize="25%" align="center" slidesToScroll={1}>
                                {product.images?.map((image: { src: string }, index: number) => {
                                    return (
                                        <Carousel.Slide key={index} className={`${(selectedImage === image.src) ? "border-2 border-black" : ""} p-1`}>
                                            <Image
                                                src={image.src}
                                                width="0"
                                                height="0"
                                                sizes="100vw"
                                                alt=""
                                                className="w-full h-auto"
                                                onClick={() => setSelectedImage(image.src)}
                                            />
                                        </Carousel.Slide>
                                    )
                                })
                                }
                            </Carousel>
                        </div>
                    </>
                }
            </div>
            <div className="lg:w-1/2 p-10 lg:overflow-y-scroll scrollbar-hide">
                <p className="uppercase text-4xl">{product.title}</p>
                <p className="capitalize text-lg pt-2">₹ {selectedVariant?.price}</p>
                <hr className="h-px bg-gray-300 border-0 my-4" />
                {/*@ts-ignore*/}
                {product.options?.map((option, indexOption: number) => {
                    return (
                        <div key={indexOption} className="uppercase my-8">
                            <p className="tracking-widest font-light text-sm">{option.name}</p>
                            <div className="flex flex-grow pt-2 space-x-5 capitalize">
                                {option.values?.map((value: string, index: number) => {
                                    return (
                                        <p key={index} className={`${(selectedVariant?.option1 === value || selectedVariant?.option2 === value || selectedVariant?.option3 === value) ?
                                            "border-2 border-black"
                                            : "border border-gray-200"} rounded-lg text-sm p-3 cursor-pointer`}
                                            onClick={(e) => changeOption(e, { value, indexOption })}
                                        >{value}</p>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                <QuantityCounter max={selectedVariant?.inventory_quantity} />
            </div>
        </div>
    )
}

export default ProductPage