import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getPost } from './api'
import Child from './child'
import SiblingChild from './sibling-child'

const Page = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['post', 1],
    queryFn: () => getPost(1),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        We can prefetch data for the child or other component here
        <Child />
        <SiblingChild />
      </div>
    </HydrationBoundary>
  )
}

export default Page
