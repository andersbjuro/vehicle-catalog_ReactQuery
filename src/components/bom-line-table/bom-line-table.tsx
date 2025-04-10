"use client"

import { FlattBomLine } from "@/types";
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
  bomLines: FlattBomLine[];
}

export function BomLineTable({ bomLines }: Props) {
  const t = useTranslations(translation.bomLinesTable);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: bomLines,
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
            <Heading title={t('title')} description={bomLines?.length.toString()} />
          </CardTitle>
          <DataTableToolbar table={table} />
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
