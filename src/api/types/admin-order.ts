import { AdminOrder } from '@/types/admin-order'

export interface AdminOrderResponse {
  totalPages: number
  totalElements: number
  size: number
  content: AdminOrder[]
  first: boolean
  last: boolean
  empty: boolean
}
