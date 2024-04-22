'use client'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TODO } from '@/types/types'
import EmojiIcon from './EmojiIcon'

const EmojiList = ({ filteredData }: { filteredData: TODO }) => {
  const [parent] = useAutoAnimate()
  return (
    <div
      ref={parent}
      className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
      {filteredData.map((photo: TODO) => (
        <EmojiIcon
          key={photo.id}
          {...photo}
        />
      ))}
    </div>
  )
}

export default EmojiList
