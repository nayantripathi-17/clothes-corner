import { FeaturesProps } from "../types"

function Features({ source, title, description }: FeaturesProps) {
  return (
    <div className="text-center">
      <img src={source} className="opacity-20 w-[45%] mx-auto"></img>
      <p className="pt-5 pb-7 text-gray-600 font-bold tracking-tight text-sm md:text-base lg:text-xl">{title}</p>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}

export default Features