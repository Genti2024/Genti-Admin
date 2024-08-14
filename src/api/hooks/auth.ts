import axios from 'axios'

import { CommonResponse } from '@/api/types/generic-response'

interface Token {
  accessToken: string
  refreshToken: string
}
export const getNewToken = async () => {
  const response = await axios.get<CommonResponse<Token>>('https://dev.genti.kr/auth/v1/login/testjwt?role=ADMIN')
  console.log(response.data)
  return response.data.response.accessToken
}

export const kakaoLogin = async () => {
  const response = await axios.get('https://dev.genti.kr/auth/v1/login/oauth2', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    params: { oauthPlatform: 'KAKAO' },
  })
  return response.data
}
