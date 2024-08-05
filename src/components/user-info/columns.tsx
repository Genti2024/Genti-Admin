import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { UserInfo, UserStatus } from '@/types/user-info'

// interface UserInfoColumnsProps {
//   handleUserStatus: (id: string, status: UserStatus) => void
//   handleUserRole: (id: string, userRole: UserRole) => void
// }
export const getUserColumns = (): ColumnDef<UserInfo>[] => [
  { accessorKey: 'email', header: 'e-mail' },
  {
    accessorKey: 'userRole',
    header: '권한',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <Badge variant="secondary">{row.getValue('userRole') === 'CREATOR' ? '공급자' : '사용자'}</Badge>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuItem onClick={() => handleUserRole(row.original.id, 'CREATOR')}>공급자</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUserRole(row.original.id, 'USER')}>사용자</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    filterFn: 'equalsString',
  },
  { accessorKey: 'age', header: '나이' },
  { accessorKey: 'gender', header: '성별' },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('status') as UserStatus
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Badge variant={status === 'ACTIVATED' ? 'default' : 'outline'}>
                {status === 'ACTIVATED' ? '활성화' : '비활성화'}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>활성화</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>비활성화</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: '가입 일자',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      const formatted = new Intl.DateTimeFormat('ko-KR').format(date)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'orderCount',
    header: '누적 주문 회수',
    cell: ({ row }) => <div className="text-center">{row.getValue('orderCount') ?? '-'}</div>,
  },
  {
    accessorKey: 'producedCount',
    header: '누적 공급 횟수',
    cell: ({ row }) => <div className="text-center">{row.getValue('producedCount') ?? '-'}</div>,
  },
  {
    accessorKey: 'accumulatedBalance',
    header: '누적 획득 금액',
    cell: ({ row }) => {
      if (row.getValue('accumulatedBalance') === null) return <div className="text-center">-</div>
      const amount = parseFloat(row.getValue('accumulatedBalance'))
      const formatted = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'currentBalance',
    header: '현재 보유 금액',
    cell: ({ row }) => {
      if (row.getValue('accumulatedBalance') === null) return <div className="text-center">-</div>
      const amount = parseFloat(row.getValue('currentBalance'))
      const formatted = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'recentConnection',
    header: '최근 접속',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      const formatted = new Intl.DateTimeFormat('ko-KR').format(date)
      return <div>{formatted}</div>
    },
  },
]
