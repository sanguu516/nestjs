import type { SVGProps } from 'react'
const SvgIconEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M20.751 21.94h-7.253a.75.75 0 0 1 0-1.5h7.253a.75.75 0 0 1 0 1.5"
      clipRule="evenodd"
    />
    <mask
      id="icon-edit_svg__a"
      width={18}
      height={19}
      x={2}
      y={3}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" fillRule="evenodd" d="M2 3h17.181v18.94H2.001z" clipRule="evenodd" />
    </mask>
    <g mask="url(#icon-edit_svg__a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13.11 5.017 3.697 16.792c-.171.214-.234.49-.171.755l.68 2.885 3.04-.038a.95.95 0 0 0 .733-.352c3.217-4.025 9.35-11.7 9.524-11.924a1.36 1.36 0 0 0 .142-1.004 1.4 1.4 0 0 0-.652-.887 329 329 0 0 1-1.808-1.398 1.497 1.497 0 0 0-2.073.188M3.615 21.94a.75.75 0 0 1-.73-.577l-.82-3.471a2.37 2.37 0 0 1 .46-2.037l9.42-11.782.012-.013c1.033-1.235 2.9-1.417 4.16-.406l1.724 1.339c.608.362 1.083 1.009 1.263 1.775.179.758.049 1.54-.368 2.2-.031.05-.058.092-9.586 12.012a2.45 2.45 0 0 1-1.886.914l-3.64.046z"
        clipRule="evenodd"
      />
    </g>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.223 11.685a.75.75 0 0 1-.457-.155l-5.452-4.188a.751.751 0 0 1 .914-1.19l5.453 4.188a.75.75 0 0 1-.458 1.345"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgIconEdit
