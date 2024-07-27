import { AdminOrder } from '@/types/admin-order'

export interface AdminOrderResponse {
  totalPages: number
  totalElements: number
  size: number
  number: number
  content: AdminOrder[]
  first: boolean
  last: boolean
  empty: boolean
}

export interface AdminInChargeResponse {
  pictureGenerateResponseId: number
  adminInCharge: string
  responseStatus: string
}
