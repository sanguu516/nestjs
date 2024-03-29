const base64 = 'data:image/png;base64'
const blurImage =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUlpNOBgABaQC5ghcdSQAAAABJRU5ErkJggg=='
export const blurDataURL = `${base64},${blurImage}`

export const KEYWORD_ICONS: Record<number, string> = {
  1: '👀',
  2: '🚫',
  3: '🗂️',
  4: '💬',
  5: '🤝',
  6: '🔍',
}
