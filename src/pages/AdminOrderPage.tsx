import { adminOrderColumns } from '@/components/admin-order/columns'
import { DataTable } from '@/components/admin-order/data-table'
import { adminOrder } from '@/lib/mocks/admin-order'

const AdminOrderPage = () => {
  return (
    <div className="px-20 py-10 mx-auto min-[2000px]:max-w-[80%]">
      <h1 className="mb-5 text-2xl font-semibold">Admin Order</h1>
      <DataTable columns={adminOrderColumns} data={adminOrder} />
    </div>
  )
}

export default AdminOrderPage
