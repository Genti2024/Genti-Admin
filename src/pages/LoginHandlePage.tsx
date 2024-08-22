import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useGetKakaoToken } from '@/api/hooks/auth'

const LoginHandlePage = () => {
  const [searchParam] = useSearchParams()
  const kakaoCode = searchParam.get('code')
  const { data, isFetched } = useGetKakaoToken(kakaoCode)
  const navigate = useNavigate()
  useEffect(() => {
    if (isFetched && data) {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      navigate('/')
    }
  }, [isFetched, data, navigate])
  return <></>
}

export default LoginHandlePage
