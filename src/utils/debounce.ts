/* eslint-disable @typescript-eslint/no-explicit-any */
export const DEBOUNCE_DELAY = 100

const debounce = (callback: (...args: any[]) => void, delay: number) => {
  let timerId: NodeJS.Timeout
  return (...args: any[]) => {
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

export default debounce
