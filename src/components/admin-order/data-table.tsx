import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ListFilter, Pencil } from 'lucide-react'
import { useRef, useState } from 'react'

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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useFiles } from '@/util/useFiles'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
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

  const handleStatusFilter = (value: string) => {
    table.getColumn('orderStatus')?.setFilterValue(value)
  }

  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn('userEmail')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('userEmail')?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <ListFilter className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleStatusFilter('')}>모두</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter('DONE')}>작업대기</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter('ONGOING')}>작업 중</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter('NOT STARTED')}>작업완료</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" />
              담당자 수정
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>담당자 수정 및 입력</DialogTitle>
              <DialogDescription>
                {table.getFilteredSelectedRowModel().rows.length} 개의 행이 선택되었습니다.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="name" className="text-right">
                  이름
                </Label>
                <Input id="name" defaultValue="익명의 담당자" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
