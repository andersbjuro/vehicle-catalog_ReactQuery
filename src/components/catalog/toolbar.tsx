"use client"

import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "../datatable/data-table-view-options"
import RemoveFromCatalogButton from "./remove-from-catalog-button"

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
        <RemoveFromCatalogButton callbackAction={() => table.resetRowSelection()} rowIds={table.getSelectedRowModel().flatRows.map(i => i.original)} />
      </div>
    </div>
  )
}
