import type { SVGProps } from 'react'
const SvgIconToggle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" {...props}>
    <path
      stroke="#8F8F8F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6.667 4.583H17.5"
    />
    <path
      stroke="#8F8F8F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m2.5 4.594.01-.01M2.5 15.428l.01-.011M2.5 10.011 2.51 10"
    />
    <path
      stroke="#8F8F8F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6.667 10H17.5M6.667 15.417H17.5"
    />
  </svg>
)
export default SvgIconToggle
