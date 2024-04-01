"use client";

import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import NavItem from './NavItem';
import OptionBtn from './OptionBtn';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UseModal } from '@/hooks/useModal';
import CreatePost from './Modals/CreatePost';

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const pathname = usePathname();
  const { openModal } = UseModal();

  const route = [
    {
      icon: 'ph:house',
      activeIcon: 'ph:house-fill',
      active: pathname === '/',
      href: '/',
    },
    {
      icon: 'mingcute:search-line',
      activeIcon: 'iconamoon:search-bold',
      active: pathname === '/search',
      href: '/search'
    },
    {
      icon: 'mynaui:edit-one',
      href: '',
      activeIcon: 'mynaui:edit-one',
      active: false,
      onClick: () => openModal(<CreatePost />)
    },
    {
      icon: 'ph:heart',
      activeIcon: 'ph:heart-fill',
      active: pathname === '/activity',
      href: '/activity'
    },
    {
      icon: 'solar:user-linear',
      activeIcon: 'solar:user-bold',
      active: pathname === '/profile',
      href: '/profile'
    },
  ];

  const MotionLink = motion(Link);

  return (
    <div className='w-full h-screen flex flex-col overflow-y-auto relative bg-baseColor'>
      <nav className='w-full sticky top-0 px-[171px] py-2 bg-baseColor bg-opacity-95 flex items-center justify-between z-10'>
        <MotionLink whileTap={{ scale: .9, transition: { type: 'linear', duration: .2 } }} href='/' className='p-1 group'>
          <Image
            src='/logo.png'
            alt='app logo'
            width={0}
            height={0}
            sizes="100vw"
            className='object-cover w-7 h-w-7 group-hover:scale-110 transition-all duration-200'
          />
        </MotionLink>

        <ul className='flex flex-row items-center gap-[6px]'>
          {route.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              activeIcon={item.activeIcon}
              href={item.href}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>

        <OptionBtn />
      </nav>

      <main className='w-full h-full flex items-center px-[171px] mt-4'>
        {children}
      </main>
    </div>
  )
}

export default Navbar