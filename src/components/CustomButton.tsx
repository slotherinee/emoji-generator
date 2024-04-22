'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

const CustomButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      type='submit'
      disabled={pending}
      className={`${pending ? 'cursor-not-allowed' : 'cursor-pointer'} `}>
      {pending ? 'Generating' : 'Generate'}
    </Button>
  )
}

export default CustomButton
