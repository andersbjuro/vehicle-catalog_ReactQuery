"use client"

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, Table as ReactTable } from "@tanstack/react-table";
import TableHeader from "@/components/datatable/table-header";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: ReactTable<any>
}

export function DataTable<TData, TValue>({ columns, table }: DataTableProps<TData, TValue>) {
  return (
    <div className="rounded-md border w-full">
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
  );
}
