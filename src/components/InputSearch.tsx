'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from './ui/input'

const InputSearch = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((emoji: string) => {
    const params = new URLSearchParams(searchParams)
    if (emoji) {
      params.set('query', emoji)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  })

  return (
    <>
      <Input
        className='w-60'
        type='text'
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={'Search ' + String.fromCodePoint(0x1f50d)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </>
  )
}

export default InputSearch
