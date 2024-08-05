import { StorageKey } from '@/utils/localStorageUtil'

const baseUrl = process.env.NEXT_PUBLIC_REA_API_URL

class HTTPError extends Error {
  code
  constructor(code: number, message: string) {
    super(message)
    this.name = 'HTTP Error'
    this.code = code
  }
}
export class NeedSignInError extends Error {
  constructor() {
    super('Need to sign in')
    this.name = 'NeedSignInError'
  }
}

async function fetchApi(pathname: string, requestInit?: RequestInit) {
  const isBrowser = typeof window !== 'undefined'

  const url = baseUrl + pathname
  const accessToken = isBrowser ? localStorage.getItem('accessToken') : null

  try {
    const result = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      ...requestInit,
    })

    const json = await result.json()

    if (result.ok) {
      return json
    } else {
      throw new HTTPError(result.status, json.code)
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      if (error.code === 400) {
        throw new Error(error.message)
      }
      if (error.code === 401) {
        localStorage.removeItem(StorageKey.aceessToken)

        if (!isBrowser) {
          throw new Error('Unauthorized')
        }

        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          throw new NeedSignInError()
        }

        const refreshResult = await fetch(baseUrl + 'auth/token/refresh', {
          method: 'POST',
          body: JSON.stringify({ refresh: refreshToken }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (refreshResult.status === 200) {
          const { access, refresh } = await refreshResult.json()
          localStorage.setItem(StorageKey.aceessToken, access)
          localStorage.setItem(StorageKey.refreshToken, refresh)
          return fetchApi(pathname, requestInit)
        } else {
          localStorage.removeItem(StorageKey.refreshToken)
          throw new NeedSignInError()
        }
      }
    }
  }

  // throw new Error('Unknown error occurred')
}

export default fetchApi
