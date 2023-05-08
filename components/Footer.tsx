import { createStyles, Text, Container, ActionIcon, Group, rem } from '@mantine/core';
// import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
// import { MantineLogo } from '@mantine/ds';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Image from 'next/image';
import { useRouter } from 'next/router';



interface FooterLinksProps {
    logo_URL: string,
    data: {
        title: string;
        links: { label: string; link: string }[];
    }[];
}


export default function FooterLinks({ logo_URL, data }: FooterLinksProps) {
    const Router = useRouter()


    return (
        <footer className="bg-black p-10 lg:py-20 lg:px-36">
            <div className="flex flex-col items-center md:flex-row md:justify-between md:flex-grow md:space-y-0 space-y-5">
                <div className="flex flex-col items-center">
                    <Image
                        className="invert my-5"
                        src={logo_URL}
                        alt="Logo"
                    />
                    <Group spacing={0} position="left" noWrap>
                        <ActionIcon size="lg">
                            <InstagramIcon />
                        </ActionIcon>
                        <ActionIcon size="lg">
                            <FacebookOutlinedIcon />
                        </ActionIcon>
                        <ActionIcon size="lg">
                            <TwitterIcon />
                        </ActionIcon>
                        <ActionIcon size="lg">
                            <PinterestIcon />
                        </ActionIcon>
                    </Group>
                </div>
                <div className="flex space-x-24">
                    {data?.map((group, index) => {
                        return (
                            <div key={index} className="space-y-1">
                                <p className="text-white font-bold text-xl mb-3">{group.title}</p>
                                {group?.links?.map((link,index) => {
                                    return (<p key={index} className="text-gray-400 text-sm cursor-pointer" onClick={() => { Router.push(link.link) }}>{link.label}</p>)
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
            <hr className="h-[0.1rem] my-10 border-0 rounded bg-gray-500"></hr>
            <div
            >
                <Text color="dimmed" size="sm">
                    © 2022. All rights reserved.
                </Text>

            </div>
        </footer>
    );
}