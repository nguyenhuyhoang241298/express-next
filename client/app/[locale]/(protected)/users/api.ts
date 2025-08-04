import fetcher from '@/lib/fetcher'
import { User } from './type'

export const getUsers = async () => {
  const res = await fetcher({
    path: '/api/users',
  })
  return res.json() as Promise<User[]>
}

export const createUser = async (user: Omit<User, 'id'>) => {
  const res = await fetcher({
    path: '/api/users',
    method: 'POST',
    body: user,
  })
  return res.json() as Promise<User>
}

export const updateUser = async (user: User) => {
  const res = await fetcher({
    path: `/api/users/${user.id}`,
    method: 'PATCH',
    body: user,
  })
  return res.json() as Promise<User>
}

export const deleteUser = async (id: number) => {
  const res = await fetcher({
    path: `/api/users/${id}`,
    method: 'DELETE',
  })
  return res.json() as Promise<void>
}
