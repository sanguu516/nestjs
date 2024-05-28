/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    Kakao: any
  }
}

export default function KakaoShare() {
  const pathname = usePathname()
  const url = process.env.NEXT_PUBLIC_URL + pathname

  const kakaoButton = () => {
    if (window.Kakao) {
      window.Kakao.Share.createScrapButton({
        container: '#kakaotalk-sharing-btn',
        requestUrl: url,
        templateId: Number(process.env.NEXT_PUBLIC_TEMPLATE_ID),
      })
    }
  }

  useEffect(() => {
    kakaoButton()
  }, [])

  return (
    <button id="kakaotalk-sharing-btn">
      <Image
        src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="카카오톡 공유 보내기 버튼"
        width={24}
        height={24}
      />
    </button>
  )
}
