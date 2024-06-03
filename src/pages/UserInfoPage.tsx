import { userColumns } from '@/components/user-info/columns'
import { DataTable } from '@/components/user-info/data-table'
import { userInfo } from '@/lib/mocks/user-info'

const UserInfoPage = () => {
  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-5 text-2xl font-semibold">User Info</h1>
      <DataTable columns={userColumns} data={userInfo} />
    </div>
  )
}

export default UserInfoPage
