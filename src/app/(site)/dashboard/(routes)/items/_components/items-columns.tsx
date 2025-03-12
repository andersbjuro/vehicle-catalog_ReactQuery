"use client"

import { FlattOeItem } from "@/types";
import { ColumnDef } from "@tanstack/react-table"
import {SortableHeader} from "@/components/datatable/sortable-header";
import Link from "next/link";
import { routes } from "@/config/routes";

export const columns: ColumnDef<FlattOeItem>[] = [
  {
    accessorKey: "oeItemId",
    header: ({ column }) => <SortableHeader column={column} title="OeItemId" className="font-medium w-[80px]" />,
    cell: ({ row }) => (
      <div className="ml-3 font-medium w-[80px]">
        <Link href={routes.editItem(row.original.oeItemId)}><span className="underline">{row.original.oeItemId}</span></Link>
      </div>
    ),
  },
  {
    accessorKey: "oeName",
    header: ({ column }) => <SortableHeader column={column} title="OeName" className="w-[250px]"/>,
    cell: ({ row }) => (
      <div className="ml-3 w-[250px]">
        {row.original.oeName}
      </div>
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <SortableHeader column={column} title="Varumärke" />,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.brand}
      </div>
    ),
  },
  {
    accessorKey: "productGroup",
    header: ({ column }) => <SortableHeader column={column} title="Produkrgrupp" />,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.productGroup}
      </div>
    ),
  },
  {
    accessorKey: "itemId",
    header: ({ column }) => <SortableHeader column={column} title="ItemId" />,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.itemId}
      </div>
    ),
  },

  {
    accessorKey: "itemName",
    header: ({ column }) => <SortableHeader column={column} title="ItemName" />,
    cell: ({ row }) => (
      <div className="ml-4 ">
        {row.original.itemName}
      </div>
    ),
  },
];
