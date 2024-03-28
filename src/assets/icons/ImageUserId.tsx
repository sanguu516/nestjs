import type { SVGProps } from 'react'
const SvgImageUserId = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
    <g clipPath="url(#image-user-id_svg__a)">
      <circle cx={20} cy={20} r={20} fill="#E0EAFF" />
      <path
        fill="#444CE7"
        d="M17.31 23.82 16.164 28h-3.3l5.214-16.28h3.828L27.143 28h-3.41l-1.144-4.18zm4.091-4.312c-.506-1.694-.924-3.564-1.43-5.324h-.088c-.418 1.782-.88 3.63-1.386 5.324l-.484 1.782h3.872z"
      />
    </g>
    <defs>
      <clipPath id="image-user-id_svg__a">
        <path fill="#fff" d="M0 0h40v40H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgImageUserId
