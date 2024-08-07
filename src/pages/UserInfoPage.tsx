import { useMemo } from 'react'

import { useGetUserInfoList } from '@/api/hooks/user-info'
import { getUserColumns } from '@/components/user-info/columns'
import { DataTable } from '@/components/user-info/data-table'
import { userInfo } from '@/lib/mocks/user-info'
// import {  UserStatus } from '@/types/user-info'

const UserInfoPage = () => {
  const { data: userInfoList, isFetching } = useGetUserInfoList()

  console.log(userInfoList?.response)
  // const { mutate: mutateUserStatus } = usePostUserStatus()

  // const handleUserStatus = useCallback(
  //   (id: string, status: UserStatus) => {
  //     mutateUserStatus({ id, status })
  //   },
  //   [mutateUserStatus],
  // )
  // const handleUserRole = useCallback((id: string, userRole: UserRole) => {
  //   console.log(id, userRole)
  // }, [])

  const columns = useMemo(() => getUserColumns(), [])

  return (
    <div className="px-20 py-10 mx-auto min-[2000px]:max-w-[85%]">
      <h1 className="mb-5 text-2xl font-semibold">User Info</h1>
      <DataTable columns={columns} data={userInfo} isFetching={isFetching} />
    </div>
  )
}

export default UserInfoPage
