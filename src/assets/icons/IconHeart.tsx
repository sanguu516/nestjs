import type { SVGProps } from 'react'
const SvgIconHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <mask
      id="icon-heart_svg__a"
      width={21}
      height={20}
      x={2}
      y={3}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M2 3h20.473v19.501H2z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-heart_svg__a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3.823 12.123c1.402 4.362 6.942 7.89 8.414 8.762 1.476-.882 7.056-4.448 8.413-8.758.89-2.786.064-6.315-3.222-7.374-1.593-.51-3.45-.2-4.732.792a.75.75 0 0 1-.91.006 5.23 5.23 0 0 0-4.749-.798c-3.28 1.058-4.105 4.587-3.214 7.37m8.415 10.378a.75.75 0 0 1-.36-.09c-.312-.172-7.686-4.236-9.483-9.83-1.129-3.523.127-7.949 4.182-9.256a6.73 6.73 0 0 1 5.658.714c1.626-1.028 3.785-1.312 5.652-.714 4.058 1.31 5.319 5.734 4.191 9.255-1.738 5.53-9.165 9.655-9.48 9.828a.74.74 0 0 1-.36.093"
        clipRule="evenodd"
      />
    </g>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M18.154 10.625a.75.75 0 0 1-.747-.69 2.02 2.02 0 0 0-1.4-1.768.75.75 0 0 1 .46-1.428 3.525 3.525 0 0 1 2.436 3.075.75.75 0 0 1-.75.81"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgIconHeart
