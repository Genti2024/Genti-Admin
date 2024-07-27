import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { memo, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AdminOrder } from '@/types/admin-order'
import { useFiles } from '@/util/useFiles'

interface DataTableProps<TData> {
  columns: ColumnDef<AdminOrder>[]
  data: TData[]
  handlePage: (value: number) => void
  currentPage: number
  first: boolean
  last: boolean
}

export const DataTable = memo(({ columns, data, handlePage, first, last, currentPage }: DataTableProps<AdminOrder>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const filesRef = useRef<(null | HTMLInputElement)[]>([])
  const { handleFileUpload, handleFileInput, handleFileChange, currentFiles, preview, btnDisabled, handleFileDelete } =
    useFiles(filesRef, data.length)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div>
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
                    if (cell.column.columnDef.id === 'uploadPic') {
                      return (
                        <TableCell key={cell.id}>
                          <div>
                            <Button variant="outline" size="default" onClick={() => handleFileInput(cell.row.index)}>
                              업로드
                            </Button>
                            <Input
                              type="file"
                              className="hidden"
                              ref={el => (currentFiles[cell.row.index] = el as HTMLInputElement)}
                              accept="image/*"
                              onChange={e => handleFileChange(e, cell.row.index)}
                            />
                          </div>
                        </TableCell>
                      )
                    }
                    if (cell.column.columnDef.id === 'checkPic') {
                      return (
                        <TableCell key={cell.id}>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                disabled={btnDisabled[cell.row.index]}
                                onClick={() => handleFileUpload(cell.row.index)}
                              >
                                사진 확인
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle className="mb-5">사진 확인</DialogTitle>
                                <DialogDescription>
                                  {preview[cell.row.index] === '' ? (
                                    <div className="flex items-center justify-center w-full bg-gray-100 rounded-md h-96">
                                      <p>이미지가 없습니다.</p>
                                    </div>
                                  ) : (
                                    <img
                                      src={preview[cell.row.index]}
                                      alt="preview"
                                      className="object-cover w-full rounded-md h-96"
                                    />
                                  )}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4"></div>
                              <DialogFooter>
                                <Button type="submit" onClick={() => handleFileDelete(cell.row.index)}>
                                  삭제하기
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      )
                    }
                    if (cell.column.columnDef.id === 'sendPic') {
                      return (
                        <TableCell key={cell.id}>
                          <Button onClick={() => console.log(preview)}>전송</Button>
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
        <Button variant="outline" size="sm" onClick={() => handlePage(currentPage - 1)} disabled={first}>
          Previous
        </Button>
        <span className="flex items-center justify-center p-1">{currentPage + 1}</span>
        <Button variant="outline" size="sm" onClick={() => handlePage(currentPage + 1)} disabled={last}>
          Next
        </Button>
      </div>
    </div>
  )
})
