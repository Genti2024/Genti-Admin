import { PictureRatio } from '@/types/admin-order'

export interface FileUploadResponse {
  fileName: 'string'
  url: 'string'
  s3Key: 'string'
}

export interface S3UploadReq {
  url: string
  file: File
}

export interface PictureUploadReq {
  pictureGenerateResponseId: number
  s3Key: string
}

export interface PictureUploadRes {
  id: number
  url: string
  key: string
  pictureRatio: PictureRatio
  type: string
}
