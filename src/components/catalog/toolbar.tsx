"use client"

import { Table } from "@tanstack/react-table"
//import RemoveFromBomDialog from "@/components/bom-line-table/remove-from-bom-dialog"
import { DataTableViewOptions } from "../datatable/data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DataTableViewOptions table={table} />
        {/* <RemoveFromBomDialog callbackAction={() => table.resetRowSelection()} rowIds={table.getSelectedRowModel().flatRows.map(i => i.original)} /> */}
      </div>
    </div>
  )
}
