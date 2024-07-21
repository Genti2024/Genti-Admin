import { useQuery } from '@tanstack/react-query'

import { AdminOrderResponse } from '@/api/types/admin-order'
import { CommonResponse } from '@/api/types/generic-response'
import { axiosInstance } from '@/lib/api/axios-instance'

const getAdminOrderList = async () => {
  const response = await axiosInstance.get<CommonResponse<AdminOrderResponse>>(
    `/picture-generate-requests/all?page=0&size=10&sortBy=${'createdAt'}&direction=${'asc'}&matchToAdmin=true`,
  )
  return response.data.response
}

export const useGetAdminOrderList = () => {
  return useQuery({ queryKey: ['adminOrder'], queryFn: getAdminOrderList })
}
