import Navbar from '../../components/Navbar'

import Logo from "../../public/bonkers_corner_logo-new_vertical.svg"
import Footer from '../../components/Footer'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { shopifyInit } from '../../lib/shopify/shopifyInit'
import ProductPage from '../../components/ProductPage'


export default function ProductId({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (

        <main className="bg-white min-w-fit min-h-screen">
            <Navbar
                pages={["Men", "Women", "Accessories", "New In", "Disney", "Marvel", "Contact"]}
                logo_URL={Logo}
            />

            <div className="">
                <ProductPage product={JSON.parse(product)} />
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

    if (pid === undefined || Array.isArray(pid)) return {
        notFound: true
    }

    const product = await shopify?.rest.Product.find({ session, id: pid });

    if (product === null) return {
        notFound: true
    }

    return {
        props: {
            product: JSON.stringify(product)
        },
    };
}