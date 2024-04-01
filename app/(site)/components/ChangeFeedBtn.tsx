"use client";

import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import React from 'react'

const ChangeFeedBtn = () => {
  return (
    <Link href='/following' className='fixed left-[171px] bottom-10 p-2.5 px-5 rounded-full border-[0.1px] border-[rgba(255,255,255,.15)] bg-button flex items-center gap-1.5'>
      <p className='font-semibold text-sm text-white tracking-wide'>For you</p>
      <Icon icon='fluent:arrow-swap-24-regular' className="text-white text-opacity-55" />
    </Link>
  )
}

export default ChangeFeedBtn