"use client"

import { Bom } from "@/types";
import { ColumnDef } from "@tanstack/react-table"
import {SortableHeader} from "@/components/datatable/sortable-header";
import Link from "next/link";
import { routes } from "@/config/routes";

export const columns: ColumnDef<Bom>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} title="Id" className="font-medium w-[80px]" />,
    cell: ({ row }) => (
      <div className="ml-3 font-medium w-[80px]">
        <Link href={routes.editBom(row.original.id)}><span className="underline">{row.original.id}</span></Link>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Namn" className="w-[350px]"/>,
    cell: ({ row }) => (
      <div className="ml-3 w-[350px]">
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <SortableHeader column={column} title="Varumärke" />,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.brand.name}
      </div>
    ),
  },
  {
    accessorKey: "productGroup",
    header: ({ column }) => <SortableHeader column={column} title="Produktgrupp" />,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.productGroup.name}
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
