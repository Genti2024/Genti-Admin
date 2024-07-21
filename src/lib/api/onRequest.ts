import { InternalAxiosRequestConfig } from 'axios'

import { getNewToken } from '@/api/hooks/auth'

export const onRequest = async (config: InternalAxiosRequestConfig) => {
  console.log('onRequest:', new Date().toTimeString())
  const accessToken = localStorage.getItem('_auth')
  if (!accessToken) {
    const newToken = await getNewToken()
    config.headers.Authorization = `Bearer ${newToken}`
    return config
  }
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
}
