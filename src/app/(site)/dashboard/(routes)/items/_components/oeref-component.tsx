"use client"
import { DataTable } from "@/components/datatable/data-table"
import { columns } from "./oeref-lines-colums"
import { OeItem } from "@/types"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

interface OeRefComponentProps {
  item: OeItem
}

function OeRefComponent({item}: OeRefComponentProps) {

  const table = useReactTable({
      data: item.oeRefs,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

  return (
    <div>
      <DataTable table={table} columns={columns} />
    </div>
  )
}

export default OeRefComponent
