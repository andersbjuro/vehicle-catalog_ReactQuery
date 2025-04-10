"use client"

import { FlattOeItem,  } from "@/types";
import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./items-columns";

interface Props {
  items: FlattOeItem[] | undefined
}

export function ItemsGrid({ items }: Props) {

  const table = useReactTable({
    data: items || [],
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
