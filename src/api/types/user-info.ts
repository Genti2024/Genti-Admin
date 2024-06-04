import { UserStatus } from '@/types/user-info'

export interface PostUserStatusReqParams {
  id: string
  status: UserStatus
}
