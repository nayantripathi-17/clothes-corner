import Image, { StaticImageData } from "next/image"
import Show1 from "../public/Bonkerscorner_show_no_mercy_121-1200x1800.webp"
import Show2 from "../public/Bonkerscorner_show_no_mercy_118-768x1152.webp"
import { useState } from "react"


function ProductMini() {
    const tags = ["Latest Collection", "Oversized T-Shirt"]
    const [source, setSource] = useState<StaticImageData>(Show1)
    const [isHovering, setIsHovering] = useState<Boolean>(false)


    return (
        <>
            <Image
                src={source}
                alt=""
                className=" pb-5 transition ease-in-out hover:scale-y-95 hover:-translate-y-7 duration-300"
                onMouseEnter={() => {
                    setSource(Show2)
                    setIsHovering(true)
                }}
                onMouseLeave={() => {
                    setSource(Show1)
                    setIsHovering(false)
                }}
            >
            </Image>
            <div className={isHovering ? "transition  ease-in-out duration-300 -translate-y-10" : ""}>
                <div className="text-left space-x-2 tracking-tighter">
                    {tags.map((tag) => {
                        return <p key={tag} className="uppercase inline-block font-medium text-xs text-gray-500">{tag}</p>
                    })}
                </div>
                <div className="text-left text-black">
                    <p className="font-bold">Show No Mercy Oversized T-Shirt</p>
                </div>
                <div className="text-left text-black space-x-4 tracking-tight">
                    <p className="text-gray-500 line-through inline-block text-sm">₹ 899</p>
                    <p className="font-bold text-black inline-block">₹ 599</p>
                <div className="bg-red-700 px-2 inline-block">
                    <p className="text-white font-extrabold text-left">-33 %</p>
                </div>
                </div>
            </div >
        </>
    )
}

export default ProductMini