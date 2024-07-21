import axios from 'axios'

// import { onRequest } from '@/lib/api/onRequest'
// import { onResponse } from '@/lib/api/onResponse'

export const axiosInstance = axios.create({
  baseURL: 'https://genti.kr/api/v1/admin',
  headers: {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjE1MzY5OTUsImV4cCI6MTIxNzIxNTM2OTk1LCJ1c2VySWQiOiIxIiwicm9sZSI6IlJPTEVfQURNSU4sUk9MRV9NQU5BR0VSLFJPTEVfQ1JFQVRPUixST0xFX1VTRVIiLCJ0eXBlIjoiYWNjZXNzIn0.WTpb5F7RSrhr3TiemFySV7o31qRqB3MOv4LeqPhTWD50T3vmMWVheexbNX3mZfGf_GXonergOx6HISf4WwEWyg`,
  },
})

// axiosInstance.interceptors.request.use(onRequest, onResponse)
