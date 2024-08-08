export interface CommonResponse<T> {
  success: boolean
  response: T
  errorCode: number | null
  errorMessage: string | null
}

export interface Pagination<T> {
  totalPages: number
  totalElements: number
  size: number
  number: number
  content: T[]
  first: boolean
  last: boolean
  empty: boolean
}
export interface CommonResponseWithPagination<T> {
  success: boolean
  response: Pagination<T>
  errorCode: number | null
  errorMessage: string | null
}
