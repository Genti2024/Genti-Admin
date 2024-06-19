type Gender = 'M' | 'F'
type Status = 'DONE' | 'ONGOING' | 'NOT STARTED'
export type AdminOrder = {
  id: string
  orderedAt: string
  orderNum: string
  userEmail: string
  userGender: Gender
  content: string
  prompt: string
  examplePic: string
  userPic: string[]
  status: Status
  assigned: string
  uploadedpic: string
}
