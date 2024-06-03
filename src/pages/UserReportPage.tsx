import { userReportColumns } from '@/components/user-report/columns'
import { DataTable } from '@/components/user-report/data-table'
import { userReport } from '@/lib/mocks/user-report'

const UserReportPage = () => {
  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-5 text-2xl font-semibold">User Info</h1>
      <DataTable columns={userReportColumns} data={userReport} />
    </div>
  )
}

export default UserReportPage
