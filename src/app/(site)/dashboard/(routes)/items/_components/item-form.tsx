"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { OeItem } from "@/types";

interface ItemFormProps {
  item: OeItem
}
const ItemForm = ({ item }: ItemFormProps) => {

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle><span className="text-primary">{item?.oeName}</span></CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <p className="text-ellipsis overflow-hidden">{item.oeItemId}</p>
            <p className="text-xs text-muted-foreground">{item?.brand.name} - {item?.productGroup.name} - Land {item.countryCode}</p>
            <p className="text-xs text-muted-foreground">Skapad: {item ? formatDateTime(item?.created) : ''} Ändrad {item ? formatDateTime(item?.modified) : ''}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ItemForm
