"use client"

import { useQuery } from "@tanstack/react-query";
import { onGetItems } from "@/actions/item";
import useSettingStore from "@/hooks/use-setting-store";
import useItemsFilterStore from "@/hooks/use-itemsfilter-store";
import { ItemsTable } from "./items-table";
import useBomStore from "@/hooks/use-bom-store";

export default function ItemsContent({ type }: { type: "bom" | "catalog" | "vehiclecatalog" }) {
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
        <ItemsTable items={data.flatteOeItems} itemsCount={data.totalCount} type={type} />
      }
    </div>
  )
}
