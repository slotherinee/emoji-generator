'use client'
import { useRef, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { formAction } from '@/actions/formAction'
import CustomButton from './CustomButton'
import { Input } from './ui/input'
import GeneratingEmojiCard from './GeneratingEmojiCard'
import { TODO } from '@/types/types'

type FormProps = {
  formAction: (
    prevState: any,
    formData: FormData
  ) => Promise<
    | { resetKey: any; error: string; data: null }
    | { resetKey: string; data: any; error: null }
    | undefined
  >
  error: string | null
  resetKey: string | null
  data: any
}

const Form = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  // @ts-ignore
  const [state, action] = useFormState(formAction, {
    error: null,
    resetKey: null,
    data: null,
  })

  useEffect(() => {
    inputRef.current?.focus()
  }, [state])

  return (
    <>
      <form
        action={action}
        key={state?.resetKey}
        className='flex flex-col'>
        <GeneratingEmojiCard
          error={state?.error}
          data={state?.data}
          resetKey={state?.resetKey}
        />
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <Input
            ref={inputRef}
            type='text'
            name='description'
            placeholder='Dog'
            autoComplete='off'
          />
          <CustomButton />
        </div>
      </form>
    </>
  )
}

export default Form
