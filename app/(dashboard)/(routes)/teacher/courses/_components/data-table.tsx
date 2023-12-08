"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface dataTableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
}


export function DataTable<TData, TValue>({ data, columns }: dataTableProps<TData, TValue>) {
  
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state : {
      sorting,
      columnFilters
    }
  })
  return (
    <div>
      <div className=" flex items-center py-4 justify-between">
        <Input 
          className="max-w-sm"
          placeholder="Filter Courses"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event)=>{
            (table.getColumn("title")?.setFilterValue(event.target.value))
          }
        }
        />
        <Link href={"/teacher/create"}>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New course
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          {
            table.getHeaderGroups().map((headerGroup)=>{
              return (
                <TableRow key={headerGroup.id}>
                  {
                    headerGroup.headers.map((header)=>{
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ? null : 
                            flexRender(header.column.columnDef.header, header.getContext())
                          }
                        </TableHead>
                      )
                    })
                  }
                </TableRow>
              )
            })
          }
        </TableHeader>
        <TableBody>
          {
            table.getRowModel().rows.length ? 
            table.getRowModel().rows.map((row)=>{
              return (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {
                    row.getVisibleCells().map((cell)=>{
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })
                  }
                </TableRow>
              )
            })
            :

            <TableCell colSpan={columns.length} className=" text-center h-24">
              No results
            </TableCell>
          }
        </TableBody>
      </Table>
      <div className="flex justify-end items-center space-x-2 py-4">
          <Button variant="outline" size="sm" disabled={!table.getCanPreviousPage()} onClick={()=>table.previousPage()}>
            Previous 
          </Button>
          <Button variant="outline" size="sm" disabled={!table.getCanNextPage()} onClick={()=>table.nextPage()}>
            Next
          </Button>
      </div>

    </div>
  )
}

export default DataTable
