import { useMemo } from 'react'

import { useGetAdminOrderList } from '@/api/hooks/admin-order'
import { adminOrderColumns } from '@/components/admin-order/columns'
import { DataTable } from '@/components/admin-order/data-table'
// import { adminOrder } from '@/lib/mocks/admin-order'

const AdminOrderPage = () => {
  const { data: adminOrderList, isFetching } = useGetAdminOrderList()
  console.log(adminOrderList?.content)
  const processedData = useMemo(
    () =>
      adminOrderList?.content.map(item => ({
        ...item,
        prompt: `${item.prompt}\n 카메라 앵글: ${item.cameraAngle} \n 프레임: ${item.shotCoverage} \n 비율: ${item.facePictureList?.map(face => face.pictureRatio).join(', ')}`,
      })),
    [adminOrderList?.content],
  )
  const columns = useMemo(() => adminOrderColumns(), [])

  if (isFetching) return <div>Loading...</div>
  return (
    <div className="px-20 py-10 mx-auto min-[2000px]:max-w-[80%]">
      <h1 className="mb-5 text-2xl font-semibold">Admin Order</h1>
      <DataTable columns={columns} data={processedData ?? []} />
    </div>
  )
}

export default AdminOrderPage
