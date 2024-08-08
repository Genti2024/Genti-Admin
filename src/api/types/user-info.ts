import { UserInfo, UserRole, UserStatus } from '@/types/user-info'

export interface PostUserStatusReqParams {
  id: string
  status: UserStatus
}

export interface PostUserRoleReqParams {
  id: string
  role: UserRole
}

export interface UserInfoResponse {
  totalPages: number
  totalElements: number
  size: number
  number: number
  content: UserInfo[]
  first: boolean
  last: boolean
  empty: boolean
}

export interface StatusResponse {
  success: boolean
  response: boolean
}
