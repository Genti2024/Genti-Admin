import { AxiosError } from 'axios'

import { getNewToken } from '@/api/hooks/auth'
import { axiosInstance } from '@/lib/api/axios-instance'

export const onResponse = async (error: AxiosError) => {
  const { config, response } = error
  console.log(error)
  if (response?.status === 401 && config) {
    const originalConfig = { ...config }
    try {
      console.log('refreshed:', new Date().toTimeString())
      const res = await getNewToken({
        accessToken: localStorage.getItem('accessToken')!,
        refreshToken: localStorage.getItem('refreshToken')!,
      })
      originalConfig.headers['Authorization'] = `${res.accessToken}`
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      return axiosInstance(originalConfig)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return Promise.reject(error)
}
