import { type SignInResponse } from './authApis'
import fetchHandler from './fetchHandler'

interface OauthLoginParmas {
  callback_url: string
}

export async function oauthLogin({ callback_url }: OauthLoginParmas) {
  return fetchHandler(`social-account/kakao/login/?callback_url=${callback_url}`, {
    method: 'POST',
  })
}

type OauthSignupParmas = OauthLoginParmas & {
  code: string
}

export async function oauthSignup(oauthSignupParams: OauthSignupParmas): Promise<SignInResponse> {
  return fetchHandler('social-account/kakao/registration/', {
    method: 'POST',
    body: JSON.stringify(oauthSignupParams),
  })
}
