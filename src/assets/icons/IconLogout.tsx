import type { SVGProps } from 'react'
const SvgIconLogout = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.32 22H6.433A4.44 4.44 0 0 1 2 17.565V6.436A4.44 4.44 0 0 1 6.433 2h4.876a4.44 4.44 0 0 1 4.436 4.436v.932a.75.75 0 0 1-1.5 0v-.932A2.94 2.94 0 0 0 11.309 3.5H6.433A2.937 2.937 0 0 0 3.5 6.436v11.129A2.937 2.937 0 0 0 6.433 20.5h4.887a2.93 2.93 0 0 0 2.925-2.924v-.943a.75.75 0 0 1 1.5 0v.943A4.43 4.43 0 0 1 11.32 22"
      clipRule="evenodd"
    />
    <mask
      id="icon-logout_svg__a"
      width={15}
      height={2}
      x={8}
      y={11}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M8.996 11.25h13.541v1.5H8.997z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-logout_svg__a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M21.787 12.75H9.747a.75.75 0 0 1 0-1.5h12.04a.75.75 0 0 1 0 1.5"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="icon-logout_svg__b"
      width={5}
      height={8}
      x={18}
      y={8}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M18.11 8.335h4.427v7.331H18.11z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-logout_svg__b)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M18.86 15.666a.75.75 0 0 1-.529-1.281L20.725 12 18.33 9.616a.749.749 0 1 1 1.058-1.062l2.928 2.915a.746.746 0 0 1 0 1.062l-2.928 2.916a.75.75 0 0 1-.53.22"
        clipRule="evenodd"
      />
    </g>
  </svg>
)
export default SvgIconLogout
