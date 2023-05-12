import { Burger, Header, Menu, Modal, Title } from "@mantine/core"
import Image from "next/image"
import SearchIcon from '@mui/icons-material/SearchOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { NavbarProps } from "../types";
import { useDisclosure } from "@mantine/hooks";
import LoginForm from "./LoginForm";
import { useSession } from "next-auth/react";
import LogoutForm from "./LogoutForm";
import { useRouter } from "next/router";
import { useViewportSize } from '@mantine/hooks';
import Cart from "./Cart";
import { initDB } from "../lib/firebase/intiDB";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function Navbar({ pages, logo_URL, getRef }: NavbarProps) {

  const { height, width } = useViewportSize()

  const [openedBurger, { toggle }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: session, status } = useSession()
  const [cart, setCart] = useState<{}>({})

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

      Object.keys(cartProducts).forEach((variantId) => {
        (cartProducts[variantId]).variant = JSON.parse((cartProducts[variantId]).variant)
      })

      const sortedCartProducts = Object.keys(cartProducts).sort().reduce((acc, key) => {
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
      const newDoc = { [variantId]: deleteField() }

      await updateDoc(variantRef, newDoc);
      await getCart();

    } catch (err) { }
  }

  useEffect(() => {
    getCart()
  }, [status])

  return (
    <Header height={80} className="flex grow justify-between py-5 px-8">
      {width > 1100 ?
        <div className="text-black space-x-4 uppercase">
          {pages.map((page) => {
            return <Title key={page} className="inline-block hover:underline align-middle text-sm">{page}</Title>
          })
          }
        </div>
        :
        <Menu opened={openedBurger}>
          <Menu.Target>
            <Burger opened={openedBurger} onClick={toggle} />
          </Menu.Target>
          <Menu.Dropdown>
            {pages.map((page) => {
              return <Menu.Item key={page} className="align-middle text-sm">{page}</Menu.Item>
            })
            }
          </Menu.Dropdown>
        </Menu>
      }

      <div className={`${width > 1380 ? "absolute right-[45%]" : ""}`}>
        {<Image
          src={logo_URL}
          alt="Logo"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />}
      </div>
      <div className="space-x-4">
        <SearchIcon className="text-black" />
        <Menu position="bottom-end" onOpen={() => getCart()}>
          <Menu.Target>
            <LocalMallIcon className="text-black cursor-pointer" />
          </Menu.Target>
          <Menu.Dropdown className="border-2 border-black p-0 m-0">
            <Cart cart={cart} removeFromCart={removeFromCart} />
          </Menu.Dropdown>
        </Menu>
        <button className="text-black cursor-pointer" onClick={open} ref={getRef}>
          <PersonOutlineOutlinedIcon />
        </button>
        {session ?
          <Modal opened={opened} onClose={close} withCloseButton={false} centered>
            <LogoutForm />
          </Modal> :
          <Modal opened={opened} onClose={close} withCloseButton={false} centered>
            <LoginForm />
          </Modal>
        }
      </div>
    </Header >
  )
}

export default Navbar