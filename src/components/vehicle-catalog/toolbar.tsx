"use client"

import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "../datatable/data-table-view-options"
import RemoveFromCatalogButton from "./remove-from-catalog-button"
import useVehicleStore from "@/hooks/use-vehicle-store"
import FilterSelect from "../filter-select"
import useCatalogStore from "@/hooks/use-catalog-store"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {

  const { searchValue, setSearchValue } = useCatalogStore();
  const { vehicle, selectedNode, setSelectedNode } = useVehicleStore();

  const options = vehicle?.eceTree?.treeList.map((node: any) => ({
    name: node.nodeName,
    id: node.nodeId.toString()
  }
  ))

  const rowIds = table?.getSelectedRowModel()?.flatRows?.map(i => i.original) || []

  const handleValueChange = (id: string) => {
    setSelectedNode(id)
    setSearchValue({ searchValue: id, valueType: searchValue.valueType, countryCode: searchValue.countryCode })
  }

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <FilterSelect placeholder="noder" options={options} value={selectedNode || ""} onChange={(id) => { handleValueChange(id) }} defaultValue={selectedNode} />
      <DataTableViewOptions table={table} />
      <RemoveFromCatalogButton callbackAction={() => table.resetRowSelection()} rowIds={rowIds} />
    </div>
  )
}
