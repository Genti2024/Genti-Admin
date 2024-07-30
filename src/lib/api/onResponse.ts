import { AxiosError } from 'axios'

import { getNewToken } from '@/api/hooks/auth'
import { axiosInstance } from '@/lib/api/axios-instance'

export const onResponse = async (error: AxiosError) => {
  const { config, response } = error
  if (response?.status === 401 && config) {
    const originalConfig = { ...config }
    try {
      const res = await getNewToken()
      console.log('refreshed:', new Date().toTimeString())
      originalConfig.headers['Authorization'] = `Bearer ${res}`
      localStorage.setItem('_auth', res)
      return axiosInstance(originalConfig)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return Promise.reject(error)
}
