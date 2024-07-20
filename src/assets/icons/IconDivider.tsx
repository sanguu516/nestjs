import type { SVGProps } from 'react'
const SvgIconDivider = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 3 4" {...props}>
    <rect width={3} height={3} y={0.5} fill="#DDD" rx={1} />
  </svg>
)
export default SvgIconDivider
