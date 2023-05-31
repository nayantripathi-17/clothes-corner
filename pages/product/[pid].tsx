import Navbar from '../../components/Navbar'

import Logo from "../../public/THE_13_LOGO_430x.webp"
import Footer from '../../components/Footer'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { shopifyInit } from '../../lib/shopify/shopifyInit'
import ProductPage from '../../components/ProductPage'
import { useRef } from 'react'
import { getSession } from 'next-auth/react'


export default function ProductId({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const ref = useRef<HTMLButtonElement>(null)
    const pages = [
        { title: "Men", link: "/" },
        { title: "Women", link: "/" },
        { title: "Orders", link: "/orders" },
        { title: "Contact", link: "/" },
    ]

    return (

        <main className="bg-white min-w-fit">
            <Navbar
                //@ts-ignore
                getRef={ref}
                pages={pages}
                logo_URL={Logo}
            />

            <div className="">
                {/* @ts-ignore */}
                <ProductPage product={JSON.parse(product)} getRef={ref} />
            </div>
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
    const { pid } = context.query

    const { shopify, session } = await shopifyInit();
    const userSession = await getSession(context)

    if (pid === undefined || Array.isArray(pid)) return {
        notFound: true
    }

    const product = await shopify?.rest.Product.find({ session, id: pid });

    if (product === null) return {
        notFound: true
    }

    return {
        props: {
            product: JSON.stringify(product),
            session: userSession
        },
    };
}