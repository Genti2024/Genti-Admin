import { URLSearchParams } from 'url'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { CommonResponse } from '@/api/types/generic-response'
import { PostUserRoleReqParams, PostUserStatusReqParams, StatusResponse, UserInfoResponse } from '@/api/types/user-info'
import { axiosInstance } from '@/lib/api/axios-instance'
import { UserRole } from '@/types/user-info'

const getUserInfoList = async (page: string, role: UserRole, email?: string | null) => {
  const response = await axiosInstance.get<CommonResponse<UserInfoResponse>>(
    `admin/users?${email ? `email=${email}` : ''}`,
    {
      params: { page, size: 10, role },
    },
  )
  return response.data.response
}

export const useGetUserInfoList = (searchParam: URLSearchParams) => {
  const page = searchParam.get('page') ?? '0'
  const email = searchParam.get('email')
  const role = (searchParam.get('role') ?? 'ALL') as UserRole
  return useQuery({
    queryKey: ['userInfo', page, email, role],
    queryFn: () => getUserInfoList(page, role, email),
  })
}

const postUserStatus = async ({ userId, status }: PostUserStatusReqParams) => {
  const response = await axiosInstance.post<CommonResponse<boolean>>(`/admin/users/${userId}/status`, {
    userStatus: status === '활성' ? 'ACTIVATED' : 'DEACTIVATED',
  })
  return response.data.response
}

export const usePostUserStatus = () => {
  const [searchParam] = useSearchParams()
  const page = searchParam.get('page') ?? '0'
  const email = searchParam.get('email')
  const role = (searchParam.get('role') ?? 'ALL') as UserRole
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo', page, email, role] })
    },
  })
}

const postUserRole = async ({ userId, role }: PostUserRoleReqParams) => {
  const response = await axiosInstance.post<CommonResponse<StatusResponse>>(`admin/users/${userId}/role`, {
    userRole: role,
  })
  return response.data.response
}

export const usePostUserRole = () => {
  const [searchParam] = useSearchParams()
  const page = searchParam.get('page') ?? '0'
  const email = searchParam.get('email')
  const role = (searchParam.get('role') ?? 'ALL') as UserRole
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo', page, email, role] })
    },
  })
}
