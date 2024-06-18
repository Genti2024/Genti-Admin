import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CacheOut } from '@/types/cache-out'
// id: '',
//     producerEmail: 'produce@naver.com',
//     account: '3010101010101',
//     bankName: '농협',
//     accountHolder: '홍길동',
//     cacheAmount: 30000,
//     producedNum: 4,
//     cacheOutStatus: 'NOT STARTED',
export const cacheOutColumns: ColumnDef<CacheOut>[] = [
  {
    accessorKey: 'producerEmail',
    header: '공급자 email',
  },
  {
    accessorKey: 'account',
    header: '계좌번호',
  },
  {
    accessorKey: 'bankName',
    header: '은행명',
  },
  { accessorKey: 'accountHolder', header: '예금주명' },
  { accessorKey: 'cacheAmount', header: '캐시아웃 신청금액' },
  { accessorKey: 'producedNum', header: '공급횟수' },
  {
    accessorKey: 'cacheOutStatus',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('cacheOutStatus') as 'DONE' | 'NOT STARTED'
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Badge variant={status === 'DONE' ? 'outline' : 'destructive'}>
                {status === 'DONE' ? '송금완료' : '송금전'}

                <ChevronDown className="w-4 h-4 ml-2" />
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>송금완료</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>송금전</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    filterFn: 'equalsString',
  },
]
