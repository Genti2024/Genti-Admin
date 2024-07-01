import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Preset } from '@/types/preset'

export const presetUploadColumns: ColumnDef<Preset>[] = [
  { accessorKey: 'id', header: '번호', minSize: 50, maxSize: 200, size: 100 },
  {
    accessorKey: 'picture',
    header: '사진',
    cell: ({ row }) => {
      const userPic = row.getValue('picture') as string[]
      return (
        <Button variant="outline" onClick={() => window.open(`${userPic}`)}>
          사진 확인
        </Button>
      )
    },
  },

  { accessorKey: 'order', header: '주문', minSize: 50, maxSize: 200, size: 100 },
  {
    id: 'editOrder',
    header: '수정하기',
  },
]
