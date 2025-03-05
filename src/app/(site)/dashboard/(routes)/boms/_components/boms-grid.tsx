"use client"

import { Bom,  } from "@/types";
import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./bom-columns";

interface Props {
  boms: Bom[] | undefined
}

export function BomsGrid({ boms }: Props) {

  const table = useReactTable({
    data: boms || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex w-full p-2">
      <DataTable columns={columns} table={table} />
    </div>
  )
}
