import { Grid } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks";
import Image from "next/image";
import { CartObject } from "../types";
import React from "react";
import dynamic from "next/dynamic";

function ShoppingBag({ cart, cartCreateData, removeFromCart, setActiveTab }: { cart: CartObject | {}, cartCreateData: any, removeFromCart: (key: string) => void, setActiveTab: React.Dispatch<React.SetStateAction<string | null>> }) {
    const { width, height } = useViewportSize();
    const LaptopView = dynamic(() => import("./ProductDisplayLaptop"), {
        ssr: false
    })
    const MobileView = dynamic(() => import("./ProductDisplayMobile"), {
        ssr: false
    })


    return (
        Object.keys(cart).filter(key => key != "cartDetails").length === 0 ?
            <p className="text-center text-lg">Your cart is empty</p>
            :
            width >= 1024 ?
                <LaptopView cart={cart} cartCreateData={cartCreateData} removeFromCart={removeFromCart} setActiveTab={setActiveTab} />
                :
                <MobileView cart={cart} cartCreateData={cartCreateData} removeFromCart={removeFromCart} setActiveTab={setActiveTab} />
    )
}

export default ShoppingBag