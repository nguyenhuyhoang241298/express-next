import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getUser } from './api'
import UserInfo from './user-info'

const SiblingChild = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['user', 1],
    queryFn: () => getUser(1),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserInfo />
    </HydrationBoundary>
  )
}

export default SiblingChild
