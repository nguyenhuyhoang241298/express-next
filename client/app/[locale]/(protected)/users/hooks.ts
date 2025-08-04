import { useQuery } from '@tanstack/react-query'
import { getUsers } from './api'
import { User } from './type'

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}
