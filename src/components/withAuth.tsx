import { getMe } from '@/apis/authApis'
import { Colors } from '@/styles/colors'
import { Center, Spinner } from '@chakra-ui/react'
import { ReactJSXIntrinsicAttributes } from 'node_modules/@emotion/react/types/jsx-namespace'
import { ComponentType, useEffect, useState } from 'react'

function withAuth<T extends ReactJSXIntrinsicAttributes>(Component: ComponentType<T>) {
  return function WithAuth(props: T) {
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)

    useEffect(() => {
      void getMe().then((res) => {
        if (res) {
          setIsCheckingAuth(false)
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
