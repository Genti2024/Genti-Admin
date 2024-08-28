import { ReportStatus, UserReport } from '@/types/user-report'

export interface PostReportStatusReqParams {
  reportId: number
  status: ReportStatus
}

export interface UserReportResponse {
  totalPages: number
  totalElements: number
  size: number
  number: number
  content: UserReport[]
  first: boolean
  last: boolean
  empty: boolean
}

export interface StatusResponse {
  success: boolean
  response: boolean
}
