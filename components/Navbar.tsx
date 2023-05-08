import { Burger, Header, Menu, Modal, Title } from "@mantine/core"
import Image from "next/image"
import SearchIcon from '@mui/icons-material/SearchOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { NavbarProps } from "../types";
import { useDisclosure } from "@mantine/hooks";
import LoginForm from "./LoginForm";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import LogoutForm from "./LogoutForm";
import { useRouter } from "next/router";
import { useViewportSize } from '@mantine/hooks';

function Navbar({ pages, logo_URL }: NavbarProps) {

  const { height, width } = useViewportSize()

  const [openedBurger, { toggle }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: session, status } = useSession()

  const router = useRouter()

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
        <LocalMallIcon className="text-black" />
        <PersonOutlineOutlinedIcon className="text-black cursor-pointer" onClick={open} />
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