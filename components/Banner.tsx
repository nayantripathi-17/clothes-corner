import Image from "next/image"
import { BannerProps } from "../types"
import { useRouter } from "next/router"

function Banner({ imgsrc, link, alt, width }: BannerProps) {
    const Router = useRouter()

    return (
        <Image
            className={`cursor-pointer`}    
            style={{ width: `${width}%` }}
            src={imgsrc}
            alt={alt}
            onClick={() => Router.push(link)}
        />
    )
}

export default Banner