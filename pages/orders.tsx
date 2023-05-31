import Navbar from '../components/Navbar'

import Logo from "../public/THE_13_LOGO_430x.webp"
import Footer from '../components/Footer'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { shopifyInit } from '../lib/shopify/shopifyInit'
import { useRef } from 'react'
import OrderComponent from '../components/OrderComponent'
import { initDB } from '../lib/firebase/intiDB'
import { doc, getDoc } from 'firebase/firestore'
import { getSession } from 'next-auth/react'
import { Order } from '@shopify/shopify-api/rest/admin/2023-04/order'


export default function Orders({ orders }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const ref = useRef<HTMLButtonElement>(null)
    const pages = [
        { title: "Men", link: "/" },
        { title: "Women", link: "/" },
        { title: "Orders", link: "/orders" },
        { title: "Contact", link: "/" },
    ]

    return (
        <main className="min-h-screen bg-white">
            <Navbar
                //@ts-ignore
                getRef={ref}
                pages={pages}
                logo_URL={Logo}
            />
            {/* @ts-ignore */}
            <OrderComponent orders={orders} />
            <Footer
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
                } />
        </main>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { shopify, session } = await shopifyInit();
    const userSession = await getSession(context);

    const db = await initDB();

    //@ts-ignore
    const userRef = doc(db, "users", `${userSession?.user?.phone}`)
    const userRes = (await getDoc(userRef)).data();

    if (!userRes) {
        return {
            notFound: true
        }
    }

    const { customer_id } = userRes;

    if (!customer_id) {
        return {
            notFound: true
        }
    }

    const { orders } = await shopify?.rest.Customer.orders({
        session,
        id: customer_id
    }) as { orders: Order[] };

    const ordersNew = await Promise.all(orders.map(async (order, indexOrd) => {
        if (order?.line_items === null || order?.line_items?.length === 0) {
            return { ...order }
        }
        const line_itemsNew = await Promise.all(order.line_items.map(async (item, indexLine) => {
            if (!item.product_id) {
                return { ...item, img_src: "" }
            }

            const productRes = await shopify?.rest?.Product?.find({
                session,
                id: String(item.product_id)
            })

            if (!(productRes && productRes.images && Array.isArray(productRes.images) && productRes.images.length > 0)) {
                return { ...item, img_src: "" }
            }

            return { ...item, img_src: String(productRes?.images?.[0]?.src) }
        }))

        return { ...order, line_items: line_itemsNew }
    }))


    return {
        props: {
            session: userSession,
            orders: ordersNew
        },
    };
}