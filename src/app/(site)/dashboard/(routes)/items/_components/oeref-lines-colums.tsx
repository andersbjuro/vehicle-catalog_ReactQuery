"use client"

import {SortableHeader} from "@/components/datatable/sortable-header";
import { OeRef } from "@/types";
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<OeRef>[] = [
  {
    accessorKey: "ItemId",
    header: ({ column }) => <SortableHeader column={column} title="ItemId" />,
    cell: ({ row }) => (
      <div className="font-medium ml-4">
        {row.original.itemId}
      </div>
    ),
  },
   {
    accessorKey: "countryCode",
    header: ({ column }) => <div style={{ textAlign: "right" }}><SortableHeader column={column} title="Landskod" /></div> ,
    cell: ({ row }) => (
      <div className=" mr-5">
        {row.original.countryCode.toString()}
      </div>
    ),
  },
];
