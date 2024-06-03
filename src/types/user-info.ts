type Privilege = 'CREATOR' | 'USER'
type Gender = 'M' | 'F'
type Status = 'ACTIVATED' | 'DEACTIVATED'
export type UserInfo = {
  id: string
  email: string
  privilege: Privilege
  age: number
  gender: Gender
  status: Status
  createdAt: Date
  orderCount: number | null
  producedCount: number | null
  accumulatedBalance: number | null
  currentBalance: number | null
  recentConnection: Date
}
