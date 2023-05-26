import { Grid, Tabs } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks";
import Image from "next/image";
import React, { useState } from "react";
import { CartObject } from "../types";
import { initDB } from "../lib/firebase/intiDB";
import { deleteField, doc, getDoc, setDoc } from "firebase/firestore";
import { fetchCart, removeCartLine } from "../lib/gql/mutateCartQuery";
import { useSession } from "next-auth/react";
import ShoppingBag from "./ShoppingBag";
import CustomerDetailsForm from "./CustomerDetailsForm";


function Cart({ userCart, userCartCreateData }: { userCart: CartObject, userCartCreateData: any }) {

    const { width, height } = useViewportSize();
    const [activeTab, setActiveTab] = useState<string | null>("cart");
    const [cart, setCart] = useState<CartObject>(userCart);
    const [cartCreateData, setCartCreateData] = useState<any>(userCartCreateData);
    const { data: session, status } = useSession()


    const getCart = async () => {
        try {
            if (session === null) return

            const db = await initDB();
            //@ts-ignore
            const cartRef = doc(db, 'cart', `${session?.user?.phone}`);

            const cartProducts = (await getDoc(cartRef)).data();
            if (!cartProducts) {
                setCart({})
                return
            }
            console.log((cartProducts?.cartDetails.cartId))

            const shopifyCart = await fetchCart(String(cartProducts?.cartDetails.cartId))

            Object.keys(cartProducts).filter(key => key != "cartDetails").forEach((variantId) => {
                (cartProducts[variantId]).variant = JSON.parse((cartProducts[variantId]).variant)
            })

            //@ts-ignore
            shopifyCart?.body?.data?.cart?.lines?.edges?.forEach((item) => {
                cartProducts[String(item?.node?.merchandise?.id).slice("gid://shopify/ProductVariant/".length)].actualPriceTotal = Number(item?.node?.cost?.totalAmount?.amount)
                cartProducts[String(item?.node?.merchandise?.id).slice("gid://shopify/ProductVariant/".length)].actualPricePerUnit = (Number(item?.node?.cost?.totalAmount?.amount) / Number(item?.node?.quantity)).toFixed(2)
            })

            const sortedCartProducts = Object.keys(cartProducts).filter(key => key != "cartDetails").sort().reduce((acc, key) => {
                //@ts-ignore
                acc[key] = cartProducts[key]
                return acc;
            }, {})

            setCart(sortedCartProducts)
            //@ts-ignore
            setCartCreateData(shopifyCart?.body?.data?.cart)
        }
        catch (err) {

        }
    }

    const removeFromCart = async (variantId: string) => {
        try {
            if (session === null) return

            const db = await initDB();
            // @ts-ignore
            const variantRef = doc(db, 'cart', `${session?.user?.phone}`);
            const cartProducts = (await getDoc(variantRef)).data()

            if (cartProducts === undefined) return

            const lineIds: string[] = [];
            Object.keys(cartProducts).forEach((key) => {
                if (key === variantId) lineIds.push(String(cartProducts[key]?.cartLineId))
            })
            console.log(lineIds)
            const cartId = cartProducts?.cartDetails.cartId

            const cartRes = await removeCartLine(lineIds, cartId)
            const newDoc = { [variantId]: deleteField() }

            await setDoc(variantRef, newDoc, { merge: true });
            await getCart();

        } catch (err) { }
    }


    return (
        <div className="text-black p-5">
            <p className="text-2xl md:text-4xl font-bold text-gray-600 pb-5">Cart</p>
            <Tabs
                value={activeTab}
                onTabChange={setActiveTab}
                orientation={width >= 1024 ? "horizontal" : "vertical"}
                placement={width < 1024 ? "right" : undefined}
                classNames={width < 1024 ? {
                    root: "block",
                    tabsList: "",
                    panel: "w-full"
                } : {}}
            >
                <Tabs.List grow>
                    <Tabs.Tab color="gray" value="cart" icon={""}>
                        <div className="uppercase">
                            <p className="md:text-lg font-bold">Shopping Bag</p>
                            {width >= 1024 && <p className="hidden md:inline">View Your Items</p>}
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab color="gray" value="details" icon={""}>
                        <div className="uppercase">
                            <p className="md:text-lg font-bold">Shipping</p>
                            {width >= 1024 && <p className="hidden md:inline">Enter Your Details</p>}
                        </div>
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="cart" pt="lg" >
                    <ShoppingBag cart={cart} cartCreateData={cartCreateData} removeFromCart={removeFromCart} setActiveTab={setActiveTab} />
                </Tabs.Panel>
                x
                <Tabs.Panel value="details" pt="lg">
                    {/* @ts-ignore */}
                    <CustomerDetailsForm phone={`${session?.user?.phone}`} />
                </Tabs.Panel>
            </Tabs>

        </div>
    )
}

export default Cart