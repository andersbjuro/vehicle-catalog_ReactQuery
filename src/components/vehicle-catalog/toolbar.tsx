"use client"

import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "../datatable/data-table-view-options"
import RemoveFromCatalogButton from "./remove-from-catalog-button"
import useVehicleStore from "@/store/use-vehicle-store"
import FilterSelect from "../filter-select"
import useCatalogStore from "@/store/use-catalog-store"
import { useEffect, useState } from "react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [options, setOptions] = useState([]);
  const { searchValue, setSearchValue } = useCatalogStore();
  const { vehicle, selectedNode, setSelectedNode } = useVehicleStore();

  useEffect(() => {
    const opt = vehicle?.eceTree?.treeList.map((node: any) => ({
      name: node.nodeName,
      id: node.nodeId.toString()
    }))
    setOptions(opt)
  }, [vehicle])

  const handleSelectedNode = (id: string) => {
    setSelectedNode(id)
    setSearchValue({ searchValue: id, valueType: searchValue.valueType, countryCode: searchValue.countryCode })
  }

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <FilterSelect placeholder="" options={options} value={selectedNode || ""} onChange={(id) => { handleSelectedNode(id) }} defaultValue={selectedNode} />
      <DataTableViewOptions table={table} />
      <RemoveFromCatalogButton  callbackAction={() => table.resetRowSelection()} table={table} />
    </div>
  )
}
