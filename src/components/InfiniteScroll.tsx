import { Box } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

interface Props {
  onLoadMore: () => void
  children: React.ReactNode
}

export default function InfiniteScroll(props: Props) {
  const { onLoadMore, children } = props

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bottomRef.current === null) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].intersectionRatio > 0) {
        console.log('fetchMore')
        void onLoadMore()
      }
    })

    observer.observe(bottomRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Box height="100%" overflow="scroll">
      {children}
      <Box ref={bottomRef} />
    </Box>
  )
}
