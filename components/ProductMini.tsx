import Image, { StaticImageData } from "next/image"
import { useState } from "react"
import { ProductMiniProps } from "../types"
import { useRouter } from "next/router"
import Link from "next/link"


function ProductMini({ product }: ProductMiniProps) {

    const [source, setSource] = useState<StaticImageData>(Array.isArray(product.images) && product?.images[0].src)
    const [isHovering, setIsHovering] = useState<Boolean>(false)

    const router = useRouter()

    return (
        <Link href={`/product/${product.id}`} target="_blank" className="cursor-pointer lg:flex lg:flex-col lg:items-center">
            <Image
                src={source}
                width="0"
                height="0"
                sizes="100vw"
                alt=""
                className=" pb-5 transition ease-in-out hover:scale-y-95 hover:-translate-y-7 duration-300 w-full h-auto"
                onMouseEnter={() => {
                    //@ts-ignore
                    {
                        Array.isArray(product.images) && product?.images?.[1]?.src && setSource(product?.images?.[1]?.src)
                    }
                    setIsHovering(true)
                }}
                onMouseLeave={() => {
                    //@ts-ignore
                    setSource(Array.isArray(product.images) && product?.images?.[0]?.src ? product?.images?.[0]?.src : "")
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
                <div className="text-left text-black flex flex-col space-y-1 tracking-tight md:flex-row md:items-center md:space-x-4 md:space-y-0">
                    <p className="text-gray-500 line-through text-sm">{Array.isArray(product.variants) && (product?.variants[0]?.compare_at_price) ? `₹ ${product?.variants[0]?.compare_at_price}` : ""}</p>
                    <p className="font-bold text-black">₹ {Array.isArray(product.variants) && product?.variants[0]?.price}</p>
                    <div className="bg-red-700 px-2 w-fit">
                        <p className="text-white font-extrabold">{Array.isArray(product.variants) && (product?.variants[0]?.compare_at_price) && product?.variants[0]?.price ? `-${(((product?.variants[0]?.compare_at_price - product?.variants[0]?.price) / product?.variants[0]?.compare_at_price) * 100).toFixed()} %` : ""}</p>
                    </div>
                </div>
            </div >
        </Link>
    )
}

export default ProductMini