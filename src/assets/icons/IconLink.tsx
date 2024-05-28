import type { SVGProps } from 'react'
const SvgIconLink = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="#475467"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m13.526 17.616-1.273 1.273c-.844.844-2.026 1.28-3.285 1.215-1.26-.067-2.495-.63-3.432-1.569-.938-.937-1.502-2.172-1.568-3.431-.067-1.26.37-2.442 1.214-3.286l1.273-1.273m3.818-3.818 1.273-1.273c.844-.844 2.026-1.28 3.286-1.214s2.494.63 3.432 1.568c.937.937 1.501 2.172 1.567 3.432s-.37 2.441-1.214 3.285l-1.273 1.273m-7.99.92 5.091-5.092"
    />
  </svg>
)
export default SvgIconLink
