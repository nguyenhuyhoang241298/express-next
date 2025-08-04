import fetcher from '@/lib/fetcher'
import { notFound } from 'next/navigation'

interface Post {
  id: string
  title: string
  content: string
}

async function getPost(id: string) {
  const res = await fetcher({
    baseUrl: 'https://api.vercel.app',
    path: `/blog/${id}`,
    method: 'GET',
    cache: 'force-cache',
    hasAccessToken: false,
  })
  const post: Post = await res.json()
  if (!post) notFound()
  return post
}

export async function generateStaticParams() {
  const res = await fetcher({
    baseUrl: 'https://api.vercel.app',
    path: '/blog',
    method: 'GET',
    cache: 'force-cache',
    hasAccessToken: false,
  })
  const posts = await res.json()

  return posts.map((post: Post) => ({
    id: String(post.id),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  return {
    title: post.title,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
