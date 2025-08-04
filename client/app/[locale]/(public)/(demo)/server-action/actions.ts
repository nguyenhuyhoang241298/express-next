'use server'

import fetcher from '@/lib/fetcher'

interface PrevState {
  [key: string]: string
}

export async function createUser(prevState: PrevState, formData: FormData) {
  const res = await fetcher({
    path: '/post/1',
    body: { name: 'hoàng' },
  })

  const json = await res.json()

  console.log('prevState', prevState)
  console.log('formData', formData)

  return json
}
