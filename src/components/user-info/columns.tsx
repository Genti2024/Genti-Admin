import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CreatorResponseDto, DepositResponseDto, UserInfo, UserRole, UserStatus } from '@/types/user-info'

interface UserInfoColumnsProps {
  handleUserStatus: (id: string, status: UserStatus) => void
  handleUserRole: (id: string, userRole: UserRole) => void
}
export const getUserColumns = ({
  handleUserRole: handleUserRole,
  handleUserStatus,
}: UserInfoColumnsProps): ColumnDef<UserInfo>[] => [
  { accessorKey: 'email', header: 'e-mail' },
  {
    accessorKey: 'userRole',
    header: '권한',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <Badge variant="secondary">{row.getValue('userRole') === '공급자' ? '공급자' : '사용자'}</Badge>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleUserRole(String(row.original.id), 'CREATOR')}>공급자</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUserRole(String(row.original.id), 'USER')}>사용자</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    filterFn: 'equalsString',
  },
  { accessorKey: 'age', header: '나이' },
  {
    accessorKey: 'sex',
    header: '성별',
  },
  {
    accessorKey: 'userStatus',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('userStatus') as UserStatus
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Badge variant={status === '활성' ? 'default' : 'outline'}>
                {status === '활성' ? '활성화' : '비활성화'}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleUserStatus(String(row.original.id), '활성')}>
              활성화
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUserStatus(String(row.original.id), '비활성')}>
              비활성화
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: '가입 일자',
  //   cell: ({ row }) => {
  //     const date = row.getValue('createdAt') as Date
  //     const formatted = new Date(date).toISOString().slice(0, 19).replace('T', ' ')
  //     return <div>{formatted}</div>
  //   },
  // },
  {
    accessorKey: 'requestTaskCount',
    header: '누적 주문 회수',
    cell: ({ row }) => <div className="text-center">{row.getValue('requestTaskCount') ?? '-'}</div>,
  },
  {
    accessorKey: 'creatorResponseDto',
    header: '누적 공급 횟수',
    cell: ({ row }) => {
      const creatorResponseDto = row.getValue('creatorResponseDto') as CreatorResponseDto | null
      const completedTaskCount = creatorResponseDto?.completedTaskCount
      return <div className="text-center">{completedTaskCount ?? '-'}</div>
    },
  },
  {
    accessorKey: 'depositResponseDto',
    header: '누적 획득 금액',
    cell: ({ row }) => {
      const DepositResponseDto = row.getValue('depositResponseDto') as DepositResponseDto | null
      const totalAmount = DepositResponseDto?.totalAmount
      // const amount = parseFloat(totalAmount)
      // const formatted = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount)
      return <div>{totalAmount ?? '-'}</div>
    },
  },
  {
    accessorKey: 'DepositResponseDto',
    header: '현재 보유 금액',
    cell: ({ row }) => {
      const DepositResponseDto = row.getValue('depositResponseDto') as DepositResponseDto | null
      const nowAmount = DepositResponseDto?.nowAmount

      // const amount = parseFloat(nowAmount)
      // const formatted = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount)
      return <div>{nowAmount ?? '-'}</div>
    },
  },
  {
    accessorKey: 'lastLoginDate',
    header: '최근 접속',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      const formatted = new Intl.DateTimeFormat('ko-KR').format(date)
      return <div>{formatted}</div>
    },
  },
]
