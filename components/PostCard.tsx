"use client";

import { Post } from '@/db_types'
import Image from 'next/image'
import React from 'react'
import useTimeFormat from '@/hooks/useTimeFormat'
import { Icon } from '@iconify/react/dist/iconify.js';
import { twMerge } from 'tailwind-merge';
import { Link } from '@radix-ui/themes';

const PostCard: React.FC<Post> = ({ ...props }) => {
  const author = props.user;

  const btnStyle = 'p-1.5 rounded-full bg-white bg-opacity-0 hover:bg-opacity-10 transition-all'

  return (
    <article
      className={`flex w-full flex-col pb-4 border-b-[.05px] border-white border-opacity-25`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-2.5'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-10 w-10'>
              <Image
                src={author.image ?? '/avatar.png'}
                alt='user_community_image'
                fill
                className='cursor-pointer rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <div className='w-full flex items-center justify-between -mt-[2px]'>
              <Link href={`/profile/${author.id}`} className='w-fit'>
                <h4 className='cursor-pointer text-white font-semibold text-[15px]'>
                  {author.name}
                </h4>
              </Link>

              <div className='flex items-center gap-1.5'>
                <p className='text-sm text-white text-opacity-35'>{useTimeFormat(props.createdAt)}</p>
                <button className={btnStyle}>
                  <Icon icon='iwwa:option-horizontal' className='text-white text-lg' />
                </button>
              </div>
            </div>

            <p className='-mt-[2px] text-sm text-white w-full'>{props.text}</p>

            <div className='w-full overflow-hidden flex gap-2 mt-2.5'>
              {props.photos.map((item) => (
                <Image
                  key={item.id}
                  src={item.photo}
                  alt='post photo'
                  width={0}
                  height={0}
                  sizes='100vw'
                  className={twMerge('w-auto h-auto rounded-lg max-h-[450px]', props.photos.length >= 1 && 'max-h-96')}
                />
              ))}
            </div>

            <div className={`mt-2 -mb-1 flex flex-col`}>
              <div className='flex items-center'>
                <button className={btnStyle}>
                  <Icon icon='f7:heart' className='text-white text-xl' />
                </button>

                <Link href={`/thread/${props.id}`} className={btnStyle}>
                  <Icon icon='iconamoon:comment-light' className='text-white text-xl' />
                </Link>

                <button className={btnStyle}>
                  <Icon icon='iconoir:bookmark' className='text-white text-xl' />
                </button>
              </div>

              {/* <Link href={`/thread/${1}`}>
                <p className='text-[13px] text-white text-opacity-35'>
                  {[1, 2, 3, 6, 4, 3, 1, 1].length} repl{[1, 2, 3].length > 1 ? "ies" : "y"}
                </p>
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      <div className='ml-1 mt-3 flex items-center gap-2.5'>
        {props.Comment.slice(0, 2).map((comment: any, index) => (
          <Image
            key={index}
            src={comment.user.image}
            alt={`user_${index}`}
            width={0}
            height={0}
            sizes='100vw'
            className={`${index !== 0 && "-ml-5"} rounded-full object-cover w-5 h-5`}
          />
        ))}

        <Link href={`/thread/${props.id}`}>
          <p className={`text-[13px] text-white text-opacity-35 ${props.Comment.length && 'mt-0.5'}`}>
            {props.Comment.length} repl{props.Comment.length > 1 ? "ies" : "y"}
          </p>
        </Link>
      </div>
    </article>
  )
}

export default PostCard

{/* <div className='w-full flex flex-col'>
      <div className='flex w-full gap-2.5 items-center'>
        <Image
          src={user.image ?? '/avatar.png'}
          alt='User Avatar'
          width={0}
          height={0}
          sizes='100vw'
          className='w-[38px] h-[38px] rounded-full border-[.01px] border-white border-opacity-25'
        />

        <div className='flex flex-col w-full'>
          <div className={twMerge('w-full flex justify-between', props.text ? 'mt-1' : '-mt-2')}>
            <p className='font-semibold text-sm text-white'>{user.name}</p>

            <div className='flex items-center gap-1.5'>
              <p className='text-sm text-white text-opacity-35'>{useTimeFormat(props.createdAt)}</p>
              <button className='p-1.5 rounded-full bg-white bg-opacity-0 hover:bg-opacity-10 transition-all'>
                <Icon icon='iwwa:option-horizontal' className='text-white text-lg' />
              </button>
            </div>
          </div>

          <p className='text-[13px] -mt-1.5'>{props.text}</p>
        </div>
      </div>

      <div></div>
    </div> */}