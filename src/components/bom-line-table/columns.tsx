"use client"

import {SortableHeader} from "@/components/datatable/sortable-header";
import { Checkbox } from "@/components/ui/checkbox";
import { routes } from "@/config/routes";
import { FlattBomLine } from "@/types";
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";
import { translation } from "@/config/translation";

export const columns: ColumnDef<FlattBomLine>[] = [
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
    header: ({ column }) => <SortableHeader column={column} title="oeItemId" translation={translation.bomLinesTable}/>,
    cell: ({ row }) => (
      <div className="ml-4 font-medium">
        <Link href={routes.editItem(row.original.oeItemId)}><span className="underline">{row.original.oeItemId}</span></Link>
      </div>
    ),
  },
  {
    accessorKey: "itemId",
    header: ({ column }) => <SortableHeader column={column} title="itemId"  translation={translation.bomLinesTable}/>,
  },
  {
    accessorKey: "oeName",
    header: ({ column }) => <SortableHeader column={column} title="oeName"  translation={translation.bomLinesTable}/>,
  },
  {
    accessorKey: "itemName",
    header: ({ column }) => <SortableHeader column={column} title="itemName"  translation={translation.bomLinesTable}/>,
  },
];
