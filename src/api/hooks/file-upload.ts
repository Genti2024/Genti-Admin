import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'

import { AdminOrderResponse } from '@/api/types/admin-order'
import { FileUploadResponse, PictureUploadReq, S3UploadReq } from '@/api/types/file'
import { CommonResponse } from '@/api/types/generic-response'
import { axiosInstance } from '@/lib/api/axios-instance'
import { CommonPicture } from '@/types/admin-order'

const postGetFileUrl = async (fileName: string) => {
  const response = await axiosInstance.post<CommonResponse<FileUploadResponse>>('/presigned-url', {
    fileType: 'ADMIN_UPLOADED_IMAGE',
    fileName,
  })
  return response.data.response
}

const putFileToS3 = async ({ url, file }: S3UploadReq) => {
  const response = await axios.put<CommonResponse<null>>(url, file, {
    headers: { 'Content-Type': 'application/octet-stream' },
  })
  return response.data.success
}

const postPicture = async ({ pictureGenerateResponseId, s3Key }: PictureUploadReq) => {
  const response = await axiosInstance.post<CommonResponse<CommonPicture[]>>(
    `/admin/picture-generate-responses/${pictureGenerateResponseId}/pictures`,
    [{ key: s3Key }],
  )
  return { response: response.data.response, pictureGenerateResponseId }
}

export const usePictureUpload = () => {
  const [searchParam] = useSearchParams()
  const page = searchParam.get('page') ?? '0'
  const email = searchParam.get('email') ?? ''
  const status = searchParam.get('status') ?? 'ALL'
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postPicture,
    onSuccess: data => {
      queryClient.setQueryData<AdminOrderResponse>(
        ['adminOrder', page, email, status],
        (oldData): AdminOrderResponse => {
          if (!oldData) {
            return {} as AdminOrderResponse
          }
          const newContent = oldData.content.map(item => {
            if (item.responseList[0].pictureGenerateResponseId === data.pictureGenerateResponseId) {
              return { ...item, responseList: [{ ...item.responseList[0], pictureCompletedList: [data.response[0]] }] }
            }
            return item
          })
          return { ...oldData, content: newContent }
        },
      )
    },
  })
}
export const useS3Upload = () => {
  return useMutation({ mutationFn: putFileToS3 })
}
export const useGetFileUrl = () => {
  return useMutation({ mutationFn: postGetFileUrl })
}
