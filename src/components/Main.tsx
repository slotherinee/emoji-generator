'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import GeneratedIcons from './GeneratedIcons'
import Form from './Form'
import InputSearch from './InputSearch'

const Main = async ({ query }: { query: string }) => {
  const { isAuthenticated } = getKindeServerSession()
  const emojis = await fetch(`${process.env.DB_URL}`)
  const data = await emojis.json()
  return (
    <main className='min-h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-between items-center gap-32 w-full mt-16'>
        <div className='flex flex-col items-center gap-8'>
          <div>
            <h1 className='font-regular text-3xl text-center mb-3'>
              AI Emojis
            </h1>
            <p className='text-base leading-relaxed tracking-wide font-light text-gray-500'>
              {data.length} emojis already generated and more to come!
            </p>
          </div>
          <div className='w-full max-w-sm'>
            {(await isAuthenticated()) ? (
              <Form />
            ) : (
              <h2 className='text-center font-semibold'>
                Login or Register to generate emojis
              </h2>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-10 w-full'>
          <div className='flex justify-between w-full'>
            <div>
              <h2 className='text-2xl font-semibold mb-2'>Recent emojis</h2>
            </div>
            <InputSearch />
          </div>
          <div className='flex justify-center'>
            <GeneratedIcons query={query} />
          </div>
        </div>
      </div>
    </main>
  )
}
export default Main
