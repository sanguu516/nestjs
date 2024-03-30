import { StorageKey } from '@/utils/localStorageUtil'

const baseUrl = process.env.NEXT_PUBLIC_REA_API_URL

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
  }

  if (result.status === 401) {
    if (!isBrowser) {
      throw new Error('Unauthorized')
    }

    const refreshToken = localStorage.getItem('refreshToken')
    if (!accessToken || !refreshToken) {
      throw new NeedSignInError()
    }

    const refreshResult = await fetch(baseUrl + 'auth/token/refresh/', {
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
      localStorage.removeItem(StorageKey.aceessToken)
      localStorage.removeItem(StorageKey.refreshToken)
      throw new NeedSignInError()
    }
  }

  // TODO: known Error에 대한 처리 좀 더 고민 필요.
  throw new Error(json.message ?? 'Unknown error occurred')
}

export default fetchApi
