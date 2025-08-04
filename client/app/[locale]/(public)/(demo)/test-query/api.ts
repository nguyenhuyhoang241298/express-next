'use client'

import fetcher from '@/lib/fetcher'

export const getPosts = async () => {
  const response = await fetcher({
    path: '/posts',
  })
  return response.json()
}
