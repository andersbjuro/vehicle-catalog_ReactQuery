"use client"

import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "@/components/datatable/data-table-view-options"
import CopyFromButton from "./copy-from-button"

interface CopyFromToolbarProps<TData> {
  table: Table<TData>
}

export function CopyFromToolbar<TData>({
  table,
}: CopyFromToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DataTableViewOptions table={table} />
        <CopyFromButton callbackAction={() => table.resetRowSelection()} rowIds={table.getSelectedRowModel().flatRows.map(i => i.original)} />
      </div>
    </div>
  )
}
