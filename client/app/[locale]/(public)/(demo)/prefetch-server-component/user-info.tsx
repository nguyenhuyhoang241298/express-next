'use client'

import { useUser } from './hooks'

// you can get the data here or other component deeper

const UserInfo = () => {
  const { data, isLoading } = useUser(1)
  console.log('user', data)
  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div>UserInfo</div>
}

export default UserInfo
