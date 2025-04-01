"use client"

import { DataTable } from '@/components/datatable/data-table';
import { columns } from "./columns";
import { ScrollArea } from '@/components/ui/scroll-area';
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Bom } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Heading } from '../heading';
import { DataTableToolbar } from './toolbar';
import { useTranslations } from 'next-intl';
import { translation } from '@/config/translation';

interface Props {
  boms: Bom[] | undefined
  bomsCount: string,
  type: "catalog" | "vehiclecatalog"
}

export const BomsTable = ({ boms, bomsCount, type }: Props) => {
  const t = useTranslations(translation.bomsTable);
  const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
      data: boms || [],
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
          <Heading title={t('title')} description={bomsCount.toString()} />
        </CardTitle>
        <DataTableToolbar table={table} type={type} />
      </CardHeader>
      <CardContent>
        <div className="flex h-[calc(100vh-340px)]">
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
