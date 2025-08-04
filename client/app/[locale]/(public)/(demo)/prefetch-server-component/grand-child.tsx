'use client'

import { usePost } from './hooks'

const GrandChild = () => {
  const { data, isLoading } = usePost(1)

  if (isLoading) {
    return <div>Loading...</div>
  }
  // Log in server
  console.log('data', data)

  return <div>GrandChild</div>
}

export default GrandChild
