import fetcher from '@/lib/fetcher'
import { sleep } from '@/lib/utils'

export async function getPost(postId: number) {
  try {
    const response = await fetcher({
      method: 'GET',
      baseUrl: 'https://jsonplaceholder.typicode.com',
      path: `/posts/${postId}`,
    })
    return await response.json()
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}

export async function getUser(userId: number) {
  try {
    const response = await fetcher({
      method: 'GET',
      baseUrl: 'https://jsonplaceholder.typicode.com',
      path: `/users/${userId}`,
    })
    return await response.json()
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

export async function getUserForStreaming(userId: number) {
  try {
    const response = await fetcher({
      method: 'GET',
      baseUrl: 'https://jsonplaceholder.typicode.com',
      path: `/users/${userId}`,
    })

    await sleep(3000) // Check the loading.tsx file

    return await response.json()
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
