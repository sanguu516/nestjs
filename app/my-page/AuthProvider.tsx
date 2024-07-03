'use client'
import { getMe } from '@/apis/authApis'
import { NeedSignInError } from '@/apis/fetchHandler'
import { Colors } from '@/styles/colors'
import { Center, Spinner } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
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
  }, [router, pathname])

  if (isCheckingAuth) {
    return (
      <Center position="absolute" height="100%" width="100%" bgColor={Colors.white} zIndex={300}>
        <Spinner />
      </Center>
    )
  }

  return <>{children}</>
}
