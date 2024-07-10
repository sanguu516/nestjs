'use client'
import { HydrationBoundary, type DehydratedState } from '@tanstack/react-query'
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
  return <HydrationBoundary state={pageProps?.dehydratedState}>{children}</HydrationBoundary>
}
export default HydrationProvider
