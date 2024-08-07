import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown, Download } from 'lucide-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ProducerOrder } from '@/types/producer-order'
import { downloadFile } from '@/util/download'
export const producerOrderColumns: ColumnDef<ProducerOrder>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'orderedAt',
    header: '주문 일시',
    cell: ({ row }) => {
      const date = row.getValue('orderedAt') as Date
      const formatted = new Date(date).toISOString().slice(0, 19).replace('T', ' ')
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'orderNum',
    header: '주문넘버',
  },
  {
    accessorKey: 'sendedAt',
    header: '전달일시',
    cell: ({ row }) => {
      const date = row.getValue('sendedAt') as Date
      const formatted = new Date(date).toISOString().slice(0, 19).replace('T', ' ')
      return <div>{formatted}</div>
    },
  },
  { accessorKey: 'userEmail', header: 'email' },
  { accessorKey: 'userGender', header: '성별' },
  { accessorKey: 'producerEmail', header: '공급자email' },
  { accessorKey: 'producerPic', header: '공급자제작사진' },
  {
    accessorKey: 'prompt',
    header: '추천 프롬프트',
    cell: ({ row }) => {
      const prompt = row.getValue('prompt') as string
      return (
        <CopyToClipboard
          text={prompt}
          onCopy={() => {
            toast('프롬프트 복사가 완료 되었습니다.', {
              description: prompt.length > 20 ? prompt.slice(0, 20) + '...' : prompt,
            })
          }}
        >
          <p className="truncate cursor-pointer w-[150px] h-[20px]">{prompt}</p>
        </CopyToClipboard>
      )
    },
  },
  {
    accessorKey: 'userPic',
    header: '사용자 사진',
    cell: ({ row }) => {
      const userPic = row.getValue('userPic') as string[]
      const handlePicDownload = () => {
        userPic.map((pic, index) => {
          downloadFile(pic, `userPic${index}`)
        })
      }
      return (
        <Button variant="outline" size="default" onClick={handlePicDownload}>
          <Download className="w-4 h-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: 'orderStatus',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('orderStatus') as 'DONE' | 'ONGOING' | 'NOT STARTED'
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Badge variant={status === 'DONE' ? 'outline' : status === 'ONGOING' ? 'secondary' : 'destructive'}>
                {status === 'DONE' ? '작업완료' : status === 'ONGOING' ? '작업 중' : '작업대기'}

                <ChevronDown className="w-4 h-4 ml-2" />
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>작업완료</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>작업 중</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>작업대기</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    filterFn: 'equalsString',
  },
  {
    accessorKey: 'assigned',
    header: '담당자',
  },
  {
    id: 'uploadPic',
    header: '사진업로드',
  },
  { id: 'checkPic', header: '사진확인' },
  {
    id: 'sendPic',
    header: '사진전송',
  },
]
