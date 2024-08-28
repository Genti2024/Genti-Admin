import axios from 'axios'

import { onRequest } from '@/lib/api/onRequest'
import { onResponse } from '@/lib/api/onResponse'

export const axiosInstance = axios.create({
  baseURL: 'https://dev.genti.kr/api/v1/',
})

axiosInstance.interceptors.request.use(onRequest)
axiosInstance.interceptors.response.use(response => response, onResponse)
