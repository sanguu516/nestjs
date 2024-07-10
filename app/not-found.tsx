import Link from 'next/link'
import { Fragment } from 'react'

export default function NotFound() {
  return (
    <Fragment>
      <div>Error404</div>
      <Link href="/">Return Home</Link>
    </Fragment>
  )
}
