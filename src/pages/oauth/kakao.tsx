import { useContext, useEffect } from 'react'
import { type InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { UserContext } from '../_app'
import { StorageKey } from '@/utils/localStorageUtil'
import { oauthSignup } from '@/apis/oauthApis'

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

  const { mutate: oauthLoginMutate } = useMutation({ mutationFn: oauthSignup })

  if (typeof code === 'string') {
  }

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
      }
    )
  }, [])

  return <></>
}
