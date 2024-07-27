import { ListFilter, Pencil } from 'lucide-react'
import { memo, useCallback, useMemo, useState } from 'react'

import { useGetAdminOrderList, usePostSetAdminInCharge } from '@/api/hooks/admin-order'
import { adminOrderColumns } from '@/components/admin-order/columns'
import { DataTable } from '@/components/admin-order/data-table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFilter } from '@/util/useFilter'
// import { adminOrder } from '@/lib/mocks/admin-order'
const AdminOrderPage = memo(() => {
  const [email, setEmail] = useState('')
  const [inCharge, setInCharge] = useState('')
  const [checked, setChecked] = useState<number[]>([])
  const { searchParam, handlePage, handleEmailFilter, handleStatusFilter } = useFilter()
  const { data: adminOrderList, isFetching } = useGetAdminOrderList(searchParam)

  const { mutate: setAdminInCharge } = usePostSetAdminInCharge()
  const processedData = useMemo(
    () =>
      adminOrderList?.content.map(item => ({
        ...item,
        prompt: `${item.prompt}\n 카메라 앵글: ${item.cameraAngle} \n 프레임: ${item.shotCoverage} \n 비율: ${item.facePictureList?.map(face => face.pictureRatio).join(', ')}`,
      })),
    [adminOrderList],
  )

  const handleCheckbox = useCallback(
    (id: number) => void setChecked(prev => (prev.includes(id) ? prev.filter(el => el === id) : [...prev, id])),
    [setChecked],
  )
  const columns = useMemo(() => adminOrderColumns(handleCheckbox), [handleCheckbox])
  const handleAdminInCharge = useCallback(() => {
    checked.forEach(id => setAdminInCharge({ adminInCharge: inCharge, pictureGenerateResponseId: id }))
  }, [checked, inCharge, setAdminInCharge])

  if (isFetching) return <div>Loading...</div>

  return (
    <div className="px-20 py-10 mx-auto min-[2000px]:max-w-[80%]">
      <h1 className="mb-5 text-2xl font-semibold">Admin Order</h1>
      <div className="flex flex-row items-center gap-4">
        <div className="flex items-center py-4">
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Filter emails..."
            className="max-w-sm"
            onKeyDown={e => e.key === 'Enter' && handleEmailFilter(email)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <ListFilter className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleStatusFilter('ALL')}>모두</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter('BEFORE_WORK')}>작업대기</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter('IN_PROGRESS')}>작업 중</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter('COMPLETED')}>작업완료</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" />
              담당자 수정
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>담당자 수정 및 입력</DialogTitle>
              <DialogDescription>{checked.length} 개의 행이 선택되었습니다.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="name" className="text-right">
                  이름
                </Label>
                <Input id="name" value={inCharge} onChange={e => setInCharge(e.target.value)} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => handleAdminInCharge()}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columns}
        data={processedData ?? []}
        handlePage={handlePage}
        first={adminOrderList?.first ?? true}
        last={adminOrderList?.last ?? true}
        currentPage={adminOrderList?.number ?? 0}
      />
    </div>
  )
})

export default AdminOrderPage
