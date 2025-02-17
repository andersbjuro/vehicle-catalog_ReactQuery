"use client"

import { Bom } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { onGetItems } from "@/actions/item";
import useSettingStore from "@/hooks/use-setting-store";
import useItemsFilterStore from "@/hooks/use-itemsfilter-store";
import { ItemsTable } from "./items-table";

interface Props {
  bom: Bom,
}

export default function ItemsContent({ bom }: Props) {
  const { filter} = useItemsFilterStore()
  const { setting: { countryCode } } = useSettingStore()

  const parameter = { filter: filter, countryCode: countryCode }
  const { data } = useQuery({
    queryKey: ['items', parameter],
    queryFn: async () => { return onGetItems(parameter) }
  })

  return (
    <div>
      {data && data.flatteOeItems &&
        <ItemsTable items={data.flatteOeItems} itemsCount={data.totalCount} id={bom.id.toString()} countryCode={bom.countryCode} />
      }
    </div>
  )
}
