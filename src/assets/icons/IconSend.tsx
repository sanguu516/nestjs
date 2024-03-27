import type { SVGProps } from 'react'
const SvgIconSend = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <mask
      id="icon-send_svg__a"
      width={20}
      height={20}
      x={2}
      y={3}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M2 3h19.499v19.5H2z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-send_svg__a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m10.805 14.818 3.657 5.933c.16.26.41.257.51.243a.51.51 0 0 0 .433-.371l4.573-15.445a.52.52 0 0 0-.133-.525.51.51 0 0 0-.512-.132L3.877 9.047a.51.51 0 0 0-.371.433.515.515 0 0 0 .241.521l6 3.753 5.303-5.358a.751.751 0 0 1 1.067 1.055zm4.09 7.682a2 2 0 0 1-1.71-.962l-3.877-6.291-6.356-3.975a2 2 0 0 1-.932-1.996 2 2 0 0 1 1.435-1.668L18.91 3.082a2.02 2.02 0 0 1 2.504 2.522l-4.573 15.444a2 2 0 0 1-1.67 1.433 2 2 0 0 1-.277.019"
        clipRule="evenodd"
      />
    </g>
  </svg>
)
export default SvgIconSend
