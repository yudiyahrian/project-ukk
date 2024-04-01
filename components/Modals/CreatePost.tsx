"use client"

import { UseUser } from '@/hooks/useUser'
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image'
import React, { SetStateAction, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge';

type threadInputType = {
  text: string,
  photos: string[],
}

const CreatePost = () => {
  const { user } = UseUser();
  const [mainThread, setMainThread] = useState<threadInputType>({
    text: '',
    photos: [''],
  });

  const [threadReply, setThreadReply] = useState<threadInputType[]>([]);

  const handleAddReply = () => {
    setThreadReply([...threadReply, { text: '', photos: [''] }]);
  };

  const handleRemoveReply = (index: number) => {
    const newInputs = [...threadReply];
    newInputs.splice(index, 1);
    setThreadReply(newInputs);
  };

  const handleReplyChange = <K extends keyof threadInputType>(index: number, key: K, value: threadInputType[K]) => {
    const newInputs = [...threadReply];
    newInputs[index][key] = value;
    setThreadReply(newInputs);
  };

  const isAddButtonDisabled = () => {
    if (!mainThread.text || mainThread.text.length === 0 || mainThread.photos.length === 0) return true;
    if (threadReply.length === 0) return false;
    const latestInput = threadReply[threadReply.length - 1];
    return !latestInput.text || latestInput.text.length === 0;
  };

  return (
    <div className='flex flex-col gap-2 cursor-default'>
      <p className='font-bold text-sm text-white'>New Thread</p>

      <div className='rounded-xl border border-white border-opacity-15 bg-button w-[550px]'>
        <div className='flex flex-col w-full max-h-[500px] overflow-y-auto px-8 pt-6 transition-all'>
          <Input
            value={mainThread.text}
            setValue={(newValue) => setMainThread({ ...mainThread, text: newValue })}
            photos={mainThread.photos}
            setPhotos={(newValue) => setMainThread({ ...mainThread, photos: newValue })}
            removable={false}
          />

          {threadReply.map((item, index) => (
            <Input
              key={index}
              value={item.text}
              setValue={(newValue) => handleReplyChange(index, 'text', newValue)}
              photos={item.photos}
              setPhotos={(newValue) => handleReplyChange(index, 'photos', newValue)}
              removable={true}
              deleteInput={() => handleRemoveReply(index)}
            />
          ))}

          <div className={twMerge('ml-3 mt-1 flex items-center gap-4', isAddButtonDisabled() && 'opacity-50 cursor-not-allowed')}>
            <Image
              src={user?.image ?? '/avatar.jpg'}
              alt={`user avatar`}
              width={0}
              height={0}
              sizes='100vw'
              className='rounded-full object-cover w-5 h-5'
            />

            <button disabled={isAddButtonDisabled()} onClick={handleAddReply}>
              <p className={twMerge(`text-[13px] text-white text-opacity-55 tracking-wide font-light`, isAddButtonDisabled() && 'cursor-not-allowed')}>
                Add to thread
              </p>
            </button>
          </div>
        </div>

        <div className='w-full flex items-center justify-between mt-6 sticky bottom-0 py-6 pt-2 px-6 bg-button'>
          <button className='text-white text-opacity-50 p-1 text-sm tracking-wide font-light'>anyone can reply</button>

          <button disabled={isAddButtonDisabled()} className='font-semibold text-baseColor text-[13px] px-4 py-1.5 rounded-full bg-white disabled:bg-opacity-35 disabled:cursor-not-allowed'>
            Post
          </button>
        </div>
      </div>
    </div>
  )
};

interface InputType {
  value: string;
  setValue: (newValue: string) => void;
  photos: string[];
  setPhotos: (newValue: string[]) => void;
  deleteInput?: () => void;
  removable: boolean
}

const Input: React.FC<InputType> = ({ value, setValue, removable, deleteInput, photos, setPhotos }) => {
  const { user } = UseUser();

  useEffect(() => {
    const textarea = document.getElementById('textInput');
    textarea!.style.height = 'auto';
    textarea!.style.height = `${textarea!.scrollHeight}px`;
  }, [value]);

  const handleFileChange = (files: FileList | null) => {
    console.log(setPhotos)
    if (!files) return;

    const promises: Promise<string>[] = [];
    const newPhotos = [...photos];

    for (let i = 0; i < Math.min(files.length, 10 - photos.length); i++) {
      const file = files[i];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        continue;
      }
      promises.push(new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }));
    }

    Promise.all(promises)
      .then((results) => {
        setPhotos([...newPhotos, ...results]);
      })
      .catch((error) => {
        console.error('Error reading files:', error);
      });
  };

  return (
    <div className='flex gap-2.5 p-1'>
      <div className='flex flex-col items-center'>
        <Image
          src={user?.image ?? '/avatar.jpg'}
          alt='user_community_image'
          width={0}
          height={0}
          sizes='100vw'
          className='w-10 rounded-full'
        />

        <div className='thread-card_bar' />
      </div>

      <div className='flex flex-col w-full items-start -mt-1 pb-2'>
        <p className='text-white font-medium text-[15px]'>otosakaell</p>
        <textarea
          id='textInput'
          placeholder='Say more..'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='w-full overscroll-none outline-none bg-transparent text-sm text-white resize-none placeholder:text-white placeholder:text-opacity-45 placeholder:text-[13px]'
        />

        {photos.length && (
          <div className={twMerge('w-full overflow-hidden flex gap-1.5 -ml-2 mt-2 transition-all', value.length == 0 && '-mt-2')}>
            {photos.map((item, index) => (
              <div key={index} className='relative'>
                <Image
                  src={item}
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  className={twMerge('w-auto h-auto rounded-lg max-h-[450px]', photos.length >= 1 && 'max-h-80 max-w-[400px]')}
                />

                <button className='absolute top-2.5 right-2.5 p-1 rounded-full bg-black bg-opacity-40 '>
                  <Icon icon='ic:round-close' className='text-lg text-white text-opacity-85' />
                </button>
              </div>
            ))}
          </div>
        )}

        <label htmlFor='addPhoto' className={twMerge('mt-2 transition-all cursor-pointer', value.length == 0 && photos.length <= 1 && '-mt-2')}>
          <Icon icon='system-uicons:picture' className='text-white text-xl text-opacity-50' />
        </label>
        <input
          id='addPhoto'
          type="file"
          multiple
          onChange={(e) => handleFileChange(e.target.files)}
          className='hidden'
        />
      </div>

      {removable && deleteInput && (
        <button onClick={deleteInput} className='p-1 rounded-full h-fit'>
          <Icon icon='ic:round-close' className='text-lg text-white text-opacity-35' />
        </button>
      )}
    </div>
  )
}

export default CreatePost