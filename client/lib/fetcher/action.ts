'use server'

import { auth } from '@/auth'

export const getAuthorizationHeader = async ({
  hasAccessToken = true,
}: {
  hasAccessToken?: boolean
}): Promise<HeadersInit> => {
  if (!hasAccessToken) return {}

  const session = await auth()

  if (!session) {
    return {}
  }

  const accessToken = session.accessToken
  if (!accessToken) {
    return {}
  }

  return { Authorization: `Bearer ${accessToken}` }
}
