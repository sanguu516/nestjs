import type { SVGProps } from 'react'
const SvgIconFilter4 = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <mask
      id="icon-filter-4_svg__a"
      width={20}
      height={20}
      x={2}
      y={2}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M2 2h19.5v19.5H2z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-filter-4_svg__a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.773 11.599q.027.021.052.049a5.87 5.87 0 0 1 1.675 4.126v3.984l2.236-1.218a.56.56 0 0 0 .284-.491v-2.287c0-1.55.59-3.01 1.659-4.11l4.836-5.144A1.8 1.8 0 0 0 20 5.277V4.34c0-.464-.366-.841-.814-.841H4.317a.83.83 0 0 0-.816.84v.937c0 .46.172.898.485 1.23zm1.374 9.901A1.146 1.146 0 0 1 9 20.345v-4.572a4.38 4.38 0 0 0-1.195-3.022 1 1 0 0 1-.066-.062L2.893 7.536A3.28 3.28 0 0 1 2 5.276v-.935C2 3.05 3.04 2 4.315 2h14.871C20.463 2 21.5 3.05 21.5 4.34v.937c0 .843-.317 1.645-.89 2.258l-4.847 5.153a4.38 4.38 0 0 0-1.242 3.073v2.288c0 .756-.41 1.448-1.068 1.808l-2.76 1.503c-.172.093-.36.14-.546.14"
        clipRule="evenodd"
      />
    </g>
  </svg>
)
export default SvgIconFilter4
