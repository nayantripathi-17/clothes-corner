import Navbar from '../components/Navbar'
import Logo from "../public/bonkers_corner_logo-new_vertical.svg"
import Footer from '../components/Footer'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRef } from 'react'

import Cart from '../components/Cart'
import { getSession } from 'next-auth/react'
import { doc, getDoc } from 'firebase/firestore'
import { initDB } from '../lib/firebase/intiDB'
import { fetchCart } from '../lib/gql/mutateCartQuery'

export default function ProductId({ userCart, cartCreateData }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const ref = useRef<HTMLButtonElement>(null)

    return (

        <main className="min-h-screen bg-white">
            <Navbar
                //@ts-ignore
                getRef={ref}
                pages={["Men", "Women", "Accessories", "New In", "Disney", "Marvel", "Contact"]}
                logo_URL={Logo}
            />
            <div className="min-h-screen">
                <Cart userCart={userCart} userCartCreateData={cartCreateData} />
            </div>
            {/* <Footer
                logo_URL={Logo}
                data={[
                    {
                        title: "About",
                        links:
                            [{ label: "Features", link: "/" },
                            { label: "Pricing", link: "/" },
                            { label: "Support", link: "/" },
                            { label: "Forums", link: "/" }]
                    },
                    {
                        title: "About",
                        links:
                            [{ label: "Features", link: "/" },
                            { label: "Pricing", link: "/" },
                            { label: "Support", link: "/" },
                            { label: "Forums", link: "/" }]
                    },
                    {
                        title: "About",
                        links:
                            [{ label: "Features", link: "/" },
                            { label: "Pricing", link: "/" },
                            { label: "Support", link: "/" },
                            { label: "Forums", link: "/" }]
                    }
                ]
                } /> */}
        </main>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {


    const userSession = await getSession(context);
    const db = await initDB();

    //@ts-ignore
    const cartRef = doc(db, "cart", `${userSession?.user?.phone}`);
    const userCart = await getDoc(cartRef);

    if (!userCart.exists()) {

        return {
            props: {
                userCart: {},
                cartCreateData: {}
            },
        }
    }

    const data = userCart.data()
    if (Object.keys(data).filter(key => key != "cartDetails").length === 0) {
        return {
            props: {
                userCart: {}
            },
        }
    }

    //@ts-ignore
    const { body: { data: { cart: cartRes } } } = await fetchCart(String(data.cartDetails.cartId))

    const { lines: { edges: cartItems } } = cartRes;


    Object.keys(data).filter(key => key != "cartDetails").forEach((variantId) => {
        (data[variantId]).variant = JSON.parse((data[variantId]).variant)
    })
    //@ts-ignore
    cartItems.map((item) => {
        data[String(item?.node?.merchandise?.id).slice("gid://shopify/ProductVariant/".length)].actualPriceTotal = Number(item?.node?.cost?.totalAmount?.amount)
        data[String(item?.node?.merchandise?.id).slice("gid://shopify/ProductVariant/".length)].actualPricePerUnit = (Number(item?.node?.cost?.totalAmount?.amount) / Number(item?.node?.quantity)).toFixed(2)
    })

    const sortedCartProducts = Object.keys(data).filter(key => key != "cartDetails").sort().reduce((acc, key) => {
        //@ts-ignore
        acc[key] = data[key]
        return acc;
    }, {})

    return {
        props: {
            session: userSession,
            userCart: sortedCartProducts,
            cartCreateData: cartRes
        },
    };
}