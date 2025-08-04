import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { getPost, getUser, getUserForStreaming } from './api'

export const usePost = (postId: number) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
  })
}

export const useUser = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
  })
}

export const useUserForStreaming = (userId: number) => {
  return useSuspenseQuery({
    queryKey: ['userForStreaming', userId],
    queryFn: () => getUserForStreaming(userId),
  })
}
