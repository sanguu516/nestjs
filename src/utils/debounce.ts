/* eslint-disable @typescript-eslint/no-explicit-any */
const debounce = (callback: (...args: any[]) => void, delay: number) => {
  let timerId: number

  return (...args: any[]) => {
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(
      () => {
        callback(...args)
      },
      delay,
      event
    )
  }
}

export default debounce
