import { Burger, Drawer, Header, Menu, Modal, Title } from "@mantine/core"
import Image from "next/image"
// import SearchIcon from '@mui/icons-material/SearchOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { NavbarProps } from "../types";
import { useDisclosure } from "@mantine/hooks";
import LoginForm from "./LoginForm";
import { useSession } from "next-auth/react";
import LogoutForm from "./LogoutForm";
import { useRouter } from "next/router";
import { useViewportSize } from '@mantine/hooks';
import CartMini from "./CartMini";
import { initDB } from "../lib/firebase/intiDB";
import { deleteField, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fetchCart, removeCartLine } from "../lib/gql/mutateCartQuery";
import { createCart } from "../lib/shopify/createCart";
import Link from "next/link";

function Navbar({ pages, logo_URL, getRef }: NavbarProps) {

  const { width } = useViewportSize()

  const [openedBurger, { toggle }] = useDisclosure(false);
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [openedCartDrawer, { open: openCartDrawer, close: closeCartDrawer }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: session, status } = useSession()
  const [cart, setCart] = useState<{}>({})
  const [subTotal, setSubTotal] = useState<number>(0)

  const router = useRouter()

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

      const shopifyCart = await fetchCart(String(cartProducts?.cartDetails.cartId))
      //@ts-ignore
      if (!shopifyCart?.body?.data?.cart) {
        setCart({})
        //@ts-ignore
        await createCart(String(session?.user?.phone))
        return
      }
      //@ts-ignore
      setSubTotal(shopifyCart?.body?.data?.cart?.cost?.subtotalAmount?.amount)

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
      const cartId = cartProducts?.cartDetails.cartId

      await removeCartLine(lineIds, cartId)
      const newDoc = { [variantId]: deleteField() }

      await setDoc(variantRef, newDoc, { merge: true });
      await getCart();

    } catch (err) { }
  }

  useEffect(() => {
    getCart()
  }, [status])

  return (
    <Header height={100} className="flex grow justify-between py-5 px-8 items-center">
      {width > 1100 ?
        <div className="text-black space-x-4 uppercase">
          {pages.map((page) => {
            return (
              <Title key={page.title} className="inline-block hover:underline align-middle text-sm">
                <Link href={page.link} target="_blank">{page.title}</Link>
              </Title>)
          })
          }
        </div>
        :
        <>
          <Burger opened={openedBurger} onClick={() => { toggle(); openDrawer(); }} />
          <Drawer
            opened={openedDrawer}
            onClose={() => { closeDrawer(); toggle(); }}
            overlayProps={{ opacity: 0.7, blur: 4 }}
            size="90%"
            closeButtonProps={
              { size: "xl", title: "Close Drawer", variant: "light" }
            }
            classNames={
              { close: "text-black" }
            }
          >
            <div className="space-y-10 text-2xl pl-4 uppercase font-semibold">
              {pages.map((page) => {
                return <Link key={page.title} href={page.link} className="hover:text-gray-500" target="_blank"><p>{page.title}</p></Link>
              })
              }
            </div>
          </Drawer>
        </>
      }

      <div className={`${width > 1024 ? "absolute right-[45%]" : ""}`}>
        {<Image
          src={logo_URL}
          height={80}
          alt="Logo"
          sizes="100vw"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />}
      </div>
      <div className="space-x-4 min-w-fit">
        <FavoriteBorderOutlinedIcon className="text-black cursor-pointer hover:scale-110" />
        <LocalMallIcon className="text-black cursor-pointer hover:scale-110"
          onClick={router.pathname !== "/cart" ? async () => { getCart(); openCartDrawer() } : () => { router.reload() }}
        />
        {router.pathname !== "/cart" &&
          <Drawer
            opened={openedCartDrawer}
            onClose={closeCartDrawer}
            position="right"
            title="Cart"
            closeButtonProps={
              { size: "xl", title: "Close Drawer", variant: "light" }
            }
            classNames={
              {
                body: "p-0",
                close: "text-black",
                title: "text-center font-medium text-xl uppercase text-gray-500",
                content: "min-h-screen scrollbar-hide overflow-y-scroll"
              }
            }
            size={width >= 768 ? (width >= 1024) ? (width >= 1440) ? "40%" : "50%" : "70%" : "100%"}
          >
            <CartMini cart={cart} removeFromCart={removeFromCart} subTotal={subTotal} />
          </Drawer>
        }
        <button className="text-black cursor-pointer hover:scale-110" onClick={open} ref={getRef}>
          <PersonOutlineOutlinedIcon />
        </button>
        {session ?
          <Modal
            classNames={{
              body: "p-0 m-0",
            }}
            opened={opened}
            onClose={close}
            withCloseButton={false}
            size="sm"
            centered
          >
            <LogoutForm />
          </Modal> :
          <Modal
            classNames={{
              body: "p-0 m-0",
            }}
            opened={opened}
            onClose={close}
            withCloseButton={false}
            size="sm"
            centered
          >
            <LoginForm />
          </Modal>
        }
      </div>
    </Header >
  )
}

export default Navbar