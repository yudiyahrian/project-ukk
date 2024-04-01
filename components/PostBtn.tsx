"use client";

import { UseUser } from '@/hooks/useUser'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import React from 'react'

const PostBtn = () => {
  const { user } = UseUser();

  return (
    <div className='flex items-center w-full gap-2.5 py-4 border-b-[.7px] border-white border-opacity-35'>
      <Image
        src={user?.image ?? '/avatar.jpg'}
        alt='User Avatar'
        width={0}
        height={0}
        sizes='100vw'
        className='w-9 h-9 rounded-full border-[.2px] border-[rgba(255,255,255,.5)]'
      />
      <button className='text-sm text-white text-opacity-35 w-full text-left cursor-text font-light tracking-wide pt-1'>
        Start a thread...
      </button>

      <button disabled className='font-semibold text-baseColor text-[13px] px-4 py-1.5 rounded-full bg-white bg-opacity-35 cursor-not-allowed'>
        Post
      </button>
    </div>
  )
}

export default PostBtn