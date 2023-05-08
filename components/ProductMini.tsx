import Image, { StaticImageData } from "next/image"
import Show1 from "../public/Bonkerscorner_show_no_mercy_121-1200x1800.webp"
import Show2 from "../public/Bonkerscorner_show_no_mercy_118-768x1152.webp"
import { useState } from "react"
import { ProductMiniProps } from "../types"
import { useRouter } from "next/router"


function ProductMini({ product }: ProductMiniProps) {

    const [source, setSource] = useState<StaticImageData>(Array.isArray(product.images) && product?.images[0].src)
    const [isHovering, setIsHovering] = useState<Boolean>(false)

    const router = useRouter()

    return (
        <div onClick={()=>router.push(`/product/${product.id}`)} className="cursor-pointer lg:flex lg:flex-col lg:items-center">
            <Image
                src={source}
                width="0"
                height="0"
                sizes="100vw"
                alt=""
                className=" pb-5 transition ease-in-out hover:scale-y-95 hover:-translate-y-7 duration-300 w-full h-auto"
                onMouseEnter={() => {
                    setSource(Array.isArray(product.images) && product?.images[1].src)
                    setIsHovering(true)
                }}
                onMouseLeave={() => {
                    setSource(Array.isArray(product.images) && product?.images[0].src)
                    setIsHovering(false)
                }}
            />
            <div className={isHovering ? "transition  ease-in-out duration-300 -translate-y-10" : ""}>
                <div className="text-left space-x-2 tracking-tighter">
                    {product.tags && typeof (product.tags) !== "string" && product.tags.map((tag) => {
                        return <p key={tag} className="uppercase inline-block font-medium text-xs text-gray-500">{tag}</p>
                    })}
                </div>
                <div className="text-left text-black">
                    <p className="font-bold">{product.title}</p>
                </div>
                <div className="text-left text-black space-x-4 tracking-tight">
                    <p className="text-gray-500 line-through inline-block text-sm">{Array.isArray(product.variants) && (product?.variants[0]?.compare_at_price) ? `₹ ${product?.variants[0]?.compare_at_price}` : ""}</p>
                    <p className="font-bold text-black inline-block">₹ {Array.isArray(product.variants) && product?.variants[0]?.price}</p>
                    <div className="bg-red-700 px-2 inline-block">
                        <p className="text-white font-extrabold text-left">{Array.isArray(product.variants) && (product?.variants[0]?.compare_at_price) && product?.variants[0]?.price?`-${((product?.variants[0]?.compare_at_price-product?.variants[0]?.price)/product?.variants[0]?.compare_at_price).toFixed()} %`:""}</p>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default ProductMini