type Status = 'DONE' | 'NOT STARTED'
export type CacheOut = {
  id: string
  producerEmail: string
  account: string
  bankName: string
  accountHolder: string
  cacheAmount: number
  producedNum: number
  cacheOutStatus: Status
}
