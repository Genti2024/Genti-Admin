import axios from 'axios'

import { onRequest } from '@/lib/api/onRequest'
import { onResponse } from '@/lib/api/onResponse'

export const axiosInstance = axios.create({
  baseURL: 'https://api.genti.kr/api/v1/',
  // headers: {
  //   Authorization:
  //     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjE2Mzk2ODQsImV4cCI6MTIxNzIxNjM5Njg0LCJ1c2VySWQiOiIxIiwicm9sZSI6IlJPTEVfQURNSU4sUk9MRV9NQU5BR0VSLFJPTEVfQ1JFQVRPUixST0xFX1VTRVIiLCJ0eXBlIjoiYWNjZXNzIn0.2pPjq16gcovMFnya_piuR6972YeZt4JeKfKcqQspi6p6tBhuTF7OLODaqzrr61Bk0kPD868MoS4ZB9fWIS-D6A',
  // },
})

axiosInstance.interceptors.request.use(onRequest)
axiosInstance.interceptors.response.use(response => response, onResponse)
