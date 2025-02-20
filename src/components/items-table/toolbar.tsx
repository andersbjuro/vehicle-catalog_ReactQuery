"use client"

import { Table } from "@tanstack/react-table"
import ItemsFilterBar from "@/components/items-table/items-filter-bar"
import AddToBomDialog from "./add-to-bom-dialog"
import { DataTableViewOptions } from "../datatable/data-table-view-options"
import AddToCatalogButton from "./add-to-catalog-button"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  type: "bom" | "catalog" | "vehiclecatalog"
}

export function DataTableToolbar<TData>({
  table,
  type
}: DataTableToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between gap-2">
      <ItemsFilterBar />
      <DataTableViewOptions table={table} />
    {type === "bom" ? (
      <AddToBomDialog callbackAction={() => table.resetRowSelection()} rowIds={table.getSelectedRowModel().flatRows.map(i => i.original)} />
    ) : (
      <AddToCatalogButton callbackAction={() => table.resetRowSelection()} rowIds={table.getSelectedRowModel().flatRows.map(i => i.original)} />
    )}
    </div>
  )
}
