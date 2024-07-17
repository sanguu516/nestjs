import type { SVGProps } from 'react'
const SvgIconDeleteCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#121212"
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 15 3-3m0 0 3-3m-3 3L9 9m3 3 3 3"
    />
  </svg>
)
export default SvgIconDeleteCircle
