import type { SVGProps } from 'react'
const SvgImageUser = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 160 160" {...props}>
    <g clipPath="url(#image-user_svg__a)">
      <path fill="#8F8F8F" d="M0 0h160v160H0z" />
      <circle cx={80} cy={190} r={90} fill="#DDD" />
      <circle cx={80} cy={60} r={32} fill="#DDD" />
    </g>
    <defs>
      <clipPath id="image-user_svg__a">
        <path fill="#fff" d="M0 0h160v160H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgImageUser
