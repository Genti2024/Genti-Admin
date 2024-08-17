import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const LoginSuccessPage = () => {
  const [token, setToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')

  useEffect(() => {
    // 쿠키에서 토큰 읽기
    const accessToken = Cookies.get('Access-Token');
    const refreshToken = Cookies.get('Refresh-Token');

    
    if (accessToken) {
      setToken(accessToken);
    }

    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
  }, [])

  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-5 text-2xl font-semibold">Login Success</h1>

      {token && (
        <div className="mb-5 p-3 bg-green-100 text-green-700">
          Access Token: {token}
        </div>
      )}
      
      {refreshToken && (
        <div className="mb-5 p-3 bg-blue-100 text-blue-700">
          Refresh Token: {refreshToken}
        </div>
      )}
    </div>
  )
}

export default LoginSuccessPage
