"use client"

import { CatalogTable } from "./catalog-table";
import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "@/actions/catalog";
import useCatalogStore from "@/hooks/use-catalog-store";
import useSettingStore from "@/hooks/use-setting-store";

export default function CatalogContent() {

  const { setting: { countryCode } } = useSettingStore()
  const { searchValue } = useCatalogStore()
  const filter = { searchValue: searchValue.searchValue, valueType: searchValue.valueType, countryCode: countryCode }

  const { data, isFetched } = useQuery({
    queryKey: ["catalog", searchValue.searchValue],
    queryFn: async () => { return getCatalog(filter) },
    enabled: searchValue.searchValue !== ""
  })

  if (!isFetched) return <div>Loading...</div>

  return (
    <CatalogTable catalog={data} />
  )
}

