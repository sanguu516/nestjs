/* eslint-disable */
export function objectToQueryString(obj: object): string {
  return (
    Object.entries(obj)
      // eslint-disable typescript-eslint/no-unsafe-call
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`)
      .join('&')
  )
}
