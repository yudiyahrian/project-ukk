import React, { useEffect, useState } from 'react'
import { DropzoneProps, SingleImageDropzone } from './single-image-dropzone';
import Image from 'next/image';
import { cn } from '@utils/utils';
import { Check, CircleArrowUp, Loader2 } from 'lucide-react';

interface Props extends DropzoneProps {
  initialValue: string | null;
  progress: number;
}

const SettingsDropzone = ({ initialValue, progress, ...props }: Props) => {
  const [showProgress, setShowProgress] = useState<boolean>(false);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setShowProgress(false);
      }, 5000)
    } else if (progress > 0) {
      setShowProgress(true);
    } else {
      setShowProgress(false);
    }
  }, [progress])

  return (
    <div className='flex items-center gap-8'>
      <SingleImageDropzone
        {...props}
        className={cn('rounded-lg shadow-md', props.className)}
      >
        {showProgress ? (
          <div className='flex items-center justify-center'>
            <Loader2 className="mr-2 h-6 w-6 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {initialValue ? (
              <Image
                src={initialValue ?? ''}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                className="w-full h-full rounded-lg"
              />
            ) : (
              <div className='relative w-full h-full'>
                <div className={cn('w-full h-full flex flex-col items-center justify-center gap-2 text-[#505050]', props.width <= 220 && 'scale-90' )}>
                  <button className='font-semibold text-blue-600 text-sm rounded-full border border-[#d9d9d9] py-2.5 px-3.5 flex items-center gap-2'>
                    <CircleArrowUp size={16} />
                    Select a file
                  </button>

                  <p className='text-xs text-opacity-50'>or</p>

                  <p className='text-sm'>Drag and drop a file here</p>

                </div>
              </div>
            )}
          </>
        )}
      </SingleImageDropzone>

      {/* progress banner */}

      <div className={cn('transition-all shadow-md rounded-lg flex items-center justify-center flex-col opacity-0 duration-500', showProgress && 'duration-200 opacity-100')} style={{ width: props.width, height: props.height }}>
        {progress !== 100 ? (
          <Loader2 className="mr-2 h-6 w-6 animate-spin text-blue-600" />
        ) : (
          <div className='flex flex-col gap-4 items-center'>
            <Check className='text-[#6DD92A]' size={32} />
            <p className='font-semibold text-sm text-[#3d3d3d]'>File uploaded</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsDropzone