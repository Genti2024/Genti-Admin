import { ListFilter } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { useGetUserReport, usePostReportStatus } from '@/api/hooks/user-report'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getReportColumns } from '@/components/user-report/columns'
import { DataTable } from '@/components/user-report/data-table'
import { ReportStatus } from '@/types/user-report'
import { useFilter } from '@/util/useFilter'

const UserReportPage = () => {
  const [email, setEmail] = useState('')
  const { searchParam, handlePage, handleEmailFilter, handleReportStatusFilter } = useFilter()
  const { data: userReportList, isFetching } = useGetUserReport(searchParam)
  const { mutate: setReportStatus } = usePostReportStatus()
  console.log('userReportList', userReportList)

  const handleReportStatus = useCallback(
    (reportId: string, status: ReportStatus) => {
      setReportStatus({ reportId, status })
      console.log(reportId, status)
    },
    [setReportStatus],
  )

  const columns = useMemo(() => getReportColumns({ handleReportStatus }), [handleReportStatus])

  const processedData = useMemo(
    () =>
      userReportList?.content.map(item => ({
        ...item,
      })),
    [userReportList],
  )
  if (isFetching)
    return (
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            {Array.from({ length: 11 }).map((_, index) => (
              <TableCell key={index} className="h-10 text-center">
                <Skeleton className="h-5 w-15" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    )

  return (
    <div className="px-20 py-10 mx-auto min-[2000px]:max-w-[85%]">
      <h1 className="mb-5 text-2xl font-semibold">User Info</h1>
      <div className="flex flex-row items-center gap-4">
        <div className="flex items-center py-4">
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Filter emails..."
            className="max-w-sm"
            onKeyDown={e => e.key === 'Enter' && handleEmailFilter(email)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <ListFilter className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleReportStatusFilter('ALL')}>모두</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleReportStatusFilter('NOT_RESOLVED')}>해결 전</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleReportStatusFilter('RESOLVED')}>해결완료</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DataTable
        columns={columns}
        data={processedData ?? []}
        handlePage={handlePage}
        first={userReportList?.first ?? true}
        last={userReportList?.last ?? true}
        currentPage={userReportList?.number ?? 0}
      />
    </div>
  )
  // return (
  //   <div className="px-20 py-10 mx-auto min-[2000px]:max-w-[85%]">
  //     <h1 className="mb-5 text-2xl font-semibold">User Info</h1>
  //     <DataTable columns={userReportColumns} data={userReport} />
  //   </div>
  // )
}

export default UserReportPage
