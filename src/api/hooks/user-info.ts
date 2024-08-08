import { URLSearchParams } from 'url'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CommonResponse } from '@/api/types/generic-response'
import { PostUserRoleReqParams, PostUserStatusReqParams, StatusResponse, UserInfoResponse } from '@/api/types/user-info'
import { axiosInstance } from '@/lib/api/axios-instance'
import { UserRole } from '@/types/user-info'

const getUserInfoList = async (page: string, role: UserRole, email?: string) => {
  try {
    const response = await axiosInstance.get<CommonResponse<UserInfoResponse>>(
      `admin/users?page=${page}&size=10&role=${role}&${email ? `&email=${email}` : ''}`,
    )
    return response.data.response
  } catch (error) {
    console.log(error.response ? error.response.data : error.message)
  }
}

export const useGetUserInfoList = (searchParam: URLSearchParams) => {
  const page = searchParam.get('page') ?? '0'
  const email = searchParam.get('email') ?? ''
  const role = (searchParam.get('role') ?? 'ALL') as UserRole
  return useQuery({
    queryKey: ['userInfo', page, email, role],
    queryFn: () => getUserInfoList(page, role, email),
  })
}

const postUserStatus = async ({ id, status }: PostUserStatusReqParams) => {
  const response = await axiosInstance.post<CommonResponse<boolean>>(`/admin/users/${id}/status`, { status })
  return response.data.response
}

export const usePostUserStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postUserStatus,
    onSuccess: data => {
      data ?? queryClient.invalidateQueries({ queryKey: ['userInfo'] })
    },
  })
}

const postUserRole = async ({ id, role }: PostUserRoleReqParams) => {
  const response = await axiosInstance.post<CommonResponse<StatusResponse>>(`admin/users/${id}/role`, { role })
  return response.data.response
}

export const usePostUserRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postUserRole,
    onSuccess: data => {
      data ?? queryClient.invalidateQueries({ queryKey: ['userInfo'] })
    },
  })
}
