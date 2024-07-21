import { UserInfo, UserStatus } from '@/types/user-info'

export interface PostUserStatusReqParams {
  id: string
  status: UserStatus
}

export interface UserInfoResponse {
  totalPages: number
  totalElements: number
  size: number
  content: UserInfo[]
}
