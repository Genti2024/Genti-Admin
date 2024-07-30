import { URLSearchParams } from 'url'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { AdminInChargeResponse, AdminOrderResponse } from '@/api/types/admin-order'
import { CommonResponse } from '@/api/types/generic-response'
import { axiosInstance } from '@/lib/api/axios-instance'
import { Status } from '@/types/admin-order'

const getAdminOrderList = async (page: string, status: Status, email?: string) => {
  const response = await axiosInstance.get<CommonResponse<AdminOrderResponse>>(
    `admin/picture-generate-requests/admin-matched?page=${page}&size=10&status=${status}&${email ? `&email=${email}` : ''}`,
  )
  return response.data.response
}

export const useGetAdminOrderList = (searchParam: URLSearchParams) => {
  const page = searchParam.get('page') ?? '0'
  const email = searchParam.get('email') ?? ''
  const status = (searchParam.get('status') ?? 'ALL') as Status
  return useQuery({
    queryKey: ['adminOrder', page, email, status],
    queryFn: () => getAdminOrderList(page, status, email),
  })
}

const postSetAdminInCharge = async ({
  adminInCharge,
  pictureGenerateResponseId,
}: Omit<AdminInChargeResponse, 'responseStatus'>) => {
  const response = await axiosInstance.post<CommonResponse<AdminInChargeResponse>>(
    `admin/picture-generate-responses/${pictureGenerateResponseId}/admin-in-charge`,
    { adminInCharge },
  )
  return response.data.response
}

export const usePostSetAdminInCharge = () => {
  const [searchParam] = useSearchParams()
  const page = searchParam.get('page') ?? '0'
  const email = searchParam.get('email') ?? ''
  const status = searchParam.get('status') ?? 'ALL'
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postSetAdminInCharge,
    onSuccess: data => {
      queryClient.setQueryData<AdminOrderResponse>(
        ['adminOrder', page, email, status],
        (oldData): AdminOrderResponse => {
          if (!oldData) {
            return {} as AdminOrderResponse
          }
          const newContent = oldData.content.map(item => {
            if (item.responseList[0].pictureGenerateResponseId === data.pictureGenerateResponseId) {
              return { ...item, responseList: [{ ...item.responseList[0], adminInCharge: data.adminInCharge }] }
            }
            return item
          })
          return { ...oldData, content: newContent }
        },
      )
    },
  })
}
