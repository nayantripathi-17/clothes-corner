import React from 'react'
import { CartProductProps } from '../types'
import Image from 'next/image'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


function CartProduct({ variantId, imgSrc, productName, productTitle, quantity, price, actualPricePerUnit, removeFromCart, actualPriceTotal }: CartProductProps) {

    return (
        <div key={variantId} className="flex flex-grow w-full justify-between py-6 px-4 sm:justify-evenly hover:bg-gray-200">
            <div>
                <Image
                    src={imgSrc}
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt=""
                    className="w-20 h-auto"
                />
            </div>
            <div className="space-y-2">
                <p className="uppercase font-medium text-sm md:text-base">{productName} - {productTitle}</p>
                <div className="flex space-x-2 md:space-x-4 text-xs md:text-sm">
                    <p className="border-gray-300 border rounded-lg px-4 py-0.5">{quantity}</p>
                    <p className="text-gray-400 line-through">₹ {Number(price).toFixed(2)}</p>
                    <p className="text-red-600 font-medium">₹ {Number(actualPricePerUnit).toFixed(2)}</p>
                </div>
            </div>
            <div className="flex flex-col items-end space-y-2 text-sm md:text-base">
                <button className="text-red-600 hover:scale-110" onClick={() => { removeFromCart(variantId) }}>
                    <RemoveCircleOutlineIcon />
                </button>
                <p className="font-medium text-gray-500">₹ {Number(actualPriceTotal).toFixed(2)}</p>
            </div>
        </div>
    )
}

export default CartProduct