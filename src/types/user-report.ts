type Status = 'RESOLVED' | 'NOT_RESOLVED'
export type UserReport = {
  id: number
  reporterEmail: string
  creatorEmail: string | null
  content: string
  reportStatus: Status
  pictureGenerateResponseId: number
  createdAt: string
}
