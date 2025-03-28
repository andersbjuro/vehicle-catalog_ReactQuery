"use client"

import { Bom } from "@/types";
import { getCoreRowModel, getSortedRowModel, useReactTable, TableMeta } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable/data-table";
import { ColumnDef } from "@tanstack/react-table"
import { SortableHeader } from "@/components/datatable/sortable-header";
import Link from "next/link";
import { routes } from "@/config/routes";
import { useMemo } from "react";
import {translation} from "@/config/translation";

interface Props {
  boms: Bom[] | undefined
}

export function BomsGrid({ boms }: Props) {

  const columns = useMemo<ColumnDef<Bom>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => <SortableHeader column={column} title="id" className="font-medium w-[80px]" translation={translation.bomGrid} />,
        cell: ({ row }) => (
          <div className="ml-3 font-medium w-[80px]">
            <Link href={routes.editBom(row.original.id)}><span className="underline">{row.original.id}</span></Link>
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => <SortableHeader column={column} title="name" className="w-[350px]" translation={translation.bomGrid} />,
        cell: ({ row }) => (
          <div className="ml-3 w-[350px]">
            {row.original.name}
          </div>
        ),
      },
      {
        accessorKey: "brand",
        header: ({ column }) => <SortableHeader column={column} title="brand" translation={translation.bomGrid} />,
        cell: ({ row }) => (
          <div className="ml-3">
            {row.original.brand.name}
          </div>
        ),
      },
      {
        accessorKey: "productGroup",
        header: ({ column }) => <SortableHeader column={column} title="productGroup" translation={translation.bomGrid} />,
        cell: ({ row }) => (
          <div className="ml-3">
            {row.original.productGroup.name}
          </div>
        ),
      },
      {
        accessorKey: "noOfItems",
        header: ({ column }) => <SortableHeader column={column} title="noOfItems" translation={translation.bomGrid} />,
        cell: ({ row }) => (
          <div className="ml-3">
            {row.original.noOfItems}
          </div>
        ),
      },
    ], []);


  const table = useReactTable<Bom>({
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
