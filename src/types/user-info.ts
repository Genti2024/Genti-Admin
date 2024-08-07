export type UserRole = '사용자' | '공급자'
export type Sex = '남' | '여'
export type UserStatus = '활성' | '비활성'

export interface UserInfo {
  id: number
  email: string
  userRole: UserRole
  age: number
  sex: string
  userStatus: UserStatus
  createdAt: Date
  requestTaskCount: number | null
  creatorResponseDto: CreatorResponseDto
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
  nowAmount: number
  totalAmount: number
}
