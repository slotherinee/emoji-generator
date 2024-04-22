import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { LogOut, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import ProfileImage from './ProfileImage'

export async function DropDown() {
  const { getUser } = getKindeServerSession()
  // @ts-ignore
  const { given_name, picture } = await getUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='hover:cursor-pointer'
        asChild>
        <div>
          {picture ? (
            <ProfileImage
              picture={picture}
              given_name={given_name}
            />
          ) : (
            given_name[0].toUpperCase()
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>{given_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='hover:cursor-pointer'>
            <User className='mr-2 h-4 w-4' />
            <Link href='/profile'>Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='hover:cursor-pointer'>
          <LogOut className='mr-2 h-4 w-4' />
          <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
