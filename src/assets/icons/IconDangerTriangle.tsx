import type { SVGProps } from 'react'
const SvgIconDangerTriangle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <mask
      id="icon-danger-triangle_svg__a"
      width={21}
      height={19}
      x={2}
      y={3}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M2 3h20.014v18.186H2z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-danger-triangle_svg__a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.013 4.5c-.476 0-.9.246-1.139.659L3.677 17.724a1.3 1.3 0 0 0 .005 1.308c.237.409.66.654 1.134.654h14.383c.471 0 .895-.245 1.132-.654.239-.409.24-.898.005-1.308L13.15 5.159a1.3 1.3 0 0 0-1.139-.659m7.185 16.686H4.817a2.78 2.78 0 0 1-2.432-1.402 2.78 2.78 0 0 1-.01-2.805l7.2-12.566A2.78 2.78 0 0 1 12.013 3h.002a2.78 2.78 0 0 1 2.439 1.415l7.186 12.564c.503.879.5 1.928-.01 2.805a2.78 2.78 0 0 1-2.43 1.402"
        clipRule="evenodd"
      />
    </g>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.004 14.164a.75.75 0 0 1-.75-.75v-3.1a.75.75 0 0 1 1.5 0v3.1a.75.75 0 0 1-.75.75M12.006 17.499a1.003 1.003 0 0 1-1.005-1c0-.553.443-1 .995-1h.01a1 1 0 1 1 0 2"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgIconDangerTriangle
