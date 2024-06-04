export interface CommonResponse<T> {
  success: boolean
  response: T
  errorCode: number | null
  errorMessage: string | null
}
