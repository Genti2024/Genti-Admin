import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

interface SuspenseProps {
  isFetching: boolean
  children: React.ReactNode
}
const Suspense = ({ isFetching, children }: SuspenseProps) => {
  return isFetching ? (
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
    children
  )
}

export default Suspense
