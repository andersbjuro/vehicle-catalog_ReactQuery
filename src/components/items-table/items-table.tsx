"use client"

import { FlattOeItem } from "@/types";
import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "../datatable/data-table";
import { columns } from "./columns";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Heading } from "@/components/heading";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { DataTableToolbar } from "./toolbar";
import { useTranslations } from "next-intl";
import { translation } from "@/config/translation";

interface Props {
  items: FlattOeItem[] | undefined
  itemsCount: string,
  type: "bom" | "catalog" | "vehiclecatalog"
}

export function ItemsTable({ items, itemsCount, type }: Props) {
  const t = useTranslations(translation.itemsTable);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: items || [],
    columns,
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
            <Heading title={t('title')} description={itemsCount.toString()} />
          </CardTitle>
          <DataTableToolbar table={table} type={type} />
        </CardHeader>
        <CardContent>
          <div className="flex h-[calc(100vh-350px)]">
            <div className="flex  w-full">
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
