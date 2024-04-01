import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const shareBtn = () => {
  return (
    <div className='relative'>
      <button className='flex flex-row items-center rounded-full bg-dark bg-opacity-15 group'>
        <Icon icon='tabler:share' className='text-dark text-opacity-70 group-hover:text-opacity-100' />
        <p className='text-sm text-dark text-opacity-70 group-hover:text-opacity-100'>Share</p>
      </button>

      <div className='flex gap-3 p-2.5 rounded shadow justify-center'>
        <p className='text-sm text-dark opacity-90 font-semibold'>Share to</p>
        
      </div>
    </div>
  )
}

export default shareBtn