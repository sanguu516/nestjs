'use client'

import { getMe, type User } from '@/apis/authApis'
import { NeedSignInError } from '@/apis/fetchHandler'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!user) {
      void getMe()
        .then((res) => {
          if (res) {
            setUser(res)
          } else {
            throw new NeedSignInError()
          }
        })
        .catch((error) => {
          if (error instanceof NeedSignInError) {
            void router.replace(
              `/auth/signin${pathname ? `?redirect=${encodeURIComponent(pathname)}` : ''}`
            )
          }
        })
    }
  }, [user, router, pathname])

  return { user, setUser, isCheckingAuth }
}
