export enum StorageKey {
  refreshToken = 'refeshToken',
  aceessToken = 'accessToken',
}

export const LocalStorageManager = {
  get: (key: StorageKey) => {
    return localStorage.getItem(key)
  },
  set: (key: StorageKey, value: string) => {
    localStorage.setItem(key, value)
  },
  delete: (key: StorageKey) => {
    localStorage.removeItem(key)
  },
}
