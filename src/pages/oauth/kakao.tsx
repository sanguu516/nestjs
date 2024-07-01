import { oauthSignup } from '@/apis/oauthApis'
import UserContext from '@/providers/UserProvider'
import { StorageKey } from '@/utils/localStorageUtil'
import useCustomToast from '@/utils/useCustomToast'
import { useMutation } from '@tanstack/react-query'
import { type InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

export const getServerSideProps = (context: { query: { code: string } }) => {
  const { code } = context?.query

  return {
    props: {
      code,
    },
  }
}

export default function OAuth({ code }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { setUser } = useContext(UserContext)
  const toast = useCustomToast()

  const { mutate: oauthLoginMutate } = useMutation({ mutationFn: oauthSignup })

  useEffect(() => {
    if (typeof code !== 'string') return
    oauthLoginMutate(
      { code, callback_url: `${process.env.NEXT_PUBLIC_URL}/oauth/kakao` },
      {
        onSuccess: (res) => {
          localStorage.setItem(StorageKey.aceessToken, res.access)
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
  }, [])

  return <></>
}
