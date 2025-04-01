"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { FlattOeItem, OeItem } from "@/types";
import { ColumnDef } from "@tanstack/react-table"
import {SortableHeader} from "@/components/datatable/sortable-header";
import Link from "next/link";
import { routes } from "@/config/routes";
import { translation } from "@/config/translation";

export const columns: ColumnDef<FlattOeItem>[] = [
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
    header: ({ column }) => <SortableHeader column={column} title="oeItemId" translation={translation.itemsTable}/>,
    cell: ({ row }) => (
      <div className="ml-4 font-medium">
        <Link href={routes.editItem(row.original.oeItemId)}><span className="underline">{row.original.oeItemId}</span></Link>
      </div>
    ),
  },
  {
    accessorKey: "itemId",
    header: ({ column }) => <SortableHeader column={column} title="itemId" translation={translation.itemsTable}/>,
  },
  {
    accessorKey: "oeName",
    header: ({ column }) => <SortableHeader column={column} title="oeName" translation={translation.itemsTable}/>,
  },
  {
    accessorKey: "itemName",
    header: ({ column }) => <SortableHeader column={column} title="itemName" translation={translation.itemsTable}/>,
  },
];
