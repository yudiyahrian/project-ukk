import React from 'react'
import Link from 'next/link';
import { Icon } from '@iconify/react'
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

type NavItemType = {
  icon: string,
  activeIcon: string,
  active: boolean,
  href: string,
  onClick?: () => void,
}

const NavItem: React.FC<NavItemType> = ({ ...props }) => {
  const MotionLink = motion(Link);

  return (
    <>
      {props.onClick ? (
        <motion.button
          whileTap={{ scale: .9, transition: { type: "linear", duration: .2 } }}
          onClick={props.onClick}
          className='group py-5 px-8 rounded-lg overflow-hidden relative flex'
        >
          <Icon
            icon={!props.active ? props.icon : props.activeIcon}
            className={twMerge(`text-[28px] text-white text-opacity-35 transition-all duration-300`, props.active && 'text-opacity-100')}
          />

          <div className='w-full h-full top-0 left-0 scale-75 opacity-0 bg-white bg-opacity-5 absolute group-hover:opacity-100 group-hover:scale-100 transition-all duration-200' />
        </motion.button>
      ) : (
        <MotionLink
          whileTap={{ scale: .9, transition: { type: "linear", duration: .2 } }}
          href={{}}
          className='group py-5 px-8 rounded-lg overflow-hidden relative flex'
        >
          <Icon
            icon={!props.active ? props.icon : props.activeIcon}
            className={twMerge(`text-[28px] text-white text-opacity-35 transition-all duration-300`, props.active && 'text-opacity-100')}
          />

          <div className='w-full h-full top-0 left-0 scale-75 opacity-0 bg-white bg-opacity-5 absolute group-hover:opacity-100 group-hover:scale-100 transition-all duration-200' />
        </MotionLink>
      )}
    </>
  )
}

export default NavItem