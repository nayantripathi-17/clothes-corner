import Navbar from '../components/Navbar'

import Logo from "../public/THE_13_LOGO_430x.webp"
import Banner from '../components/Banner'
import ProductCarousel from '../components/ProductCarousel'
import Socials from '../components/Socials'
import Features from '../components/Features'
import Footer from '../components/Footer'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { shopifyInit } from '../lib/shopify/shopifyInit'
import { useRef } from 'react'
import { getSession } from 'next-auth/react'


export default function Home({ products }: InferGetServerSidePropsType<typeof getServerSideProps>) {

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
      <Banner imgsrc={"/OUTFIT OF THE DAY.jpg"} alt="" width={100} link="#newIn" />
      <div className="flex py-10">
        <Banner imgsrc={"/VJA03822.JPG"} alt="" width={100} link="/" />
        <Banner imgsrc={"/VJA03822.JPG"} alt="" width={100} link="/" />
      </div>
      <div className="text-center py-10" id="newIn">
        <ProductCarousel title="New In" products={JSON.parse(products)} />
      </div>
      <div className="text-black flex flex-grow justify-center space-x-5 items-center py-10">
        <hr className="w-[40%] h-1 my-8 bg-gray-600 border-0 rounded"></hr>
        <Socials color={"dark"} />
        <hr className="w-[40%] h-1 my-8 bg-gray-600 border-0 rounded"></hr>
      </div>
      <div className="grid grid-cols-1 space-y-10 lg:space-y-0 lg:grid-cols-2 px-16 py-10">
        <Features
          source="/shipping_under_48.webp"
          title="SHIPPING WITHIN 48 HOURS"
          description="Your order will be shipped within 48 hours from the time since order is placed!"
        />

        <Features
          source="/1592433.webp"
          title="MADE IN INDIA"
          description="Our products are 100% made in India. From raw fabric to the final product!"
        />
      </div>
      <Footer
        logo_URL={Logo}
        data={[
          {
            title: "Policies",
            links:
              [{ label: "Refund Policy", link: "/" },
              { label: "Privacy Policy", link: "/" },
              { label: "Terms Of Service", link: "/" },
              { label: "Contact", link: "/" }]
          }
        ]
        } />
    </main>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { shopify, session } = await shopifyInit();
  const userSession = await getSession(context);

  const products = await shopify?.rest.Product.all({ session });


  return {
    props: {
      session: userSession,
      products: JSON.stringify(products.data)
    },
  };
}