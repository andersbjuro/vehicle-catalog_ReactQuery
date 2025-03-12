"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox";
import {SortableHeader} from "@/components/datatable/sortable-header";
import { NewVehicleItem } from "@/types/ece";

export const columns: ColumnDef<NewVehicleItem>[] = [
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
    accessorKey: "rowId",
    header: ({ column }) => <SortableHeader column={column} title="Id" className="w-10" />,
    cell: ({ row }) => (
      <div className="ml-3 ">
      {row.original.rowId}
    </div>
    ),
  },
  {
    accessorKey: "sourceRegNo",
    header: ({ column }) => <SortableHeader column={column} title="RegNo" className="w-10"/>,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.sourceRegNo}
      </div>
    ),
  },
  {
    accessorKey: "typeApprovalNumber",
    header: ({ column }) => <SortableHeader column={column} title="Typnummer" />,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.typeApprovalNumber}
      </div>
    ),
  },
  {
    accessorKey: "variant",
    header: ({ column }) => <SortableHeader column={column} title="Variant" />,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.variant}
      </div>
    ),
  },
  {
    accessorKey: "version",
    header: ({ column }) => <SortableHeader column={column} title="Version" />,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.version}
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
    accessorKey: "country",
    header: ({ column }) => <SortableHeader column={column} title="Land" />,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.country}
      </div>
    ),
  },
  {
    accessorKey: "sourceVIN",
    header: ({ column }) => <SortableHeader column={column} title="VIN" />,
    cell: ({ row }) => (
      <div className="ml-3">
        {row.original.sourceVIN}
      </div>
    ),
  },
];
