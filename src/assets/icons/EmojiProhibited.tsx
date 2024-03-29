import type { SVGProps } from 'react'
const SvgEmojiProhibited = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path fill="url(#emoji-prohibited_svg__a)" d="M0 0h16v16H0z" />
    <defs>
      <pattern
        id="emoji-prohibited_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#emoji-prohibited_svg__b" transform="scale(.01389)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="emoji-prohibited_svg__b"
        width={72}
        height={72}
      />
    </defs>
  </svg>
)
export default SvgEmojiProhibited