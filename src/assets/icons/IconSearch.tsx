import type { SVGProps } from 'react'
const SvgIconSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <mask
      id="icon-search_svg__a"
      width={20}
      height={20}
      x={2}
      y={2}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M2 2h19.477v19.477H2z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-search_svg__a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.739 3.5C7.196 3.5 3.5 7.195 3.5 11.738s3.696 8.239 8.239 8.239c4.542 0 8.238-3.696 8.238-8.239S16.281 3.5 11.739 3.5m0 17.977C6.369 21.477 2 17.108 2 11.738S6.369 2 11.739 2s9.738 4.368 9.738 9.738-4.368 9.739-9.738 9.739"
        clipRule="evenodd"
      />
    </g>
    <mask
      id="icon-search_svg__b"
      width={6}
      height={6}
      x={17}
      y={17}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M17.24 17.707h5.024v5.015H17.24z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#icon-search_svg__b)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M21.514 22.722a.75.75 0 0 1-.53-.22L17.46 18.99a.75.75 0 0 1 1.06-1.063l3.524 3.515a.749.749 0 0 1-.53 1.28"
        clipRule="evenodd"
      />
    </g>
  </svg>
)
export default SvgIconSearch
