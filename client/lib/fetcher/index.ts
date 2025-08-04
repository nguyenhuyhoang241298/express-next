import { getAuthorizationHeader } from './action'
import { defaultHeaders } from './configs'
import { getUrl, handleSignOut } from './helper'
import { FetcherOptions } from './type'

async function fetcher<TBody = Record<string, unknown>>({
  method = 'GET',
  baseUrl,
  path,
  params,
  body,
  headers = {},
  hasAccessToken = true,
  ...other
}: FetcherOptions<TBody>): Promise<Response> {
  const url = getUrl({
    baseUrl,
    path,
    params,
  })
  const hasBody = body && method !== 'GET'
  const authorizationHeader = await getAuthorizationHeader({
    hasAccessToken,
  })

  const response = await fetch(url, {
    method,
    headers: {
      ...defaultHeaders,
      ...authorizationHeader,
      ...headers,
    },
    body: hasBody ? JSON.stringify(body) : undefined,
    ...other,
  })

  if (response.status === 401) {
    await handleSignOut()
  }

  return response
}

export default fetcher
