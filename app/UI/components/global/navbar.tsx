'use client'

import Image from "next/image";
import { CTAButton } from "./button";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";

export function Navbar() {
    const { scrollY } = useScroll()
    const [scrollDir, setScrollDir] = useState('up')
    useMotionValueEvent(scrollY, 'change', (current) => {
        const diff = current - scrollY.getPrevious()
        setScrollDir(diff > 0 ? 'down' : 'up')
    })

    const drawerRef = useRef(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const openDrawer = () => {
        setIsDrawerOpen(true)
    }
    const closeDrawer = () => {
        setIsDrawerOpen(false)
    }

    return (
        <>
            <div className={`${scrollDir === 'up' ? 'translate-y-0' : '-translate-y-full'} transition-all duration-200 ease-in-out 
            flex fixed left-0 top-0 z-[99] w-full items-center justify-between h-16 py-3 px-8 bg-black/50 backdrop-blur-md text-white`}>
                <div
                    onClick={openDrawer}
                    className="flex items-center justify-center gap-x-5">
                    <Image
                        src={'/ph.png'}
                        alt="SnakeEater logo"
                        height={50}
                        width={50}
                        priority />

                    <p className="italic font-bold tracking-widest">
                        SnakeEater
                    </p>
                </div>

                <ul className="items-center justify-center gap-x-8 
            hidden md:flex
            *:text-lg *:cursor-pointer *:hover:scale-95 *:hover:text-emerald-200 *:transition-all *:duration-100 *:linear">
                    <li>
                        <Link href={'/theme'}>Tema</Link>
                    </li>
                    <li>
                        <Link href={'/#trending'}>Trending Tema</Link>
                    </li>
                    <li>
                        <Link href={'/#allFeatures'}>Fitur</Link>
                    </li>
                    <li>
                        <Link href={'/#priceList'}>Harga</Link>
                    </li>
                </ul>

                <CTAButton
                    text="Pesan Undangan"
                    colors="bg-emerald-500 text-black" />
            </div>
            <div onClick={closeDrawer}
                className={`absolute md:hidden w-full h-full bg-transparent ${isDrawerOpen ? 'z-[100]' : 'z-[-100]'}`}>
                <div ref={drawerRef}
                    className={`fixed transition-all duration-200 ease-in-out left-0 w-8/12 h-screen bg-gray-900 
                    ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}
                    py-14 flex flex-col items-center justify-start gap-10`}>
                    <div
                        className="flex flex-col items-center justify-center w-full gap-y-5">
                        <Image
                            src={'/ph.png'}
                            alt="SnakeEater logo"
                            height={50}
                            width={50}
                            priority />

                        <p className="italic font-bold tracking-widest">
                            SnakeEater
                        </p>
                    </div>

                    <ul className="items-center justify-center gap-y-8 flex flex-col
            *:text-lg *:cursor-pointer *:hover:scale-95 *:hover:text-emerald-200 *:transition-all *:duration-100 *:linear">
                        <li>
                            <Link href={'/theme'}>Tema</Link>
                        </li>
                        <li>
                            <Link href={'/#trending'}>Trending Tema</Link>
                        </li>
                        <li>
                            <Link href={'/#allFeatures'}>Fitur</Link>
                        </li>
                        <li>
                            <Link href={'/#priceList'}>Harga</Link>
                        </li>
                    </ul>

                    <CTAButton
                        text="Pesan Undangan"
                        colors="bg-emerald-500 text-black" />
                </div>
            </div>
        </>
    )
}