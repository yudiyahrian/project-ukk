import PostCard from '@/components/PostCard'
import { dummyPost } from '@/dummy/dummyData'
import React from 'react'

const Feed = () => {
  return (
    <div className='w-full flex flex-col gap-4 py-2'>
      {dummyPost.map((item, index) => (
        <PostCard
          key={item.id}
          {...item}
        />
      ))}
    </div>
  )
}

export default Feed