type Gender = 'M' | 'F'
type Status = 'DONE' | 'ONGOING' | 'NOT STARTED'
export type ProducerOrder = {
  id: string
  orderedAt: string
  orderNum: string
  sendedAt: string
  userEmail: string
  userGender: Gender
  producerEmail: string
  producerPic: string
  prompt: string
  userPic: string[]
  orderStatus: Status
  assigned: string
  uploadedpic: string | null
}
