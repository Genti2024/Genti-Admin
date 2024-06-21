import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Preset } from '@/types/preset'

export const presetUploadColumns: ColumnDef<Preset>[] = [
  { accessorKey: 'id', header: '번호', minSize: 50, maxSize: 200, size: 100 },
  { accessorKey: 'picture', header: '사진', minSize: 50, maxSize: 200, size: 100 },
  { accessorKey: 'order', header: '주문', minSize: 50, maxSize: 200, size: 100 },
  {
    id: 'editOrder',
    header: '수정하기',
    cell: () => (
      <Button variant="default" size="default" onClick={() => {}}>
        수정
      </Button>
    ),
  },
]
