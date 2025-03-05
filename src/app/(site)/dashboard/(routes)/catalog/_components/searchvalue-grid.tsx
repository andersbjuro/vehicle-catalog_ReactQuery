"use client"

import { SearchValue } from "@/types";
import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./searchvalue-columns";

interface Props {
  serachValues: SearchValue[] | undefined
}

export function SearchValueGrid({ serachValues }: Props) {

  const table = useReactTable({
    data: serachValues || [],
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
