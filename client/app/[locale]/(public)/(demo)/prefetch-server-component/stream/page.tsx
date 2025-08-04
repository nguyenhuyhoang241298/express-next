'use client'

import { useUserForStreaming } from '../hooks'

const Page = () => {
  const { data } = useUserForStreaming(2)

  console.log('data', data)

  return <div>Streaming done</div>
}

export default Page
