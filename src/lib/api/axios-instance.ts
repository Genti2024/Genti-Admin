import axios from 'axios'

import { onRequest } from '@/lib/api/onRequest'
import { onResponse } from '@/lib/api/onResponse'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use(onRequest)
axiosInstance.interceptors.response.use(response => response, onResponse)
