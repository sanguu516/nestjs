import type { SVGProps } from 'react'
const SvgIconShow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="#121212"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 13.2c3.2-6.933 12.8-6.933 16 0"
    />
    <path
      stroke="#121212"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 16.933a2.133 2.133 0 1 1 0-4.266 2.133 2.133 0 0 1 0 4.266"
    />
  </svg>
)
export default SvgIconShow
