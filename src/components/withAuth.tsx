import { getMe } from '@/apis/authApis'
import { NeedSignInError } from '@/apis/fetchHandler'
import { Colors } from '@/styles/colors'
import { Center, Spinner } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import type { ReactJSXIntrinsicAttributes } from 'node_modules/@emotion/react/types/jsx-namespace'
import { type ComponentType, useEffect, useState } from 'react'

function withAuth<T extends ReactJSXIntrinsicAttributes>(Component: ComponentType<T>) {
  return function WithAuth(props: T) {
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
      void getMe()
        .then((res) => {
          if (res) {
            setIsCheckingAuth(false)
          }
        })
        .catch((error) => {
          if (error instanceof NeedSignInError) {
            void router.replace(
              `/auth/signin${pathname ? `?redirect=${encodeURIComponent(pathname)}` : ''}`
            )
          }
        })
    }, [])

    if (isCheckingAuth) {
      return (
        <Center position="absolute" height="100%" width="100%" bgColor={Colors.white} zIndex={300}>
          <Spinner />
        </Center>
      )
    }

    return <Component {...props} />
  }
}

export default withAuth
