import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type AvatarProps = { picture: string; given_name: string }

const ProfileImage = ({ picture, given_name }: AvatarProps) => {
  return (
    <Avatar className='h-7 w-7'>
      <AvatarImage src={picture} alt='Profile picture' />
      <AvatarFallback>{given_name[0].toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
export default ProfileImage
