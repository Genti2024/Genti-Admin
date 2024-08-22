import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Status } from '@/types/admin-order'
import { UserRole } from '@/types/user-info'

export const useFilter = () => {
  const [searchParam, setSearchParam] = useSearchParams()

  const handlePage = useCallback(
    (value: number) => {
      searchParam.set('page', value.toString())
      setSearchParam(searchParam)
    },
    [searchParam, setSearchParam],
  )

  const handleEmailFilter = useCallback(
    (value: string) => {
      if (value === '') {
        searchParam.delete('email')
        setSearchParam(searchParam)
        return
      }
      searchParam.set('email', value)
      setSearchParam(searchParam)
    },
    [searchParam, setSearchParam],
  )

  const handleStatusFilter = useCallback(
    (value: Status) => {
      searchParam.set('status', value)
      setSearchParam(searchParam)
    },
    [searchParam, setSearchParam],
  )

  const handleRoleFilter = useCallback(
    (value: UserRole) => {
      searchParam.set('role', value)
      setSearchParam(searchParam)
    },
    [searchParam, setSearchParam],
  )

  return {
    handlePage,
    handleEmailFilter,
    handleStatusFilter,
    searchParam,
    setSearchParam,
    handleRoleFilter,
  }
}
