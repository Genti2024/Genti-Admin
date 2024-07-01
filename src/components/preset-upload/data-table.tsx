import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useCallback, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const files = useRef<null | HTMLInputElement>()
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      size: 50, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 200, //enforced during column resizing
    },
  })

  return (
    <div>
      <div className="flex flex-row items-center gap-4 py-2">
        <div className="flex items-center border rounded-md w-full p-2">
          <Input placeholder="주문을 입력하세요..." defaultValue="" className="mr-4" />
          <Button variant="outline" size="default" className="mr-4" onClick={() => files.current?.click()}>
            사진 업로드
          </Button>
          <Input
            type="file"
            className="hidden"
            ref={el => (files.current = el)}
            accept="image/*"
            onChange={e => handleFileChange(e)}
          />
          <Button variant="outline" className="mr-4" disabled={btnDisabled} onClick={() => window.open(``)}>
            사진 확인
          </Button>
          <Button type="submit">저장</Button>
        </div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => {
                    if (cell.column.columnDef.id === 'editOrder') {
                      return (
                        <TableCell key={cell.id}>
                          <Button variant="default" size="default" onClick={() => console.log('수정')}>
                            수정
                          </Button>
                        </TableCell>
                      )
                    }
                    return (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
