import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Status } from '@/types/admin-order'

export const useFilter = () => {
  const [searchParam, setSearchParam] = useSearchParams()
  // useEffect(() => {
  //   searchParam.set('page', '0')
  //   searchParam.set('email', '')
  //   setSearchParam(searchParam)
  // }, [])

  const handlePage = useCallback(
    (value: number) => {
      searchParam.set('page', value.toString())
      setSearchParam(searchParam)
    },
    [searchParam, setSearchParam],
  )

  const handleEmailFilter = useCallback(
    (value: string) => {
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

  return {
    handlePage,
    handleEmailFilter,
    handleStatusFilter,
    searchParam,
    setSearchParam,
  }
}
