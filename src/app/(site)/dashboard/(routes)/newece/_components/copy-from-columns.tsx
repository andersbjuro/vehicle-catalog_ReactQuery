"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox";
import {SortableHeader} from "@/components/datatable/sortable-header";
import { NewCatalogSearch } from "@/types/ece";

export const columns: ColumnDef<NewCatalogSearch>[] = [
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
    accessorKey: "searchId",
    header: ({ column }) => <SortableHeader column={column} title="Sökvärde" className="w-48" />,
    cell: ({ row }) => (
      <div className="ml-3 ">
      {row.original.searchId}
    </div>
    ),
  },
  {
    accessorKey: "typeApprovalNumber",
    header: ({ column }) => <SortableHeader column={column} title="Typnummer" className="w-28"/>,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.typeApprovalNumber}
      </div>
    ),
  },
  {
    accessorKey: "count",
    header: ({ column }) => <SortableHeader column={column} title="Antal" className="w-12" />,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.count}
      </div>
    ),
  },
  {
    accessorKey: "extension",
    header: ({ column }) => <SortableHeader column={column} title="Extension" className="w-16"/>,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.extension}
      </div>
    ),
  },
  {
    accessorKey: "variant",
    header: ({ column }) => <SortableHeader column={column} title="Variant" className="w-16"/>,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.variant}
      </div>
    ),
  },
  {
    accessorKey: "version",
    header: ({ column }) => <SortableHeader column={column} title="Version" className="w-full"/>,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.version}
      </div>
    ),
  },
];
