type Gender = 'M' | 'F'
export type Status = 'ASSIGNING' | 'IN_PROGRESS' | 'COMPLETED'

type PictureRatio = 'RATIO_3_2' | 'NONE' | 'RATIO_2_3'
type PictureType =
  | 'PictureCompleted'
  | 'PictureCreatedByCreator'
  | 'PicturePose'
  | 'PicturePost'
  | 'PictureProfile'
  | 'PictureUserFace'
  | 'ResponseExampleexport'
export interface FacePictureList {
  id: number
  url: string
  key: string
  pictureRatio: PictureRatio
  type: PictureType
}

export interface PosePicture {
  id: number
  url: string
  key: string
  pictureRatio: PictureRatio
  type: PictureType
}
export interface AdminOrder {
  pictureGenerateRequestId: number
  requesterId: number
  requesterEmail: string
  prompt: string
  promptAdvanced: string
  facePictureList: FacePictureList[] | null
  posePicture: PosePicture[] | null
  cameraAngle: string
  shotCoverage: string
  requestStatus: Status
  createdAt: Date
  remainTime: string
}
