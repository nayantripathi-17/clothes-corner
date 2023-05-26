import { Grid } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks";
import Image from "next/image";
import { CartObject } from "../types";
import React from "react";

function ShoppingBag({ cart, cartCreateData, removeFromCart, setActiveTab }: { cart: CartObject, cartCreateData: any, removeFromCart: (key: string) => void, setActiveTab: React.Dispatch<React.SetStateAction<string | null>> }) {
    const { width, height } = useViewportSize();

    return (
        Object.keys(cart).filter(key => key != "cartDetails").length === 0 ?
            <p className="text-center text-lg">Your cart is empty</p>
            :
            width >= 1024 ?
                <>
                    <Grid grow className="mx-10 my-10">
                        <Grid.Col span={7} className="bg-gray-100 uppercase text-sm font-semibold border-b-2 border-gray-300 rounded-l-lg py-5 pl-5">
                            Product
                        </Grid.Col>
                        <Grid.Col span="auto" className="bg-gray-100 uppercase text-sm font-semibold border-b-2 border-gray-300 py-5">
                            Price
                        </Grid.Col>
                        <Grid.Col span="auto" className="bg-gray-100 uppercase text-sm font-semibold border-b-2 border-gray-300 py-5 flex flex-grow justify-center">
                            Quantity
                        </Grid.Col>
                        <Grid.Col span="auto" className="bg-gray-100 uppercase text-sm font-semibold border-b-2 border-gray-300 rounded-r-lg py-5">
                            Subtotal
                        </Grid.Col>
                        {Object.keys(cart).filter(key => key != "cartDetails").map((key: string) => {
                            return (
                                <React.Fragment key={key} >
                                    <Grid.Col span={7} className="flex flex-grow space-x-20 items-center pl-5 py-10 border-b-2 border-gray-300 rounded-l-lg">
                                        <Image
                                            src={cart[key].image}
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                            alt=""
                                            className="w-[12%] h-auto"
                                        />
                                        <div className="space-y-2">
                                            <p className="font-semibold text-lg">{cart[key].productName}</p>
                                            <div className="flex flex-grow space-x-7 tracking-wide">
                                                {cart[key].variant.title.split("/").map((type) => {
                                                    return <p key={type} className="bg-gray-200 p-1 px-3 rounded-lg font-semibold shadow-black shadow-sm">{type}</p>
                                                })}
                                            </div>
                                            <p className="text-gray-500 uppercase cursor-pointer" onClick={() => { removeFromCart(key) }}>Remove</p>
                                        </div>
                                    </Grid.Col>
                                    <Grid.Col span="auto" className=" py-5 border-b-2 border-gray-300 flex flex-grow items-center">
                                        <div>
                                            <p className="font-semibold line-through text-red-600">₹ {Number(cart[key].variant.price).toFixed(2)}</p>
                                            <p className="font-semibold text-gray-600">₹ {(Number(cart[key].actualPricePerUnit)).toFixed(2)}</p>
                                        </div>
                                    </Grid.Col>
                                    <Grid.Col span="auto" className=" py-5 border-b-2 border-gray-300 flex  flex-grow justify-center items-center">
                                        <p className="font-semibold ">{cart[key].quantity}</p>
                                    </Grid.Col>
                                    <Grid.Col span="auto" className=" py-5 border-b-2 border-gray-300 rounded-r-lg flex flex-grow  items-center">
                                        <p className="font-semibold text-gray-600">₹ {(Number(cart[key].actualPriceTotal)).toFixed(2)}</p>
                                    </Grid.Col>
                                </React.Fragment>
                            )
                        })}
                    </Grid>
                    <Grid className="uppercase text-sm mx-10 mb-10">
                        <Grid.Col offset={7} span={5} className="text-lg font-bold pb-5">
                            <p>Cart Totals</p>
                        </Grid.Col>
                        <Grid.Col offset={7} span={2} className="bg-gray-100 border border-gray-200 border-r-0 p-5 font-semibold">
                            <p>Subtotal</p>
                        </Grid.Col>
                        <Grid.Col span={3} className="flex flex-grow  border border-gray-200 p-5 text-base text-gray-600">
                            <p>₹ {cartCreateData.cost.subtotalAmount.amount}</p>
                        </Grid.Col>
                        <Grid.Col offset={7} span={2} className="bg-gray-100  border-0 border-l border-gray-200 p-5 font-semibold">
                            <p>Taxes</p>
                        </Grid.Col>
                        <Grid.Col span={3} className="flex flex-grow border border-gray-200 border-y-0 p-5 text-base text-gray-600">
                            <p>₹ {cartCreateData.cost.totalTaxAmount.amount}</p>
                        </Grid.Col>
                        <Grid.Col offset={7} span={2} className="bg-gray-100  border border-gray-200 border-r-0 p-5 font-semibold">
                            <p>Total</p>
                        </Grid.Col>
                        <Grid.Col span={3} className="flex flex-grow  border border-gray-200 p-5 text-base font-bold text-gray-600">
                            <p>₹ {cartCreateData.cost.totalAmount.amount}</p>
                        </Grid.Col>
                        <Grid.Col offset={7} span={5} className="p-0">
                            <button className="w-full py-2 border-black rounded-none border-2 bg-black text-white font-semibold tracking-wider hover:bg-gray-900 cursor-pointer"
                            onClick={()=>{setActiveTab("details")}}
                            >Proceed To Checkout</button>
                        </Grid.Col>
                    </Grid>
                </>
                : <>
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
                                    </div>
                                </div>
                                <div className="space-y-2 px-5 md:px-8 py-2 md:py-4 md:space-y-4">
                                    <div className="flex flex-grow justify-between">
                                        <p className="text-sm md:text-base text-gray-600">Price:</p>
                                        <div>
                                            <p className="text-sm md:text-base line-through text-red-600">₹ {Number(cart[key].variant.price).toFixed(2)}</p>
                                            <p className="text-sm md:text-base text-gray-600">₹ {(Number(cart[key].actualPricePerUnit)).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-grow justify-between">
                                        <p className="text-sm md:text-base text-gray-600">Quantity:</p>
                                        <p className="text-sm md:text-base text-gray-600">{cart[key].quantity}</p>
                                    </div>
                                    <div className="flex flex-grow justify-between">
                                        <p className="text-sm md:text-base font-medium text-gray-600">Subtotal:</p>
                                        <p className="text-sm md:text-base  font-medium text-gray-600">₹ {(Number(cart[key].actualPricePerUnit) * Number(cart[key].quantity)).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <Grid className="uppercase text-sm">
                        <Grid.Col span={12} className="text-lg font-bold pb-5">
                            <p>Cart Totals</p>
                        </Grid.Col>
                        <Grid.Col span={6} className="bg-gray-100 border border-gray-200 border-r-0 p-5 font-semibold">
                            <p>Subtotal</p>
                        </Grid.Col>
                        <Grid.Col span={6} className="flex flex-grow  border border-gray-200 p-5 text-base text-gray-600">
                            <p>₹ {cartCreateData.cost.subtotalAmount.amount}</p>
                        </Grid.Col>
                        <Grid.Col span={6} className="bg-gray-100 border-0 border-l border-gray-200 p-5 font-semibold">
                            <p>Taxes</p>
                        </Grid.Col>
                        <Grid.Col span={6} className="flex flex-grow border border-gray-200 border-y-0 p-5 text-base text-gray-600">
                            <p>₹ {cartCreateData.cost.totalTaxAmount.amount}</p>
                        </Grid.Col>
                        <Grid.Col span={6} className="bg-gray-100  border border-gray-200 border-r-0 p-5 font-semibold">
                            <p>Total</p>
                        </Grid.Col>
                        <Grid.Col span={6} className="flex flex-grow  border border-gray-200 p-5 text-base font-bold text-gray-600">
                            <p>₹ {cartCreateData.cost.totalAmount.amount}</p>
                        </Grid.Col>
                        <Grid.Col span={12} className="p-0">
                            <button className="w-full py-2 border-black rounded-none border-2 bg-black text-white font-semibold tracking-wider hover:bg-gray-900 cursor-pointer"
                                onClick={() => {setActiveTab("details")}}
                            >Proceed To Checkout</button>
                        </Grid.Col>
                    </Grid>
                </>
    )
}

export default ShoppingBag