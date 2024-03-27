import type { SVGProps } from 'react'
const SvgIconLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 29" {...props}>
    <path
      fill="url(#icon-logo_svg__a)"
      fillRule="evenodd"
      d="M22.31 7.77a.01.01 0 0 1 .011-.01.01.01 0 0 0 .006-.02l-.012-.008a.01.01 0 0 1-.004-.008.01.01 0 0 0-.01-.01h-.007l-.01-.003L11.818.673a.43.43 0 0 0-.48 0L.882 7.705a.05.05 0 0 1-.029.009H.846a.045.045 0 0 0-.046.045v14.807c0 .152.08.292.21.37l9.894 5.952a.43.43 0 0 0 .652-.37v-5.277a.43.43 0 0 1 .43-.43h9.895a.43.43 0 0 0 .43-.432zm-6.244 1.503a.43.43 0 0 0-.71 0l-1.075 1.574a.43.43 0 0 1-.234.17l-1.825.539a.432.432 0 0 0-.22.677l1.161 1.512c.06.079.092.176.09.275l-.053 1.907a.43.43 0 0 0 .574.418l1.793-.639a.43.43 0 0 1 .289 0l1.793.64a.43.43 0 0 0 .574-.419l-.052-1.907a.43.43 0 0 1 .089-.275l1.16-1.512a.432.432 0 0 0-.22-.677l-1.825-.54a.43.43 0 0 1-.233-.17z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="icon-logo_svg__a"
        x1={0.8}
        x2={11.591}
        y1={8.04}
        y2={22.571}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8098F9" />
        <stop offset={1} stopColor="#6172F3" />
      </linearGradient>
    </defs>
  </svg>
)
export default SvgIconLogo
