import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { CommonResponse } from '@/api/types/generic-response'
import { PostUserStatusReqParams } from '@/api/types/user-info'
import { axiosInstance } from '@/lib/api/axios-instance'
import { UserInfo } from '@/types/user-info'

const getUserInfoList = async () => {
  const response = await axiosInstance.get<CommonResponse<UserInfo>>(`/users?role=${'ALL'}&page=0&size=10`)
  return response.data
}

export const useGetUserInfoList = () => {
  return useQuery({ queryKey: ['userInfo'], queryFn: getUserInfoList, placeholderData: keepPreviousData })
}

const postUserStatus = async ({ id, status }: PostUserStatusReqParams) => {
  const response = await axios.post<CommonResponse<boolean>>(`/api/admin/users/${id}/status`, { status })
  return response.data
}

export const usePostUserStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postUserStatus,
    onSuccess: data => {
      data.response ?? queryClient.invalidateQueries({ queryKey: ['userInfo'] })
    },
  })
}
