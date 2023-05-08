import Navbar from '../components/Navbar'
import { Inter } from 'next/font/google'

import Logo from "../public/bonkers_corner_logo-new_vertical.svg"
import AllCollections from "../public/main_banner_desk.webp"
import Women from "../public/womens_banner_desk.webp"
import Men from "../public/mens_banner_desk.webp"
import Offer from "../public/offergif-1.gif"

import Banner from '../components/Banner'
import Slide from '../components/Slide'
import Categories from '../components/Categories'
import ProductCarousel from '../components/ProductCarousel'
import Socials from '../components/Socials'
import Features from '../components/Features'
import Footer from '../components/Footer'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { shopifyInit } from '../lib/shopify/shopifyInit'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="min-h-screen bg-white min-w-fit">
      <Navbar
        pages={["Men", "Women", "Accessories", "New In", "Disney", "Marvel", "Contact"]}
        logo_URL={Logo}
      />
      <Banner imgsrc={AllCollections} alt="" width={100} link="/" />
      <div className="flex py-10">
        <Banner imgsrc={Women} alt="" width={50} link="/" />
        <Banner imgsrc={Men} alt="" width={50} link="/" />
      </div>
      <div><Slide /></div>
      <div className="py-10">
        <Banner imgsrc={Offer} alt="Offer" width={100} link="/" />
      </div>
      <div className="text-center">
        <Categories title="Categories" />
      </div>
      <div className="text-center py-10">
        <ProductCarousel title="New In" products={JSON.parse(products)} />
      </div>
      <div className="text-center py-10">
        <ProductCarousel title="Best Sellers" products={JSON.parse(products)} />
      </div>
      <Socials />
      <div className="flex px-16 py-10">
        <Features
          source="https://assets.bonkerscorner.com/uploads/2021/10/25134929/shipping_under_48.jpg"
          title="SHIPPING WITHIN 48 HOURS"
          description="Your order will be shipped within 48 hours from the time since order is placed!"
        />
        <Features
          source="https://assets.bonkerscorner.com/uploads/2021/10/25134930/free_delivery.jpg"
          title="5% OFF || FREE DELIVERY"
          description="5% OFF on Pre-paid orders. Free delivery on COD orders above ₹1499."
        />
        <Features
          source="https://assets.bonkerscorner.com/uploads/2021/06/21165927/1592433.jpg"
          title="MADE IN INDIA"
          description="Our products are 100% made in India. From raw fabric to the final product!"
        />
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

export async function getServerSideProps() {
  const { shopify, session } = await shopifyInit();
  const products = await shopify?.rest.Product.all({ session });


  return {
    props: {
      products: JSON.stringify(products.data)
    },
  };
}