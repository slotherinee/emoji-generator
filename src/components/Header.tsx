import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import Image from 'next/image'
import { DropDown } from './DropdownMenu'
import Link from 'next/link'

const Header = async () => {
  const { isAuthenticated } = getKindeServerSession()

  return (
    <header className='flex justify-between'>
      <div>
        <h2 className='font-regular text-2xl'>
          <Link href='/'>
            <div className='inline-flex gap-2'>
              <Image
                alt='logo icon'
                src='sparkles.svg'
                width={20}
                height={20}
              />{' '}
              Emojis
            </div>
          </Link>
        </h2>
      </div>
      <div className='flex gap-2'>
        {(await isAuthenticated()) ? (
          <DropDown />
        ) : (
          <>
            <LoginLink className='hover:underline'>Login</LoginLink>|
            <RegisterLink className='hover:underline'>Register</RegisterLink>
          </>
        )}
      </div>
    </header>
  )
}
export default Header
