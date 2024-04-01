"use client";

import { Icon } from '@iconify/react/dist/iconify.js'
import { AnimatePresence, motion, MotionProps } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge';

const OptionBtn = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const optionAnimation = {
    initial: {
      width: 0,
      height: 0,
      opacity: 0,
    },
    animate: {
      width: 'auto',
      height: 'auto',
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.4
      },
    },
    exit: {
      width: 0,
      height: 0,
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.4
      },
    }
  } satisfies MotionProps;

  const menuItemClass = 'py-2.5 text-left px-3.5 w-40 border-b border-[rgba(255,255,255,.15)] font-semibold text-sm'

  return (
    <div className='relative'>
      <motion.button
        onClick={() => setIsShowing(show => !show)}
        onBlur={() => setIsShowing(false)}
        whileTap={{ scale: .9, transition: { type: 'linear', duration: .2 } }}
        className='p-2 rounded-lg group'
      >
        <Icon icon='heroicons-outline:menu-alt-3' className={twMerge('text-[28px] text-white text-opacity-35 duration-300 group-hover:text-opacity-100 transition-all', isShowing && 'text-opacity-100')} />
      </motion.button>

      <AnimatePresence>
        {isShowing && (
          <motion.div {...optionAnimation} className='absolute right-0 rounded-xl flex flex-col border-[.2px] border-[rgba(255,255,255,.1)] bg-button overflow-hidden'>
            <button className={menuItemClass}>Appearance</button>
            <Link href='/settings' className={menuItemClass}>Settings</Link>
            <Link href='/settings' className={menuItemClass}>Saved</Link>
            <Link href='/settings' className={menuItemClass}>Your Likes</Link>
            <button className={`${menuItemClass} text-red-600`}>Log out</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OptionBtn