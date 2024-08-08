export type UserRole = 'USER' | 'CREATOR' | 'ADMIN' | 'ALL'
export type Sex = '남' | '여'
export type UserStatus = '활성화' | '비활성화'

export interface UserInfo {
  id: number
  email: string
  userRole: UserRole
  age: number
  sex: string
  userStatus: UserStatus
  createdAt: Date
  requestTaskCount: number | null
  //creatorResponseDto: CreatorResponseDto
  completedTaskCount: number | null
  depositResponseDto: DepositResponseDto
  lastLoginDate: Date
}

export interface CreatorResponseDto {
  creatorId: number
  workable: boolean
  bankType: string
  accountNumber: string
  accountHolder: string
  completedTaskCount: number
}

export interface DepositResponseDto {
  id: number
  description: number | null
  nowAmount: number
  totalAmount: number
}
