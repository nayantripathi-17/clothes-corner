import Image from "next/image"
import { BannerProps } from "../types"
import { useRouter } from "next/router"
import Link from "next/link"

function Banner({ imgsrc, link, alt, width }: BannerProps) {
    const Router = useRouter()

    return (
        <Link href={link} target="_blank">
            <Image
                className={`cursor-pointer`}
                width="1000"
                height="1000"
                style={{ width: `${width}%` }}
                src={imgsrc}
                alt={alt}
            />
        </Link>
    )
}

export default Banner