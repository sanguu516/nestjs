import type { SVGProps } from 'react'
const SvgEmojiCardIndex = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path fill="url(#emoji-card-Index_svg__a)" d="M0 0h16v16H0z" />
    <defs>
      <pattern
        id="emoji-card-Index_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#emoji-card-Index_svg__b" transform="scale(.01389)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="emoji-card-Index_svg__b"
        width={72}
        height={72}
      />
    </defs>
  </svg>
)
export default SvgEmojiCardIndex