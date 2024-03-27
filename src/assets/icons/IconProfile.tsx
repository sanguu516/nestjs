import type { SVGProps } from 'react'
const SvgIconProfile = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <mask
      id="icon-profile_svg__a"
      width={16}
      height={8}
      x={4}
      y={14}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M4 14.496h15.84v7.374H4z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-profile_svg__a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.921 15.996c-4.261 0-6.421.732-6.421 2.177 0 1.458 2.16 2.197 6.421 2.197 4.26 0 6.419-.732 6.419-2.177 0-1.458-2.159-2.197-6.419-2.197m0 5.874c-1.959 0-7.921 0-7.921-3.697 0-3.296 4.521-3.677 7.921-3.677 1.959 0 7.919 0 7.919 3.697 0 3.296-4.52 3.677-7.919 3.677"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="icon-profile_svg__b"
      width={12}
      height={11}
      x={6}
      y={2}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M6.61 2h10.62v10.619H6.61z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-profile_svg__b)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.92 3.428A3.887 3.887 0 0 0 8.039 7.31a3.873 3.873 0 0 0 3.854 3.882l.029.713v-.713A3.886 3.886 0 0 0 15.8 7.31a3.886 3.886 0 0 0-3.88-3.882m0 9.19h-.031a5.3 5.3 0 0 1-5.28-5.311A5.316 5.316 0 0 1 11.922 2a5.315 5.315 0 0 1 5.309 5.31 5.314 5.314 0 0 1-5.31 5.309"
        clipRule="evenodd"
      />
    </g>
  </svg>
)
export default SvgIconProfile
