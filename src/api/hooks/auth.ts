import axios from 'axios'

import { CommonResponse } from '@/api/types/generic-response'

interface Token {
  accessToken: string
  refreshToken: string
}
export const getNewToken = async () => {
  const response = await axios.get<CommonResponse<Token>>('https://genti.kr/login/testjwt?role=ADMIN')
  console.log(response.data)
  return response.data.response.accessToken
}
