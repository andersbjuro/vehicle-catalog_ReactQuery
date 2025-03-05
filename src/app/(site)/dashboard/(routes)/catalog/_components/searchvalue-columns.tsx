"use client"

import { SearchValue } from "@/types";
import { ColumnDef } from "@tanstack/react-table"
import {SortableHeader} from "@/components/datatable/sortable-header";
import Link from "next/link";

export const columns: ColumnDef<SearchValue>[] = [
  {
    accessorKey: "value",
    header: ({ column }) => <SortableHeader column={column} title="Sökvärde" className="font-medium w-[250px]" />,
    cell: ({ row }) => (
      <div className="ml-3 font-medium w-[250px]">
        <Link href={`/dashboard/catalog/${row.original.id}/edit`}><span className="underline">{row.original.value}</span></Link>
      </div>
    ),
  },
  {
    accessorKey: "valueType",
    header: ({ column }) => <SortableHeader column={column} title="Typ" className="w-[150px]"/>,
    cell: ({ row }) => (
      <div className="ml-3 w-[150px]">
        {row.original.searchValueType.name}
      </div>
    ),
  },
  {
    accessorKey: "noOfItems",
    header: ({ column }) => <SortableHeader column={column} title="Rader" />,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.noOfItems}
      </div>
    ),
  },
];
