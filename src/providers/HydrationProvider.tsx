import { DehydratedState, HydrationBoundary } from '@tanstack/react-query'
import React from 'react'

const HydrationProvider = ({
  children,
  pageProps,
}: {
  children: React.ReactNode
  pageProps?: {
    dehydratedState: DehydratedState
  }
}) => {
  return <HydrationBoundary state={pageProps?.dehydratedState}></HydrationBoundary>
}
export default HydrationProvider
