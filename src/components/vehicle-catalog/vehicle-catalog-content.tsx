"use client"

import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "@/actions/catalog";
import useSettingStore from "@/hooks/use-setting-store";
import { CatalogTable } from "./catalog-table";
import useVehicleStore from "@/hooks/use-vehicle-store";

export default function VehicleCatalogContent() {

  const { setting: { countryCode } } = useSettingStore()
  const { vehicle, selectedNode } = useVehicleStore()
  const filter = { searchValue: selectedNode, valueType: vehicle?.eceTree?.valueType, countryCode: countryCode }

  const { data, isFetched } = useQuery({
    queryKey: ["catalog", selectedNode],
    queryFn: async () => { return getCatalog(filter) },
    enabled: selectedNode !== "",
  })

   if (!isFetched) return <h1 className="text-2xl font-bold">Ingen data</h1>

  return (
    <CatalogTable catalog={data} />
  )
}

