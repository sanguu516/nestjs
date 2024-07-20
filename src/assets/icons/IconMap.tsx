import type { SVGProps } from 'react'
const SvgIconMap = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" {...props}>
    <path
      stroke="#EBEBEB"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16.667 8.333c0 3.682-6.667 10-6.667 10s-6.667-6.318-6.667-10a6.667 6.667 0 1 1 13.334 0Z"
    />
    <path
      fill="#EBEBEB"
      stroke="#EBEBEB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 10.556a2.222 2.222 0 1 0 0-4.445 2.222 2.222 0 0 0 0 4.445"
    />
  </svg>
)
export default SvgIconMap
