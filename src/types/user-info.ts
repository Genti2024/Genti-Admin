export type UserRole = 'CREATOR' | 'USER'
type Gender = 'M' | 'F'
export type UserStatus = 'ACTIVATED' | 'DEACTIVATED'

export type UserInfo = {
  id: string
  email: string
  userRole: UserRole
  age: number
  gender: Gender
  status: UserStatus
  createdAt: Date
  orderCount: number | null
  producedCount: number | null
  accumulatedBalance: number | null
  currentBalance: number | null
  recentConnection: Date
}
