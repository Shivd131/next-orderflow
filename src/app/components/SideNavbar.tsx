'use client'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useEffect, useState } from 'react';
import orderflow from "../../../public/assets/orderflow.svg";
import Image from 'next/image';
import { CiBoxList } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import Link from 'next/link';

const menuItems = [
    {
        icon: CiBoxList,
        href: '/inventory-view',
        name: 'Inventory'
    },
    {
        icon: CiShoppingCart,
        href: '/orders-view',
        name: 'Orders'
    }
];

const SideNavbar = () => {
    // a state to figure out the screen width for conditional rendering
    const [isScreenWide, setIsScreenWide] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            const isWide = window.innerWidth > 768;
            setIsScreenWide(isWide);
        };

        window.addEventListener('resize', handleResize);
        handleResize();//ffor each resize event, this will be called and will be constantly checked regularly

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
            {!isScreenWide ? (
                <Disclosure as="nav" className="md:flex md:flex-col md:w-60 md:fixed md:top-0 md:left-0">
                    {/* A disclosure button for tab view and below */}
                    <DisclosureButton className="absolute md:hidden top-4 right-4 rounded-md p-2 focus:ring-white shadow-2xl border border-gray-300 bg-white hover:scale-105 transition-all">
                        <GiHamburgerMenu className='block h-6 w-6 fill-gray-500' aria-hidden="true" />
                    </DisclosureButton>
                    {/* panel for sidebar */}
                    <DisclosurePanel className='md:flex md:flex-col md:h-screen p-6 sm:w-1/3 h-screen bg-white z-20 fixed top-0 lg:w-60 lg:left-0 ease-in-out delay-100 duration-300 transition-all'>
                        <div className='flex flex-col justify-start items-center'>
                            <Image className="text-base text-center cursor-pointer font-bold border-b border-gray-100 pb-4 w-full" src={orderflow} alt={'orderflow'} />
                            <div className="my-4 border-b border-gray-100 pb-4">
                                {menuItems.map((item, index) => (
                                    <Link href={item.href} key={index} className="flex mb-2 justify-start text-black items-center gap-5 hover:bg-[#04B4FC] p-2 rounded-md group cursor-pointer hover:shadow-lg">
                                        <item.icon className="text-2xl group-hover:text-white" />
                                        <h3 className="text-base font-normal group-hover:text-white">
                                            {item.name}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </DisclosurePanel>
                </Disclosure>
            ) : (
                <div className='md:flex md:flex-col md:h-screen p-6 sm:w-1/3 h-screen bg-white z-20 fixed top-0 lg:w-60 lg:left-0 ease-in-out delay-100 duration-300 transition-all'>
                    <div className='flex flex-col justify-start items-center'>
                        <Image className="text-base text-center cursor-pointer font-bold border-b border-gray-100 pb-4 w-full" src={orderflow} alt={'orderflow'} />
                        <div className="my-4 border-b border-gray-100 pb-4">
                            {menuItems.map((item, index) => (
                                <Link href={item.href} key={index} className="flex mb-2 justify-start text-black items-center gap-5 hover:bg-[#04B4FC] p-2 rounded-md group cursor-pointer hover:shadow-lg">
                                    <item.icon className="text-2xl group-hover:text-white" />
                                    <h3 className="text-base font-normal group-hover:text-white">
                                        {item.name}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SideNavbar;
