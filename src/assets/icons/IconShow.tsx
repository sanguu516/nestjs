import type { SVGProps } from 'react'
const SvgIconShow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 9.641a2.414 2.414 0 0 0-2.412 2.412A2.413 2.413 0 0 0 12 14.463a2.414 2.414 0 0 0 2.412-2.41A2.415 2.415 0 0 0 12 9.641m0 6.322a3.915 3.915 0 0 1-3.912-3.91A3.916 3.916 0 0 1 12 8.141a3.917 3.917 0 0 1 3.912 3.912A3.915 3.915 0 0 1 12 15.963"
      clipRule="evenodd"
    />
    <mask
      id="icon-show_svg__a"
      width={20}
      height={17}
      x={2}
      y={4}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M2 4h20v16.105H2z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-show_svg__a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3.57 12.052c1.86 4.11 4.993 6.552 8.43 6.553 3.437 0 6.57-2.444 8.43-6.553C18.57 7.944 15.437 5.502 12 5.5c-3.436.001-6.57 2.444-8.43 6.552m8.432 8.053h-.005c-4.136-.003-7.85-2.902-9.936-7.757a.75.75 0 0 1 0-.592C4.147 6.902 7.86 4.003 11.997 4h.006c4.136.003 7.85 2.902 9.936 7.756a.74.74 0 0 1 0 .592c-2.085 4.855-5.8 7.754-9.936 7.757z"
        clipRule="evenodd"
      />
    </g>
  </svg>
)
export default SvgIconShow
