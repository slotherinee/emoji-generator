import { LoaderCircle } from 'lucide-react'

const Spinner = ({ isShown }: { isShown: boolean }) => {
  return (
    <div
      className={`${
        isShown ? 'absolute top-[64px] left-[60px] z-10 animate-spin' : 'hidden'
      }`}>
      <LoaderCircle className='text-white' />
    </div>
  )
}

export default Spinner
