export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type UrlParams = Record<string, string | number | null | undefined>

export type GetUrlOptions = {
  baseUrl?: string
  path?: string
  params?: UrlParams
}

export interface FetcherOptions<TBody = Record<string, unknown>>
  extends GetUrlOptions {
  method?: HttpMethod
  body?: TBody
  headers?: Record<string, string>
  hasAccessToken?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
