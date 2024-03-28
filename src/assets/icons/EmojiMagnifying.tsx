import type { SVGProps } from 'react'
const SvgEmojiMagnifying = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path fill="url(#emoji-magnifying_svg__a)" d="M0 0h16v16H0z" />
    <defs>
      <pattern
        id="emoji-magnifying_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#emoji-magnifying_svg__b" transform="scale(.01389)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="emoji-magnifying_svg__b"
        width={72}
        height={72}
      />
    </defs>
  </svg>
)
export default SvgEmojiMagnifying
