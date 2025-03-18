"use client"

import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/heading";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import useNewEceStore from "@/store/use-newece-store";
import { columns } from "./copy-from-columns"
import { DataTable } from "@/components/datatable/data-table";
import { CopyFromToolbar } from "./copy-from-toolbar";

export function CopyFromTable() {
  const { catalogSearch } = useNewEceStore()
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: catalogSearch?.newCatalogSearchViews || [],
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
            <Heading title="Kopiera sökvärde" description={catalogSearch?.newCatalogSearchViews?.length.toString()} />
          </CardTitle>
          <CopyFromToolbar table={table} />
        </CardHeader>
        <CardContent>
          <div className="flex h-[calc(100vh-170px)]">
            <div className="flex w-full">
              <ScrollArea type="scroll" className=" flex-1 overflow-y-auto">
                {catalogSearch &&
                  <DataTable columns={columns} table={table} />
                }
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
