"use client"

import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/heading";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { NewVehicleItem } from "@/types/ece";
import { columns } from "./new-item-columns";
import { DataTable } from "@/components/datatable/data-table";
import { NewItemToolbar } from "./new-item-toolbar";

interface Props {
  newItems: NewVehicleItem[];
}

export function NewItemsTable({ newItems }: Props) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: newItems || [],
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
    },
  });

  return (
    <section>
      <Card className="mt-2">
        <CardHeader className="flex flex-col sm:flex-row items-start justify-between gap-2">
          <CardTitle>
            <Heading title="Utan sökvärde" description={newItems.length.toString()} />
          </CardTitle>
          <NewItemToolbar table={table} />
        </CardHeader>
        <CardContent>
          <div className="flex h-[calc(100vh-170px)]">
            <div className="flex w-full">
              <ScrollArea type="scroll" className=" flex-1 overflow-y-auto">
                <DataTable columns={columns} table={table} />
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
