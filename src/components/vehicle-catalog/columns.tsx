"use client"

import {SortableHeader} from "@/components/datatable/sortable-header";
import { Checkbox } from "@/components/ui/checkbox";
import { routes } from "@/config/routes";
import { Catalog } from "@/types";
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";

export const columns: ColumnDef<Catalog>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "oeItemId",
    header: ({ column }) => <SortableHeader column={column} title="OeItemId" />,
    cell: ({ row }) => (
      <div className="ml-4 font-medium">
      <Link href={routes.editItem(row.original.oeItemId)}><span className="underline">{row.original.oeItemId}</span></Link>
    </div>
    ),
  },
  {
    accessorKey: "itemId",
    header: ({ column }) => <SortableHeader column={column} title="ItemId" />,
  },

  {
    accessorKey: "oeName",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
  },
  {
    accessorKey: "itemName",
    header: ({ column }) => <SortableHeader column={column} title="ItemName" />,
  },
  {
    accessorKey: "bomTableId",
    header: ({ column }) => <div style={{ textAlign: "right" }}><SortableHeader column={column} title="BomId" /></div>,
    cell: ({ row }) => (
      <div className="text-right mr-5">
        {row.original.bomTableId}
      </div>
    ),
  },
];
