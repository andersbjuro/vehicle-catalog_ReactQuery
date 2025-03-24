"use client"

import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "../datatable/data-table";
import { columns } from "./columns";
import { Suspense, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Heading } from "@/components/heading";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { DataTableToolbar } from "./toolbar";
import useSettingStore from "@/store/use-setting-store";
import useCatalogStore from "@/store/use-catalog-store";
import { useCatalog } from "@/hooks/useCatalog";

export function CatalogTable() {
  const [rowSelection, setRowSelection] = useState({});
  const { setting: { countryCode } } = useSettingStore()
  const { searchValue } = useCatalogStore()
  const filter = { searchValue: searchValue.searchValue, valueType: searchValue.valueType, countryCode: countryCode }
  const { data, isFetched } = useCatalog(filter)

  const table = useReactTable({
    data: data || [],
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
            <Heading title="Katalog" description={data?.length.toString()} />
          </CardTitle>
          <DataTableToolbar table={table} />
        </CardHeader>
        <Suspense>
          <CardContent>
            <div className="flex h-[calc(100vh-300px)]">
              <div className="flex  w-full">
                <ScrollArea type="scroll" className=" flex-1 overflow-y-auto">
                  {isFetched &&
                    <DataTable columns={columns} table={table} />
                  }
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Suspense>
      </Card>
    </section>
  )
}
