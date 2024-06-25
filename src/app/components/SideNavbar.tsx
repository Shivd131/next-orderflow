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
    const [isScreenWide, setIsScreenWide] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isWide = window.innerWidth > 768;
            setIsScreenWide(isWide);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`md:w-60 ${isScreenWide ? 'fixed top-0 left-0 h-full' : ''}`}>
            {!isScreenWide ? (
                <Disclosure as="nav">
                    <DisclosureButton className="absolute md:hidden top-20 right-4 rounded-md p-2 focus:ring-white shadow-2xl border border-gray-300 bg-white hover:scale-105 transition-all">
                        <GiHamburgerMenu className='block h-6 w-6 fill-gray-500' aria-hidden="true" />
                    </DisclosureButton>
                    <DisclosurePanel className='md:flex md:flex-col md:h-screen p-6 sm:w-1/3 h-screen bg-white z-20 fixed top-0 lg:w-60 lg:left-0 ease-in-out delay-100 duration-300 transition-all shadow-2xl'>
                        <div className='flex flex-col justify-start items-center'>
                            <Image className="text-base text-center cursor-pointer font-bold border-b border-gray-100 pb-4 w-full" src={orderflow} alt={'orderflow'} />
                            <div className="my-4 border-b border-gray-100 pb-4 w-full">
                                {menuItems.map((item, index) => (
                                    <Link href={item.href} key={index} className="flex mb-2 justify-start text-black items-center gap-5 hover:bg-[#04B4FC] w-full p-2 rounded-md group cursor-pointer hover:shadow-sm">
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
                <div className='md:flex md:flex-col md:h-full p-6 bg-white z-20  border-r border-slate-300 '>
                    <div className='flex flex-col justify-start items-center'>
                        <Image className="text-base text-center cursor-pointer font-bold border-b border-gray-100 pb-4 w-full" src={orderflow} alt={'orderflow'} />
                        <div className="my-4 border-b border-gray-100 pb-4 w-full">
                            {menuItems.map((item, index) => (
                                <Link href={item.href} key={index} className="flex mb-2 justify-start text-black items-center gap-5 hover:bg-[#04B4FC] p-2 rounded-sm group cursor-pointer ">
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
