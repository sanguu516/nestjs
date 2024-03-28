import type { SVGProps } from 'react'
const SvgImageUser = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
    <rect width={40} height={40} fill="#E0EAFF" rx={20} />
    <path
      fill="#444CE7"
      fillRule="evenodd"
      d="M26 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0m-2 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0"
      clipRule="evenodd"
    />
    <path
      fill="#444CE7"
      d="M20 25c-6.474 0-11.99 3.828-14.092 9.192q.768.764 1.616 1.44C9.088 30.708 13.997 27 20 27s10.912 3.708 12.477 8.632q.846-.677 1.615-1.44C31.991 28.828 26.475 25 20 25"
    />
  </svg>
)
export default SvgImageUser
