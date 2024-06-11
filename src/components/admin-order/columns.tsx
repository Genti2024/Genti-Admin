import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AdminOrder } from '@/types/admin-order'

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

export const adminOrderColumns: ColumnDef<AdminOrder>[] = [
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
  },
  { accessorKey: 'examplePic', header: '구도 참고 사진' },
  { accessorKey: 'userPic', header: '사용자 사진' },

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
    cell: () => <input value={''} />,
  },
  {
    id: 'uploadpic',
    header: '사진업로드',
    cell: () => (
      <Button variant="outline" size="default" onClick={() => {}}>
        업로드
      </Button>
    ),
  },
  {
    id: 'sendpic',
    header: '사진전송',
    cell: () => (
      <Button variant="default" size="default" onClick={() => {}}>
        전송
      </Button>
    ),
  },
]
