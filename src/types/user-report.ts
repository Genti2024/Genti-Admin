import { CommonPicture } from '@/types/admin-order'

export type ReportStatus = 'RESOLVED' | 'NOT_RESOLVED'

export interface UserReportProps {
  reportId: number
  reporterEmail: string
  creatorEmail: string
  pictureCompleted: CommonPicture
  content: string
  reportStatus: ReportStatus
  pictureGenerateResponseId: number
  createdAt: Date
}
