import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DepositResponseDto, UserInfo, UserRole, UserStatus } from '@/types/user-info'

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
            <Badge variant="secondary">{row.getValue('userRole')}</Badge>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleUserRole(row.original.id.toString(), 'CREATOR')}>
            공급자
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUserRole(row.original.id.toString(), 'USER')}>사용자</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    filterFn: 'equalsString',
  },
  { accessorKey: 'age', header: '나이' },
  { accessorKey: 'gender', header: '성별' },
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
                {status}
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
  {
    accessorKey: 'createdAt',
    header: '가입 일자',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      const formatted = new Date(date).toISOString().slice(0, 19).replace('T', ' ')
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'requestTaskCount',
    header: '누적 주문 회수',
    cell: ({ row }) => <div className="text-center">{row.getValue('requestTaskCount') ?? '-'}</div>,
  },
  {
    accessorKey: 'completedTaskCount',
    header: '누적 공급 횟수',
    cell: ({ row }) => <div className="text-center">{row.getValue('completedTaskCount') ?? '-'}</div>,
  },
  {
    accessorKey: 'depositResponseDto',
    header: '누적 획득 금액',
    cell: ({ row }) => {
      const DepositResponseDto = row.getValue('depositResponseDto') as DepositResponseDto | null
      const totalAmount = DepositResponseDto?.totalAmount
      const amount = parseFloat(totalAmount?.toString() ?? '-')
      const formatted = isNaN(amount)
        ? '-'
        : new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'currentAmount',
    header: '현재 보유 금액',
    cell: ({ row }) => {
      const DepositResponseDto = row.getValue('depositResponseDto') as DepositResponseDto | null
      const nowAmount = DepositResponseDto?.nowAmount
      const amount = parseFloat(nowAmount?.toString() ?? '-')
      const formatted = isNaN(amount)
        ? '-'
        : new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'lastLoginDate',
    header: '최근 접속',
    cell: ({ row }) => {
      const date = row.getValue('lastLoginDate') as Date
      const formatted = new Date(date).toISOString().slice(0, 19).replace('T', ' ')
      return <div>{formatted}</div>
    },
  },
]
