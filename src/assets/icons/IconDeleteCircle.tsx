import type { SVGProps } from 'react'
const SvgIconDeleteCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 3.5c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.813-8.5-8.5-8.5M12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M14.22 8.22a.75.75 0 0 1 1.133.976l-.073.084-6 6a.75.75 0 0 1-1.133-.976l.073-.084z"
    />
    <path
      fill="currentColor"
      d="M8.22 8.22a.75.75 0 0 1 .976-.073l.084.073 6 6a.75.75 0 0 1-.976 1.133l-.084-.073-6-6a.75.75 0 0 1 0-1.06"
    />
  </svg>
)
export default SvgIconDeleteCircle
