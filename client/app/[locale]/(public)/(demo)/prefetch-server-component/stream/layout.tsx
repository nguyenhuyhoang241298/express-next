import { QueryClient } from '@tanstack/react-query'
import React from 'react'
import { getUserForStreaming } from '../api'

// Without async function
const Layout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()

  // without await
  queryClient.prefetchQuery({
    queryKey: ['getUserForStreaming', 2],
    queryFn: () => getUserForStreaming(2),
  })

  return <div>{children}</div>
}

export default Layout
