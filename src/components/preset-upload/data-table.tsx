import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useCallback, useRef, useState } from 'react'

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
import { useFiles } from '@/util/useFiles'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const filesRef = useRef<(null | HTMLInputElement)[]>([])
  const { handleFileUpload, handleFileInput, handleFileChange, currentFiles, preview, btnDisabled, handleFileDelete } =
    useFiles(filesRef, data.length)

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
        <div className="flex items-center w-full gap-4 p-2 border rounded-md">
          <Input placeholder="주문을 입력하세요..." defaultValue="" />
          <Button variant="outline" size="default" onClick={() => handleFileInput(0)}>
            사진 업로드
          </Button>
          <Input
            type="file"
            className="hidden"
            ref={el => (currentFiles[0] = el as HTMLInputElement)}
            accept="image/*"
            onChange={e => handleFileChange(e, 0)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={btnDisabled[0]} onClick={() => handleFileUpload(0)}>
                사진 확인
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="mb-5">사진 확인</DialogTitle>
                <DialogDescription>
                  {preview[0] === '' ? (
                    <div className="flex items-center justify-center w-full bg-gray-100 rounded-md h-96">
                      <p>이미지가 없습니다.</p>
                    </div>
                  ) : (
                    <img src={preview[0]} alt="preview" className="object-cover w-full rounded-md h-96" />
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4"></div>
              <DialogFooter>
                <Button type="submit" onClick={() => handleFileDelete(0)}>
                  삭제하기
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
