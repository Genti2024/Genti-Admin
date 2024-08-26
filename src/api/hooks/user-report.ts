import { useQuery } from '@tanstack/react-query'

import { CommonResponseWithPagination } from '@/api/types/generic-response'
import { axiosInstance } from '@/lib/api/axios-instance'
import { ReportStatus, UserReportProps } from '@/types/user-report'

const getUserReport = async (page: string, status: ReportStatus, email?: string) => {
  const response = await axiosInstance.get<CommonResponseWithPagination<UserReportProps>>(
    `admin/reports${email !== '' ? `email=${email}` : ''}`,
    { params: { page, size: 10, status } },
  )
  return response.data.response
}

export const useGetUserReport = (searchParam: URLSearchParams) => {
  const page = searchParam.get('page') ?? '0'
  const email = searchParam.get('email') ?? ''
  const status = (searchParam.get('status') ?? 'ALL') as ReportStatus
  return useQuery({
    queryKey: ['adminOrder', page, email, status],
    queryFn: () => getUserReport(page, status, email),
  })
}
