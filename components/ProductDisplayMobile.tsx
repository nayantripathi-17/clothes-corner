import React from 'react'
import { CartObject } from '../types'
import Image from 'next/image'
import { Grid } from '@mantine/core'

function ProductDisplayMobile({ cart, cartCreateData, removeFromCart, setActiveTab }: { cart: CartObject, cartCreateData: any, removeFromCart: (key: string) => void, setActiveTab: React.Dispatch<React.SetStateAction<string | null>> }) {
    return (
        <>
            {Object.keys(cart).filter(key => key != "cartDetails").map((key: string) => {
                return (
                    <div key={key} className="py-5">
                        <div className="flex flex-grow space-x-5 ">
                            <Image
                                src={cart[key].image}
                                width="0"
                                height="0"
                                sizes="100vw"
                                alt=""
                                className="w-1/4 md:w-1/6 h-auto border"
                            />
                            <div className="space-y-2 pt-5 md:pt-8">
                                <p className="text-sm md:text-base font-medium">
                                    {cart[key].productName} - {cart[key].variant.title}
                                </p>
                                <p className="text-gray-500 uppercase cursor-pointer" onClick={() => { removeFromCart(key) }}>Remove</p>
                            </div>
                        </div>
                        <div className="space-y-2 px-5 md:px-8 py-2 md:py-4 md:space-y-4">
                            <div className="flex flex-grow justify-between">
                                <p className="text-sm md:text-base text-gray-600">Price:</p>
                                <div>
                                    <p className="text-sm md:text-base line-through text-red-600">₹ {Number(cart[key]?.variant?.price).toFixed(2)}</p>
                                    <p className="text-sm md:text-base text-gray-600">₹ {(Number(cart[key]?.actualPricePerUnit)).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex flex-grow justify-between">
                                <p className="text-sm md:text-base text-gray-600">Quantity:</p>
                                <p className="text-sm md:text-base text-gray-600">{cart[key]?.quantity}</p>
                            </div>
                            <div className="flex flex-grow justify-between">
                                <p className="text-sm md:text-base font-medium text-gray-600">Subtotal:</p>
                                <p className="text-sm md:text-base  font-medium text-gray-600">₹ {(Number(cart[key]?.actualPricePerUnit) * Number(cart[key]?.quantity)).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                )
            })
            }
            <Grid className="uppercase text-sm">
                <Grid.Col span={12} className="text-lg font-bold pb-5">
                    <p>Cart Totals</p>
                </Grid.Col>
                <Grid.Col span={6} className="bg-gray-100 border border-gray-200 border-r-0 p-5 font-semibold">
                    <p>Subtotal</p>
                </Grid.Col>
                <Grid.Col span={6} className="flex flex-grow  border border-gray-200 p-5 text-base text-gray-600">
                    <p>₹ {cartCreateData?.cost?.subtotalAmount?.amount ? cartCreateData?.cost?.subtotalAmount?.amount : "NA"}</p>
                </Grid.Col>
                <Grid.Col span={6} className="bg-gray-100 border-0 border-l border-gray-200 p-5 font-semibold">
                    <p>Taxes</p>
                </Grid.Col>
                <Grid.Col span={6} className="flex flex-grow border border-gray-200 border-y-0 p-5 text-base text-gray-600">
                    <p>₹ {cartCreateData?.cost?.totalTaxAmount?.amount ? cartCreateData?.cost?.totalTaxAmount?.amount : "NA"}</p>
                </Grid.Col>
                <Grid.Col span={6} className="bg-gray-100  border border-gray-200 border-r-0 p-5 font-semibold">
                    <p>Total</p>
                </Grid.Col>
                <Grid.Col span={6} className="flex flex-grow  border border-gray-200 p-5 text-base font-bold text-gray-600">
                    <p>₹ {cartCreateData?.cost?.totalAmount?.amount ? cartCreateData?.cost?.totalAmount?.amount : "NA"}</p>
                </Grid.Col>
                <Grid.Col span={12} className="p-0">
                    <button className="w-full py-2 border-black rounded-none border-2 bg-black text-white font-semibold tracking-wider hover:bg-gray-900 cursor-pointer"
                        onClick={() => { setActiveTab("details") }}
                    >Proceed To Checkout</button>
                </Grid.Col>
            </Grid>
        </>)
}

export default ProductDisplayMobile