import { InternalAxiosRequestConfig } from 'axios'

export const onRequest = async (config: InternalAxiosRequestConfig) => {
  console.log('onRequest:', new Date().toTimeString())
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) config.headers.Authorization = `${accessToken}`
  return config
}
