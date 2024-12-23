"use client"

import { Heading } from "@/components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Bom, FlattBomLine } from "@/types";
import { columns } from "./bom-line-columns";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import BomLineTable from "./bom-line-table";
import RemoveFromBomDialog from "./remove-from-bom-dialog";
import { useSession } from "next-auth/react";
import useRoleAccess from "@/hooks/useRoleAccess";

interface Props {
  bom: Bom;
}

function BomLineContent({bom}: Props) {
  const session = useSession()
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [rowSelection, setRowSelection] = useState([]);
  const [isEditor, setIsEditor] = useState(false);
  const flatteBomLines: FlattBomLine[] = []

  bom?.lines.forEach((line => {
    if (line.oeItem.oeRefs.length === 0) {
      flatteBomLines.push({oeItemId: line.oeItemId,oeName: line.oeItem.oeName,itemId: ''})
    }
    else {
      line.oeItem.oeRefs.forEach((ref) => {
        flatteBomLines.push({oeItemId: line.oeItemId,oeName: line.oeItem.oeName,itemId: ref.itemId})
      })
    }
  }))

  useEffect(() => {
    console.log(session)
    let access = useRoleAccess(session, bom?.countryCode, 'CatalogManager').hasAccess && rowSelection?.length !== 0
    setIsEditor(access)
  }, [session, rowSelection]);

  return (
    <section>
      <Card className="mt-2">
        <CardHeader className="flex flex-col sm:flex-row items-start justify-between gap-2">
          <CardTitle>
            <Heading title="Bomlista" description={flatteBomLines?.length.toString()} />
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='destructive'
                  size='icon'
                  className="mb-2"
                  onClick={() => setShowRemoveDialog(true)}
                  disabled={!isEditor}
                >
                  <Trash2 className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ta bort valda artiklar ur bomlistan</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          {bom && bom.lines &&
            <div className="flex h-[calc(100vh-350px)]">
              <ScrollArea type="scroll" className="w-1 flex-1 overflow-y-auto">
                <BomLineTable columns={columns} data={flatteBomLines} onRowSelectStateChange={setRowSelection} />
              </ScrollArea>
            </div>
          }
          {showRemoveDialog && (
            <RemoveFromBomDialog
            bom={bom}
            rowIds={rowSelection || undefined}
              open={showRemoveDialog}
              onClose={() => setShowRemoveDialog(false)}
            />
          )}
        </CardContent>
      </Card>
    </section >
  )
}

export default BomLineContent
