import { CommonPicture } from '@/types/admin-order'

export type ReportStatus = 'RESOLVED' | 'NOT_RESOLVED' | 'ALL'

export interface UserReport {
  id: number
  reportId: number
  reporterEmail: string
  creatorEmail: string
  pictureCompleted: CommonPicture
  content: string
  reportStatus: ReportStatus
  pictureGenerateResponseId: number
  createdAt: Date
}
