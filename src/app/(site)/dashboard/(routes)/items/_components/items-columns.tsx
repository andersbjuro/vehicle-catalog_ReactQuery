"use client"

import { FlattOeItem } from "@/types";
import { ColumnDef } from "@tanstack/react-table"
import {SortableHeader} from "@/components/datatable/sortable-header";
import Link from "next/link";
import { routes } from "@/config/routes";
import { translation } from "@/config/translation";

export const columns: ColumnDef<FlattOeItem>[] = [
  {
    accessorKey: "oeItemId",
    header: ({ column }) => <SortableHeader column={column} title="oeItemId" className="font-medium w-[80px]" translation={translation.oeGrid}/>,
    cell: ({ row }) => (
      <div className="ml-3 font-medium w-[80px]">
        <Link href={routes.editItem(row.original.oeItemId)}><span className="underline">{row.original.oeItemId}</span></Link>
      </div>
    ),
  },
  {
    accessorKey: "oeName",
    header: ({ column }) => <SortableHeader column={column} title="oeName" className="w-[250px]" translation={translation.oeGrid}/>,
    cell: ({ row }) => (
      <div className="ml-3 w-[250px]">
        {row.original.oeName}
      </div>
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <SortableHeader column={column} title="brand" translation={translation.oeGrid}/>,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.brand}
      </div>
    ),
  },
  {
    accessorKey: "productGroup",
    header: ({ column }) => <SortableHeader column={column} title="productGroup" translation={translation.oeGrid}/>,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.productGroup}
      </div>
    ),
  },
  {
    accessorKey: "itemId",
    header: ({ column }) => <SortableHeader column={column} title="itemId" translation={translation.oeGrid}/>,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.itemId}
      </div>
    ),
  },

  {
    accessorKey: "itemName",
    header: ({ column }) => <SortableHeader column={column} title="itemName" translation={translation.oeGrid}/>,
    cell: ({ row }) => (
      <div className="ml-4 ">
        {row.original.itemName}
      </div>
    ),
  },
];
