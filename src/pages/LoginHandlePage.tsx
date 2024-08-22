import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetKakaoToken } from '@/api/hooks/auth'

const LoginHandlePage = () => {
  const [searchParam] = useSearchParams()
  const kakaoCode = searchParam.get('code')
  const { data, isFetched } = useGetKakaoToken(kakaoCode)
  useEffect(() => {
    if (isFetched && data) {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
    }
  }, [isFetched, data])
  return <div>LoginHandlePage</div>
}

export default LoginHandlePage
