import type { SVGProps } from 'react'
const SvgIconUpload = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <mask
      id="icon-upload_svg__a"
      width={20}
      height={15}
      x={2}
      y={8}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M2 8.794h20v13.744H2z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-upload_svg__a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17.566 22.538H6.435A4.44 4.44 0 0 1 2 18.103v-4.875a4.44 4.44 0 0 1 4.435-4.434h.933a.75.75 0 0 1 0 1.5h-.933A2.937 2.937 0 0 0 3.5 13.228v4.875a2.94 2.94 0 0 0 2.935 2.935h11.13a2.94 2.94 0 0 0 2.935-2.935v-4.884a2.93 2.93 0 0 0-2.924-2.925h-.942a.75.75 0 0 1 0-1.5h.942A4.43 4.43 0 0 1 22 13.219v4.884a4.44 4.44 0 0 1-4.434 4.435"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="icon-upload_svg__b"
      width={2}
      height={14}
      x={11}
      y={2}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M11.25 2h1.5v13.54h-1.5z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-upload_svg__b)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 15.541a.75.75 0 0 1-.75-.75V2.75a.75.75 0 0 1 1.5 0v12.041a.75.75 0 0 1-.75.75"
        clipRule="evenodd"
      />
    </g>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.085 6.429a.749.749 0 0 1-.531-1.279l2.915-2.928a.77.77 0 0 1 1.062 0l2.916 2.928a.75.75 0 0 1-1.062 1.058L12 3.814 9.616 6.208a.74.74 0 0 1-.53.22"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgIconUpload
