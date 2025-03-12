"use client"

import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "@/actions/catalog";
import useSettingStore from "@/store/use-setting-store";
import { CatalogTable } from "./catalog-table";
import useVehicleStore from "@/store/use-vehicle-store";

export default function VehicleCatalogContent() {

  const { setting: { countryCode } } = useSettingStore()
  const { vehicle, selectedNode } = useVehicleStore()
  const filter = { searchValue: selectedNode, valueType: vehicle?.eceTree?.valueType, countryCode: countryCode }

  const { data, isFetched } = useQuery({
    queryKey: ["catalog", selectedNode],
    queryFn: async () => { return getCatalog(filter) },
    enabled: selectedNode !== "",
  })

  if (!isFetched) return <h1 className="text-sm">Ingen data</h1>

  return (
    <CatalogTable catalog={data} />
  )
}

