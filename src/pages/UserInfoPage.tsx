import { ListFilter } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { useGetUserInfoList, usePostUserRole, usePostUserStatus } from '@/api/hooks/user-info'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getUserColumns } from '@/components/user-info/columns'
import { DataTable } from '@/components/user-info/data-table'
import { UserRole, UserStatus } from '@/types/user-info'
import { useFilter } from '@/util/useFilter'

const UserInfoPage = () => {
  const [email, setEmail] = useState('')
  const { searchParam, handlePage, handleEmailFilter, handleRoleFilter } = useFilter()
  const { data: userInfoList, isFetching } = useGetUserInfoList(searchParam)
  const { mutate: setUserRole } = usePostUserRole()
  const { mutate: setUserStatus } = usePostUserStatus()

  const handleUserStatus = useCallback(
    (userId: string, status: UserStatus) => {
      setUserStatus({ userId, status })
    },
    [setUserStatus],
  )
  const handleUserRole = useCallback(
    (userId: string, role: UserRole) => {
      setUserRole({ userId, role })
    },
    [setUserRole],
  )
  const columns = useMemo(
    () => getUserColumns({ handleUserStatus, handleUserRole }),
    [handleUserRole, handleUserStatus],
  )

  const processedData = useMemo(
    () =>
      userInfoList?.content.map(item => ({
        ...item,
      })),
    [userInfoList],
  )
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
            <DropdownMenuItem onClick={() => handleRoleFilter('ALL')}>모두</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleFilter('CREATOR')}>공급자</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleFilter('USER')}>사용자</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isFetching ? (
        <Table>
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
        </Table>
      ) : (
        <DataTable
          columns={columns}
          data={processedData ?? []}
          handlePage={handlePage}
          first={userInfoList?.first ?? true}
          last={userInfoList?.last ?? true}
          currentPage={userInfoList?.number ?? 0}
        />
      )}
    </div>
  )
}

export default UserInfoPage
