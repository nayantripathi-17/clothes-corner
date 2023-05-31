import { Text, Group } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FooterLinksProps } from '../types';
import Socials from './Socials';
import Link from 'next/link';


export default function FooterLinks({ logo_URL, data }: FooterLinksProps) {
    const Router = useRouter()


    return (
        <footer className="bg-black p-10 lg:py-20 lg:px-36">
            <div className="flex flex-col items-center md:flex-row md:justify-between md:flex-grow md:space-y-0 space-y-5">
                <div className="flex flex-col items-center">
                    <Image
                        src={logo_URL}
                        height={150}
                        alt="Logo"
                        sizes="100vw"
                        className="cursor-pointer invert my-5"
                    />
                    <Group spacing={0} position="left" noWrap>
                        <Socials color={"gray"} />
                    </Group>
                </div>
                <div className="flex space-x-12 md:space-x-20">
                    {data?.map((group, index) => {
                        return (
                            <div key={index}>
                                <p className="text-white font-bold text-xl mb-3">{group.title}</p>
                                {group?.links?.map((link, index) => {
                                    return (
                                        <Link key={index} href={link.link} target="_blank">
                                            <p className="text-gray-400 py-1 text-sm cursor-pointer">{link.label}</p>
                                        </Link>)
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
                    © 2023, Thethirteen
                </Text>

            </div>
        </footer >
    );
}