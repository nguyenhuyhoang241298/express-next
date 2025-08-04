import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const Page = async () => {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  redirect('/dashboard')
}

export default Page
