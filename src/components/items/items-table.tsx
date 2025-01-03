"use client"

import { ColumnDef, SortingState, VisibilityState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react";
import TableHeader from "@/components/datatable/table-header";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowSelectStateChange: (value: any) => void,
}

export function ItemsTable<TData, TValue>({
  columns,
  data,
  onRowSelectStateChange
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    //onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    //getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
      //sorting,
    },
  });

  // Row-select state change
  useEffect(() => {
    onRowSelectStateChange?.(table.getSelectedRowModel().flatRows.map(i => i.original))
  }, [
    onRowSelectStateChange,
    rowSelection,
  ]);

  return (
    <div className="flex flex-col">
      {/* <TableTabs /> */}
      <div className="rounded-md border relative">
        <Table>
          <TableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ItemsTable
