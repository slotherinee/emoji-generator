import { TODO } from '@/types/types'
import EmojiList from './EmojiList'

const GeneratedIcons = async ({ query }: { query: string }) => {
  const images = await fetch(`${process.env.DB_URL}?sortBy=-id`)
  if (!images.ok) {
    return <h1>Failed to fetch images. Try again please!</h1>
  }
  const data = await images.json()

  const filteredData = query
    ? data.filter((emoji: TODO) => emoji.tags.includes(query.toLowerCase()))
    : data

  return <EmojiList filteredData={filteredData} />
}

export default GeneratedIcons
