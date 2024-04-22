'use client'

import { useFormStatus } from 'react-dom'
import SkeletonComponent from './Skeleton'
import { TODO } from '@/types/types'
import Image from 'next/image'

const GeneratingEmojiCard = ({
  data,
  error,
  resetKey,
}: {
  data: TODO
  error: TODO
  resetKey: TODO
}) => {
  const { pending, data: formData } = useFormStatus()
  return (
    <>
      <div className='w-full flex w-full justify-center items-center mb-8'>
        {pending && <SkeletonComponent />}
        {formData?.get('description') ? (error = null) : ''}
        {error && (
          <div className='text-red-500 text-center text-sm mb-1'>{error}</div>
        )}
        {data &&
          (pending ? (
            ''
          ) : (
            <div className='h-[145px] w-[145px] '>
              <Image
                src={`data:image/png;base64,${data.emojiString}`}
                width={145}
                height={145}
                alt={data.description}
                className='rounded-3xl'
                title={data.description}
              />
            </div>
          ))}
      </div>
    </>
  )
}

export default GeneratingEmojiCard
