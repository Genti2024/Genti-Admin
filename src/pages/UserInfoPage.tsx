import { useCallback, useMemo } from 'react'

import { useGetUserInfoList, usePostUserStatus } from '@/api/hooks/user-info'
import { getUserColumns } from '@/components/user-info/columns'
import { DataTable } from '@/components/user-info/data-table'
// import { userInfo } from '@/lib/mocks/user-info'
import { UserRole, UserStatus } from '@/types/user-info'

const UserInfoPage = () => {
  const { data: userInfoList, isFetching } = useGetUserInfoList()
  console.log(userInfoList?.content)
  const { mutate: mutateUserStatus } = usePostUserStatus()

  const handleUserStatus = useCallback(
    (id: string, status: UserStatus) => {
      mutateUserStatus({ id, status })
      console.log(id, status)
    },
    [mutateUserStatus],
  )
  const handleUserRole = useCallback(
    (id: string, userRole: UserRole) => {
      mutateUserRole({ id, userRole })
      console.log(id, userRole)
    },
    [mutateUserRole],
  )

  const columns = useMemo(
    () => getUserColumns({ handleUserStatus, handleUserRole: handleUserRole }),
    [handleUserRole, handleUserStatus],
  )

  return (
    <div className="px-20 py-10 mx-auto min-[2000px]:max-w-[85%]">
      <h1 className="mb-5 text-2xl font-semibold">User Info</h1>
      <DataTable columns={columns} data={userInfoList?.content ?? []} isFetching={isFetching} />
    </div>
  )
}

export default UserInfoPage
function mutateUserRole(arg0: { id: string; userRole: UserRole }) {
  throw new Error('Function not implemented.')
}
