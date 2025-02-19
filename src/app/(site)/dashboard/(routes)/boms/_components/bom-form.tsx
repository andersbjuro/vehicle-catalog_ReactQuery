"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { Bom } from "@/types";

interface Props {
  bom: Bom
}

const BomForm = ({bom}: Props) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle><span className=" text-primary">{bom?.name}</span></CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <p className="text-ellipsis overflow-hidden">{bom?.id}</p>
            <p className="text-xs text-muted-foreground">{bom?.brand.name} - {bom?.productGroup.name} - Land {bom?.countryCode}</p>
            <p className="text-xs text-muted-foreground">Skapad: {bom ? formatDateTime(bom?.created) : ''} Ändrad {bom ? formatDateTime(bom?.modified) : ''}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BomForm
