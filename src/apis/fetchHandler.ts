import { StorageKey } from '@/utils/localStorageUtil'
const baseUrl = 'http://223.130.138.37/api/v1/' // TODO: Move to env

async function fetchApi(pathname: string, requestInit?: RequestInit) {
  const input = baseUrl + pathname
  const accessToken = localStorage.getItem('accessToken')

  const result = await fetch(input, {
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
    const refreshToken = localStorage.getItem('refreshToken')
    if (!accessToken || !refreshToken) {
      location.href = '/auth/login'
      return
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
      localStorage.delete(StorageKey.aceessToken)
      localStorage.delete(StorageKey.refreshToken)
      location.href = '/auth/login'
    }
  }

  // TODO: known Error에 대한 처리 좀 더 고민 필요.
  throw new Error(json.message ?? 'Unknown error occurred')
}

export default fetchApi
