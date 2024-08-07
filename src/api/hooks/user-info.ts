import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CommonResponse } from '@/api/types/generic-response'
import { PostUserRoleReqParams, PostUserStatusReqParams, StatusResponse, UserInfoResponse } from '@/api/types/user-info'
import { axiosInstance } from '@/lib/api/axios-instance'

const getUserInfoList = async () => {
  const response = await axiosInstance.get<CommonResponse<UserInfoResponse>>(`/users?role=${'ALL'}&page=0&size=10`)
  return response.data.response
}

export const useGetUserInfoList = () => {
  return useQuery({ queryKey: ['userInfo'], queryFn: getUserInfoList, placeholderData: keepPreviousData })
}

const postUserStatus = async ({ id, status }: PostUserStatusReqParams) => {
  const response = await axiosInstance.post<CommonResponse<StatusResponse>>(`/users/${id}/status`, { status })
  return response.data
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
  const response = await axiosInstance.post<CommonResponse<StatusResponse>>(`/users/${id}/role`, { role })
  return response.data
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
