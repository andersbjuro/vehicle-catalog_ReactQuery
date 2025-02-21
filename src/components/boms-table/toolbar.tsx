"use client"

import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "../datatable/data-table-view-options"
import AddToCatalogButton from "./add-to-catalog-button"
import BomsFilterBar from "./boms-filter-bar"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  type:  "catalog" | "vehiclecatalog"
}

export function DataTableToolbar<TData>({
  table,
  type
}: DataTableToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between gap-2">
      <BomsFilterBar />
      <DataTableViewOptions table={table} />
      <AddToCatalogButton callbackAction={() => table.resetRowSelection()} rowIds={table.getSelectedRowModel().flatRows.map(i => i.original)} />
    </div>
  )
}
