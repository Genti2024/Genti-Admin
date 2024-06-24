import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown, Download } from 'lucide-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AdminOrder } from '@/types/admin-order'
import { downloadFile } from '@/util/download'

/*
id: '',
    orderedAt: '',
    orderNum: 'A1',
    userEmail: 'test@naver.com',
    userGender: 'M',
    content: '주문 내용입니다',
    prompt: '추천 프롬프트입니다',
    examplePic: 'examplePicLink',
    userPic: ['userPic1', 'userPic2', 'userPic3'],
    status: 'ONGOING',
    assigned: '담당자입니다.',
    uploadedpic: 'uploadedPic',
    */

export const adminOrderColumns = (): ColumnDef<AdminOrder>[] => [
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
    // cell: ({ row }) => {
    //   const date = row.getValue('reportAt') as Date
    //   const formatted = new Intl.DateTimeFormat('ko-KR').format(date)
    //   return <div>{formatted}</div>
    // },
  },
  {
    accessorKey: 'orderNum',
    header: '주문넘버',
  },
  { accessorKey: 'userEmail', header: 'email' },
  { accessorKey: 'userGender', header: '성별' },
  { accessorKey: 'content', header: '주문 내용' },
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
  { accessorKey: 'examplePic', header: '구도 참고 사진' },
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
