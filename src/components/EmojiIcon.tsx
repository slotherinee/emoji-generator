'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { TODO } from '@/types/types'
import Spinner from './Spinner'
import Image from 'next/image'

const EmojiIcon = ({
  id,
  emojiString,
  description,
}: {
  id: number | undefined
  emojiString: string | undefined
  description: string | undefined
}) => {
  const { user } = useKindeBrowserClient()
  const [isHovered, setIsHovered] = useState(false)
  const [userHasEmoji, setUserHasEmoji] = useState(false)
  const [deleteSpinner, setDeleteSpinner] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkUserEmoji = async () => {
      if (user) {
        const usersEmojis = await fetch(
          `${process.env.NEXT_PUBLIC_DB_URL}?userId=${user.id}`
        )
        const data = await usersEmojis.json()
        const userEmoji = data.find((emoji: TODO) => emoji.id === id)
        setUserHasEmoji(!!userEmoji)
      }
    }
    checkUserEmoji()
  }, [user, id])

  const handleDeleteEmoji = async (id: TODO) => {
    setDeleteSpinner(true)
    try {
      if (userHasEmoji) {
        await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/${id}`, {
          method: 'DELETE',
        })
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setDeleteSpinner(false)
    }
  }

  return (
    <div
      className='relative'
      key={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Image
        src={`data:image/png;base64,${emojiString}`}
        alt={description || 'dog'}
        width={145}
        height={145}
        className='rounded-3xl relative'
        title={description || 'dog'}
      />
      <div
        className={`${
          deleteSpinner
            ? 'absolute top-0 left-0 bg-slate-950/75 h-[145px] w-[145px] rounded-3xl'
            : 'hidden'
        }`}></div>
      <Spinner isShown={deleteSpinner} />
      {user && isHovered && userHasEmoji && (
        <span
          onClick={() => handleDeleteEmoji(id)}
          className='absolute top-2 right-2 bg-slate-800 px-2 rounded-full text-white cursor-pointer'>
          x
        </span>
      )}
    </div>
  )
}

export default EmojiIcon
