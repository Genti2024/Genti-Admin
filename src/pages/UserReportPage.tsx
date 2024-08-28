import { ListFilter } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { useGetUserReport, usePostReportStatus } from '@/api/hooks/user-report'
import Suspense from '@/components/Suspense'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { getReportColumns } from '@/components/user-report/columns'
import { DataTable } from '@/components/user-report/data-table'
import { ReportStatus } from '@/types/user-report'
import { useFilter } from '@/util/useFilter'

const UserReportPage = () => {
  const [email, setEmail] = useState('')
  const { searchParam, handlePage, handleEmailFilter, handleReportStatusFilter } = useFilter()
  const { data: userReportList, isFetching } = useGetUserReport(searchParam)
  const { mutate: setReportStatus } = usePostReportStatus()

  const handleReportStatus = useCallback(
    (reportId: number, status: ReportStatus) => setReportStatus({ reportId, status }),
    [setReportStatus],
  )

  const columns = useMemo(() => getReportColumns({ handleReportStatus }), [handleReportStatus])

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleEmailFilter(email)
    },
    [email, handleEmailFilter],
  )

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [setEmail])

  return (
    <div className="px-20 py-10 mx-auto min-[2000px]:max-w-[85%]">
      <h1 className="mb-5 text-2xl font-semibold">User Info</h1>
      <div className="flex flex-row items-center gap-4">
        <form className="flex items-center py-4" onSubmit={handleSubmit}>
          <Input value={email} onChange={handleChange} placeholder="Filter emails..." className="max-w-sm" />
        </form>
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
      <Suspense isFetching={isFetching}>
        <DataTable
          columns={columns}
          data={userReportList?.content ?? []}
          handlePage={handlePage}
          first={userReportList?.first ?? true}
          last={userReportList?.last ?? true}
          currentPage={userReportList?.number ?? 0}
        />
      </Suspense>
    </div>
  )
}

export default UserReportPage
