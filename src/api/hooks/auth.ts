import axios from 'axios'

export const getNewToken = async () => {
  const response = await axios.get('https://genti.kr/login/testjwt?role=ADMIN')
  console.log(response.data)
  return response.data
}
