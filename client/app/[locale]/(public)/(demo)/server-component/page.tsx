import fetcher from '@/lib/fetcher'

export default async function Page() {
  const data = await fetcher({
    baseUrl: 'https://api.vercel.app/blog',
  })
  const posts = await data.json()

  return (
    <ul>
      {posts.map((post: { id: string; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
