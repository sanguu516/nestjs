'use client'

import { oauthSignup } from '@/apis/oauthApis'
import UserContext from '@/providers/UserProvider'
import { StorageKey } from '@/utils/localStorageUtil'
import useCustomToast from '@/utils/useCustomToast'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect } from 'react'

const OAuth = () => {
  const router = useRouter()
  const { setUser } = useContext(UserContext)
  const toast = useCustomToast()
  const searchParams = useSearchParams()

  const { mutate: oauthLoginMutate } = useMutation({ mutationFn: oauthSignup })

  useEffect(() => {
    const code = searchParams.get('code')

    if (!code) return // code가 null이면 return

    oauthLoginMutate(
      { code, callback_url: `${process.env.NEXT_PUBLIC_URL}/oauth/kakao` },
      {
        onSuccess: (res) => {
          localStorage.setItem(StorageKey.aceessToken, res.access) // 'aceessToken'으로 수정
          localStorage.setItem(StorageKey.refreshToken, res.refresh)
          setUser(res.user)
          void router.replace('/')
        },
        onError: () => {
          void router.replace('/auth/signin')
          const EXIST_MSG = '이미 해당 이메일로 회원가입 되어있습니다.'
          toast({
            title: EXIST_MSG,
            status: 'error',
          })
        },
      }
    )
  }, [searchParams, router, oauthLoginMutate, setUser, toast])

  return <></>
}

export default OAuth
