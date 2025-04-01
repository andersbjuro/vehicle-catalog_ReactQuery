"use client"

import { SearchValue } from "@/types";
import { ColumnDef } from "@tanstack/react-table"
import { SortableHeader } from "@/components/datatable/sortable-header";
import Link from "next/link";
import { routes } from "@/config/routes";
import { translation } from "@/config/translation";

export const columns: ColumnDef<SearchValue>[] = [
  {
    accessorKey: "value",
    header: ({ column }) => <SortableHeader column={column} title="value" className="font-medium w-[250px]" translation={translation.catalogGrid}/>,
    cell: ({ row }) => (
      <div className="ml-3 font-medium w-[250px]">
        <Link href={routes.editCatalog(row.original.id)}><span className="underline">{row.original.value}</span></Link>
      </div>
    ),
  },
  {
    accessorKey: "valueType",
    header: ({ column }) => <SortableHeader column={column} title="valueType" className="w-[150px]" translation={translation.catalogGrid}/>,
    cell: ({ row }) => (
      <div className="ml-3 w-[150px]">
        {row.original.searchValueType.name}
      </div>
    ),
  },
  {
    accessorKey: "noOfItems",
    header: ({ column }) => <SortableHeader column={column} title="noOfItems" translation={translation.catalogGrid}/>,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.noOfItems}
      </div>
    ),
  },
];
