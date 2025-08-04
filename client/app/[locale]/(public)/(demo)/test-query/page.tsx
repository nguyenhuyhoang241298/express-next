'use client'

import { useQuery } from '@tanstack/react-query'
import { getPosts } from './api'

const Page = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['jsonPlaceholder'],
    queryFn: getPosts,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  console.log('data', data)

  return <div>Success</div>
}

export default Page
