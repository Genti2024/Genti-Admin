import { producerOrderColumns } from '@/components/producer-order/columns'
import { DataTable } from '@/components/producer-order/data-table'
import { producerOrder } from '@/lib/mocks/producer-order'

const ProducerOrderPage = () => {
  return (
    <div className="px-20 py-10 mx-auto min-[2000px]:max-w-[85%]">
      <h1 className="mb-5 text-2xl font-semibold">Producer Order</h1>
      <DataTable columns={producerOrderColumns} data={producerOrder} />
    </div>
  )
}

export default ProducerOrderPage
