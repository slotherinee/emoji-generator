import Header from '@/components/Header'
import Main from '@/components/Main'

type searchParams = {
  searchParams?: {
    query: string
  }
}

const Home = async ({ searchParams }: searchParams) => {
  const query = searchParams?.query || ''
  return (
    <div className='max-w-screen-lg container mx-auto p-4'>
      <Header />
      <Main query={query} />
    </div>
  )
}
export default Home
