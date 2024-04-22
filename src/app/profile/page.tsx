import EmojiIcon from '@/components/EmojiIcon'
import EmojiList from '@/components/EmojiList'
import Header from '@/components/Header'
import { Emoji } from '@/types/types'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

const ProfilePage = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession()
  if (!(await isAuthenticated())) {
    redirect('/api/auth/login')
  }
  const user = await getUser()
  const images = await fetch(`${process.env.DB_URL}?sortBy=-id`)
  const data: Emoji[] = await images.json()
  const filteredData = data.filter((emoji) => emoji.userId === user?.id)

  return (
    <div className='max-w-screen-lg container mx-auto p-4 flex flex-col justify-between gap-10'>
      <Header />
      <h1>List of your generated emojis!</h1>
      <EmojiList filteredData={filteredData} />
    </div>
  )
}
export default ProfilePage
