"use client"

import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "@/components/datatable/data-table-view-options"
import CreateCataloSearchButton from "./create-catalog-search-button"

interface NewItemToolbarProps<TData> {
  table: Table<TData>
}

export function NewItemToolbar<TData>({
  table,
}: NewItemToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DataTableViewOptions table={table} />
        <CreateCataloSearchButton callbackAction={() => table.resetRowSelection()} rowIds={table.getSelectedRowModel().flatRows.map(i => i.original)} />
      </div>
    </div>
  )
}
