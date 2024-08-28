import { CommonPicture } from '@/types/admin-order'

export type ReportStatus = 'RESOLVED' | 'NOT_RESOLVED' | 'ALL'
export type ReportStatusKor = '해결 완료' | '해결 전' | '전체'
export interface UserReport {
  reportId: number
  reporterEmail: string
  creatorEmail: string
  pictureCompleted: CommonPicture
  content: string
  reportStatus: ReportStatusKor
  pictureGenerateResponseId: number
  createdAt: Date
}
