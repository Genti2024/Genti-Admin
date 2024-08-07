import { useGetUserReport } from '@/api/hooks/user-report'
import { userReportColumns } from '@/components/user-report/columns'
import { DataTable } from '@/components/user-report/data-table'
import { userReport } from '@/lib/mocks/user-report'
import { useFilter } from '@/util/useFilter'

const UserReportPage = () => {
  const { searchParam, handlePage, handleEmailFilter, handleStatusFilter } = useFilter()
  const { data: userReportList, isFetching } = useGetUserReport(searchParam)
  console.log(userReportList)

  return (
    <div className="px-20 py-10 mx-auto min-[2000px]:max-w-[85%]">
      <h1 className="mb-5 text-2xl font-semibold">User Info</h1>
      <DataTable columns={userReportColumns} data={userReport} />
    </div>
  )
}

export default UserReportPage
