import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown, FileImage } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { UserReport } from '@/types/user-report'

export const userReportColumns: ColumnDef<UserReport>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Report 일시',
    // cell: ({ row }) => {
    //   const date = row.getValue('reportAt') as Date
    //   const formatted = new Intl.DateTimeFormat('ko-KR').format(date)
    //   return <div>{formatted}</div>
    // },
  },
  {
    accessorKey: 'reporterEmail',
    header: '사용자 ID',
  },
  { accessorKey: 'creatorEmail', header: '공급자 ID' },
  {
    accessorKey: 'picture',
    header: '사용자에게 전달된 사진',
    cell: ({ row }) => {
      const url = row.getValue('picture') as string
      return (
        <Button variant="outline" size="default" onClick={() => window.open(url)}>
          <FileImage className="w-4 h-4" />
        </Button>
      )
    },
  },
  { accessorKey: 'content', header: 'Report 내용' },
  {
    accessorKey: 'reportStatus',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('reportStatus') as 'RESOLVED' | 'NOT_RESOLVED'
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Badge variant={status === 'RESOLVED' ? 'outline' : 'destructive'}>
                {status === 'RESOLVED' ? '해결완료' : '해결 전'}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>해결완료</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>해결 전</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    filterFn: 'equalsString',
  },
]
