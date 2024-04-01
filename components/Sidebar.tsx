"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import SidebarItems from "./SidebarItems";
import UserProfile from "./UserProfile";
import Link from "next/link";
import PostButton from "./PostButton";

interface Props {
  children: React.ReactNode
}

const Sidebar = ({ children }: Props) => {
  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      name: 'Home',
      href: '/',
      active: pathname === '/',
      icon: 'fluent:home-32-regular',
      activeIcon: 'fluent:home-32-filled'
    },
    {
      name: 'Discover',
      href: '/discover',
      active: pathname === '/discover',
      icon: 'mdi:compass-outline',
      activeIcon: 'mdi:compass'
    },
    {
      name: 'Saved',
      href: '/saved',
      active: pathname === '/saved',
      icon: 'mingcute:bookmark-line',
      activeIcon: 'mingcute:bookmark-fill'
    },
    {
      name: 'Settings',
      href: '/settings',
      active: pathname === '/settings',
      icon: 'mage:settings',
      activeIcon: 'mage:settings-fill'
    }
  ], [pathname])

  return (
    <div className="flex h-screen bg-white">
      <div className="w-[250px] h-screen border-r-[.1px] border-light-grey bg-white flex flex-col">
        <Link href='/' className="flex items-center justify-center w-full py-5">
          <p className="text-2xl text-primary font-bold">app logo</p>
        </Link>

        <div className='w-full items-center px-2 mt-1 mb-auto gap-1'>
          {routes.map((item, index) => (
            <SidebarItems
              key={index}
              icon={item.icon}
              activeIcon={item.activeIcon}
              label={item.name}
              href={item.href}
              active={item.active}
            />
          ))}
          <PostButton />
        </div>

        <UserProfile />
      </div>
      <main className="w-full h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default Sidebar;