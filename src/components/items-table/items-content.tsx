"use client"

import { useQuery } from "@tanstack/react-query";
import { onGetItems } from "@/actions/item";
import useSettingStore from "@/store/use-setting-store";
import useItemsFilterStore from "@/store/use-itemsfilter-store";
import { ItemsTable } from "./items-table";

export default function ItemsContent({ type }: { type: "bom" | "catalog" | "vehiclecatalog" }) {
  const { filter} = useItemsFilterStore()
  const { setting: { countryCode } } = useSettingStore()

  const parameter = { filter: filter, countryCode: countryCode }
  const { data, isFetched } = useQuery({
    queryKey: ['items', parameter, type],
    queryFn: async () => { return onGetItems(parameter) }
  })

  if (!isFetched) return <div>Loading...</div>

  return (
    <div>
      {data && data.flatteOeItems &&
        <ItemsTable items={data.flatteOeItems} itemsCount={data.totalCount} type={type} />
      }
    </div>
  )
}
