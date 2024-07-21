export type UserRole = 'CREATOR' | 'USER'
type Gender = 'M' | 'F'
export type UserStatus = 'ACTIVATED' | 'DEACTIVATED'

export interface UserInfo {
  id: number
  email: string
  userRole: UserRole
  age: number
  sex: string
  status: UserStatus
  createdAt: Date
  orderCount: number | null
  producedCount: number | null
  accumulatedBalance: number | null
  currentBalance: number | null
  recentConnection: Date
  creatorResponseDto: null
  depositResponseDto: null
  lastLoginDate: Date
}
