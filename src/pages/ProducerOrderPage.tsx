import { producerOrderColumns } from '@/components/producer-order/columns'
import { DataTable } from '@/components/producer-order/data-table'
import { producerOrder } from '@/lib/mocks/producer-order'

const ProducerOrderPage = () => {
  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-5 text-2xl font-semibold">Producer Order</h1>
      <DataTable columns={producerOrderColumns} data={producerOrder} />
    </div>
  )
}

export default ProducerOrderPage
