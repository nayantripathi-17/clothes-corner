import { Header, Title } from "@mantine/core"
import Image from "next/image"
import SearchIcon from '@mui/icons-material/SearchOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { NavbarProps } from "../types";

function Navbar({ pages, logo_URL }: NavbarProps) {
  return (
    <Header height={80} className="flex grow justify-between py-5 px-8">
      <div className="text-black space-x-4 uppercase">
        {pages.map((page)=>{
          return <Title order={6} key={page} className="inline-block hover:underline align-middle">{page}</Title>
        })
        }
      </div>
      <div className="absolute right-[45%]">
        <Image
          src={logo_URL}
          alt="Logo"
        />
      </div> 
      <div className="space-x-4">
        <SearchIcon className="text-black" />
        <LocalMallIcon className="text-black" />
        <PersonOutlineOutlinedIcon className="text-black" />
      </div>
    </Header>
  )
}

export default Navbar