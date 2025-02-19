"use client"

import { Table } from "@tanstack/react-table"
import ItemsFilterBar from "@/components/items-table/items-filter-bar"
import AddToBomDialog from "./add-to-bom-dialog"
import { DataTableViewOptions } from "../datatable/data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  id: string
  countryCode: number,
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between gap-2">
      <ItemsFilterBar />
      <DataTableViewOptions table={table} />
      <AddToBomDialog callbackAction={() => table.resetRowSelection()} rowIds={table.getSelectedRowModel().flatRows.map(i => i.original)} />
    </div>
  )
}
