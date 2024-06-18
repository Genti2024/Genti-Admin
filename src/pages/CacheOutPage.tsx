import { cacheOutColumns } from '@/components/cache-out/columns'
import { DataTable } from '@/components/cache-out/data-table'
import { cacheOut } from '@/lib/mocks/cache-out'
const CacheOutPage = () => {
  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-5 text-2xl font-semibold">Cache Out</h1>
      <DataTable columns={cacheOutColumns} data={cacheOut} />
    </div>
  )
}

export default CacheOutPage
