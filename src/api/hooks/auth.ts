import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { CommonResponse } from '@/api/types/generic-response'

interface Token {
  accessToken: string
  refreshToken: string
}
export const getNewToken = async (token: Token) => {
  const response = await axios.post<CommonResponse<Token>>('https://api.genti.kr/auth/v1/reissue', { ...token })
  return response.data.response
}

interface LoginResponse {
  oauthPlatform: string
  uri: string
}
export const kakaoLogin = async () => {
  const response = await axios.get<CommonResponse<LoginResponse>>('https://api.genti.kr/auth/v1/login/oauth2', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    params: { oauthPlatform: 'KAKAO' },
  })
  return response.data
}

export const useKakaoLogin = () => {
  return useQuery({ queryKey: ['kakaoLogin'], queryFn: kakaoLogin })
}

interface KakaoCodeResponse extends Token {
  userRoleString: string
}
const getKaKaoToken = async (code: string | null) => {
  const response = await axios.get<CommonResponse<KakaoCodeResponse>>(
    'https://api.genti.kr/auth/v1/login/oauth2/web/kakao',
    { params: { code } },
  )
  return response.data.response
}

export const useGetKakaoToken = (code: string | null) => {
  return useQuery({ queryKey: ['kakaoToken', code], queryFn: () => getKaKaoToken(code), enabled: !!code })
}
