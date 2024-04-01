"use client";

import React from 'react'
import { dummyPins } from '@/dummy/dummyPin'
import PinCard from '@/components/PinCard'

const PinList = () => {

  return (
    <div className='w-full h-full px-3 columns-5 space-y-5 gap-[14px]'>
      {dummyPins.map((item) => (
        <PinCard
          id={item.id}
          key={item.id}
          img={item.image}
          title={item.title}
          uri={item.link}
          user={item.user}
        />
      ))}
    </div>
  )
}

export default PinList