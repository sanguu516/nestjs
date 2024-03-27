import type { SVGProps } from 'react'
const SvgIconFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.08 18.593h-6.3a.75.75 0 0 1 0-1.5h6.3a.75.75 0 0 1 0 1.5M19.191 8.9h-6.3a.75.75 0 0 1 0-1.5h6.3a.75.75 0 0 1 0 1.5"
      clipRule="evenodd"
    />
    <mask
      id="icon-filter_svg__a"
      width={7}
      height={7}
      x={3}
      y={5}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M3 5h6.226v6.192H3z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-filter_svg__a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6.113 6.5c-.889 0-1.613.716-1.613 1.597 0 .88.724 1.595 1.613 1.595.89 0 1.613-.715 1.613-1.595 0-.881-.723-1.597-1.613-1.597m0 4.692C4.397 11.192 3 9.804 3 8.097A3.11 3.11 0 0 1 6.113 5a3.11 3.11 0 0 1 3.113 3.097c0 1.707-1.396 3.095-3.113 3.095"
        clipRule="evenodd"
      />
    </g>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M17.388 16.208c-.89 0-1.614.716-1.614 1.596s.724 1.596 1.614 1.596c.889 0 1.612-.715 1.612-1.596 0-.88-.723-1.596-1.612-1.596m0 4.692c-1.717 0-3.114-1.389-3.114-3.096s1.397-3.096 3.114-3.096a3.11 3.11 0 0 1 3.112 3.096 3.11 3.11 0 0 1-3.112 3.096"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgIconFilter
