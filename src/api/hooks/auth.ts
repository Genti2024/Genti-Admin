import axios from 'axios'

import { CommonResponse } from '@/api/types/generic-response'

interface Token {
  accessToken: string
  refreshToken: string
}
export const getNewToken = async () => {
  const response = await axios.get<CommonResponse<Token>>('https://api.genti.kr/auth/v1/login/testjwt?role=ADMIN')
  console.log(response.data)
  return response.data.response.accessToken
}
