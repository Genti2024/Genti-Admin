export type Status = 'BEFORE_WORK' | 'IN_PROGRESS' | 'COMPLETED' | 'EXPIRED' | 'ALL'

type PictureRatio = 'RATIO_3_2' | 'NONE' | 'RATIO_2_3'
type PictureType =
  | 'PictureCompleted'
  | 'PictureCreatedByCreator'
  | 'PicturePose'
  | 'PicturePost'
  | 'PictureProfile'
  | 'PictureUserFace'
  | 'ResponseExampleexport'

export interface CommonPicture {
  id: number
  url: string
  key: string
  pictureRatio: PictureRatio
  type: PictureType
}

export interface ResponseList {
  pictureGenerateResponseId: number
  adminInCharge: string
  pictureCompletedList: CommonPicture[] | null
  responseStatus: Status
}
export interface AdminOrder {
  pictureGenerateRequestId: number
  requesterId: number
  requesterEmail: string
  prompt: string
  promptAdvanced: string
  facePictureList: CommonPicture[] | null
  posePicture: CommonPicture[] | null
  cameraAngle: string
  shotCoverage: string
  requestStatus: Status
  createdAt: Date
  remainTime: string
  adminInCharge: string
  responseList: ResponseList[]
}
