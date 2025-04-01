"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { Bom } from "@/types";
import { ColumnDef } from "@tanstack/react-table"
import {SortableHeader} from "@/components/datatable/sortable-header";
import Link from "next/link";
import { routes } from "@/config/routes";
import { translation } from "@/config/translation";

export const columns: ColumnDef<Bom>[] = [
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
    accessorKey: "bomId",
    header: ({ column }) => <SortableHeader column={column} title="bomId" translation={translation.bomsTable}/>,
    cell: ({ row }) => (
      <div className="ml-4 font-medium">
        <Link href={routes.editBom( row.original.id)}><span className="underline">{row.original.id}</span></Link>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="name" translation={translation.bomsTable}/>,
  },
];
