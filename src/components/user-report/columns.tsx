import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown, FileImage } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ReportStatus, UserReport } from '@/types/user-report'
import { CommonPicture } from '@/types/admin-order'

interface UserReportColumnsProps {
  handleReportStatus: (id: string, status: ReportStatus) => void
}
export const getReportColumns = ({ handleReportStatus }: UserReportColumnsProps): ColumnDef<UserReport>[] => [
  {
    accessorKey: 'createdAt',
    header: 'Report 일시',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      const formatted = new Date(date).toISOString().slice(0, 19).replace('T', ' ')
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'reporterEmail',
    header: '사용자 ID',
  },
  { accessorKey: 'creatorEmail', header: '공급자 ID' },
  {
    accessorKey: 'pictureCompleted',
    header: '사용자에게 전달된 사진',
    cell: ({ row }) => {
      const pictureFromServer = (row.getValue('pictureCompleted') as CommonPicture) ?? ''
      const url = pictureFromServer.url
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
      const status = row.getValue('reportStatus') as ReportStatus
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Badge variant={status === 'RESOLVED' ? 'outline' : 'destructive'}>
                {status === 'RESOLVED' ? '해결 완료' : '해결 전'}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                handleReportStatus(String(row.original.reportId), 'RESOLVED')
              }}
            >
              해결완료
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleReportStatus(String(row.original.reportId), 'NOT_RESOLVED')
              }}
            >
              해결 전
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    filterFn: 'equalsString',
  },
]
