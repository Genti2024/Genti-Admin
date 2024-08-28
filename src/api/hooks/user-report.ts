import { URLSearchParams } from 'url'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { CommonResponse } from '@/api/types/generic-response'
import { PostReportStatusReqParams, StatusResponse, UserReportResponse } from '@/api/types/user-report'
import { axiosInstance } from '@/lib/api/axios-instance'
import { ReportStatus } from '@/types/user-report'

const getUserReportList = async (page: string, status: ReportStatus, email?: string | null) => {
  const response = await axiosInstance.get<CommonResponse<UserReportResponse>>(
    `admin/reports?${email ? `email=${email}` : ''}`,
    {
      params: { page, size: 10, status },
    },
  )
  return response.data.response
}

export const useGetUserReport = (searchParam: URLSearchParams) => {
  const page = searchParam.get('page') ?? '0'
  const email = searchParam.get('email') ?? ''
  const status = (searchParam.get('status') ?? 'ALL') as ReportStatus
  return useQuery({
    queryKey: ['userReport', page, email, status],
    queryFn: () => getUserReportList(page, status, email),
  })
}

const postReportStatus = async ({ reportId, status }: PostReportStatusReqParams) => {
  const response = await axiosInstance.post<CommonResponse<StatusResponse>>(`/admin/reports`, {
    id: reportId,
    reportStatus: status,
  })
  return { response: response.data.response, reportId, status }
}

export const usePostReportStatus = () => {
  const [searchParam] = useSearchParams()
  const page = searchParam.get('page') ?? '0'
  const email = searchParam.get('email') ?? ''
  const status = (searchParam.get('status') ?? 'ALL') as ReportStatus
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postReportStatus,
    onSuccess: data => {
      queryClient.setQueryData<UserReportResponse>(
        ['userReport', page, email, status],
        (oldData): UserReportResponse => {
          if (!oldData) {
            return {} as UserReportResponse
          }
          return {
            ...oldData,
            content: oldData.content.map(item =>
              item.reportId === data.reportId
                ? { ...item, reportStatus: data.status === 'RESOLVED' ? '해결 완료' : '해결 전' }
                : item,
            ),
          }
        },
      )
    },
  })
}
