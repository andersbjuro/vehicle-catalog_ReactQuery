"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { OeItem } from "@/types";
import { ColumnDef } from "@tanstack/react-table"
import {SortableHeader} from "@/components/datatable/sortable-header";


//import { CellAction } from "./cell-action"

export const columns: ColumnDef<OeItem>[] = [
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
        {row.original.oeItemId}
      </div>
    ),
  },
  {
    accessorFn: row => row.oeRefs[0]?.itemId,
    header: "ItemId",
  },
  {
    accessorKey: "oeName",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
  },
];
