"use client"

import { Heading } from "@/components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { CatalogTable } from "./catalog-table";
// import { useAtomValue } from 'jotai';
// import { removeFromCatalog, selectedRowIds } from "@/atoms/catalogAtoms";
// import { catalogCountAtom, searchValueAtom } from '@/atoms/catalogAtoms';
import { toast } from "sonner"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useRoleAccess from "@/hooks/useRoleAccess";
import useCatalogStore from "@/hooks/use-catalog-store";

const CatalogComponent = () => {
  const session = useSession()
  const [isEditor, setIsEditor] = useState(false);
  const { searchValue} = useCatalogStore()
  console.log(searchValue)
  // const catalogCount = useAtomValue(catalogCountAtom);
  // const rowIds = useAtomValue(selectedRowIds);
  // const searchValue = useAtomValue(searchValueAtom);

  // const { mutate: removeItems, isError } = useAtomValue(removeFromCatalog);

  const removeItemsFromCatalog = async () => {
    // removeItems({ value: searchValue?.value!, valueType: searchValue?.searchValueType.id!, items: rowIds })
    // if (!isError)
    //   toast.success("Artiklar borttagna från Katalogen")
  }

  // useEffect(() => {
  //   let access = useRoleAccess(session, searchValue?.countryCode, 'CatalogManager').hasAccess && rowIds.length !== 0 && searchValue?.value !== ''

  //   setIsEditor(access)
  // }, [session, rowIds, searchValue]);

  return (
    <section>
      <Card className="mt-2">
        <CardHeader className="flex flex-col sm:flex-row items-start justify-between gap-2">
          <CardTitle>
            <Heading title="Katalog" description="100" />
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='destructive'
                  size='icon'
                  className="mb-2"
                  onClick={async () => removeItemsFromCatalog()}
                  disabled={!isEditor}
                >
                  <Trash2 className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ta bort valda artiklar ur katalogen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          {/* <CatalogTable /> */}
        </CardContent>
      </Card>
    </section >
  )
}

export default CatalogComponent
