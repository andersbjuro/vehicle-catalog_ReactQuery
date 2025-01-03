"use client"

import { useSearchParams } from "next/navigation";

import { Heading } from "@/components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";
import { useEffect, useState } from "react";
import AddToBomDialog from "./add-to-bom-dialog";
import { Bom } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { onGetItems } from "@/actions/item";
import { createOeItemsFilter } from "@/graphql/filters";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import ItemsTable from "@/components/items/items-table";
import { columns } from "@/components/items/items-table-columns";
import useRoleAccess from "@/hooks/useRoleAccess";
import { useSession } from "next-auth/react";

interface Props {
  bom: Bom,
}

export default function ItemsContent({ bom }: Props) {
  const session = useSession()
  const searchParams = useSearchParams();
  //const params = new URLSearchParams(searchParams);
  const [country, setCountry] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [rowSelection, setRowSelection] = useState([]);
  const [isEditor, setIsEditor] = useState(false);

  useEffect(() => {
    setCountry(Number(localStorage.getItem('user-country-code') as string))
    refetch
  }, []);

  useEffect(() => {
    let access = useRoleAccess(session, bom?.countryCode, 'CatalogManager').hasAccess && rowSelection?.length !== 0
    setIsEditor(access)
  }, [session, rowSelection]);

  const filter = {
    filter: createOeItemsFilter({ searchValue: searchParams.get('q') || '', brandId: Number(searchParams.get('brand')), productGroupId: Number(searchParams.get('pg')) }),
    countryCode: country
  }

  const { data, refetch } = useQuery({
    queryKey: ['items', filter],
    queryFn: async () => { return onGetItems(filter) },
    enabled: country > 0
  })

  return (
    <section>
      <Card className="mt-2">
        <CardHeader className="flex flex-col sm:flex-row items-start justify-between gap-2">
          <CardTitle>
            <Heading title="Artiklar" description={data?.oeItems.totalCount} />
          </CardTitle>
          <div>
            <div className='flex w-full gap-2'>
              {/* <SearchBar /> */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="icon"
                      className="mb-2"
                      onClick={async () => setShowAddDialog(true)}
                      disabled={!isEditor}
                    >
                      <BookPlus className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Lägg till valda artiklar till bomlistan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {data && data.oeItems &&
            <div className="flex h-[calc(100vh-350px)]">
              <ScrollArea type="scroll" className="w-1 flex-1 overflow-y-auto">
                <ItemsTable columns={columns} data={data.oeItems.nodes} onRowSelectStateChange={setRowSelection} />
              </ScrollArea>
            </div>
          }
          {showAddDialog && (
            <AddToBomDialog bom={bom} rowIds={rowSelection} open={showAddDialog} onClose={() => setShowAddDialog(false)} />
          )}
        </CardContent>
      </Card>
    </section >
  )
}
