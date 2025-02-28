"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VehicleCountrySelector from './vehicle-country-selector'
import useVehicleFilter from '@/hooks/use-vehicle-filter';
import { useVehicle } from '@/hooks/useVehicle';
import useVehicleStore from '@/hooks/use-vehicle-store';
import SearchInput from './search-input';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VehicleData } from './vehicle-data';
import VehicleCatalogContent from '@/components/vehicle-catalog/vehicle-catalog-content';
import ItemsContent from '@/components/items-table/items-content';
import BomsContent from '@/components/boms-table/boms-content';
import useCatalogStore from '@/hooks/use-catalog-store';
import useSettingStore from '@/hooks/use-setting-store';

export default function VehicleContent() {
  const router = useRouter()
  const { setSearchValue } = useCatalogStore();
  const { setting: { countryCode } } = useSettingStore()
  const { country, setVehicle } = useVehicleStore();
  const { filters } = useVehicleFilter();
  const { data, searchValue } = useVehicle(filters.query, country)

  useEffect(() => {
    if (searchValue)
      router.replace(`/dashboard/catalog/${searchValue.id}/edit`)
  }, [searchValue])

  useEffect(() => {
    if (data) {
      setVehicle(data)
      setSearchValue({ searchValue: data.eceTree.searchId, valueType: data.eceTree.valueType, countryCode: countryCode })
    }
  }, [data])


  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-1/2 gap-2">
        <div className="flex items-center justify-start gap-2 w-full">
          <VehicleCountrySelector />
          <SearchInput placeholder="regNo..." />
        </div>
        <VehicleData />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="w-full">
          <VehicleCatalogContent />
        </div>
        <div className="flex">
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="items">Artiklar</TabsTrigger>
              <TabsTrigger value="boms">Bomstrukturer</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              <ItemsContent type="vehiclecatalog" />
            </TabsContent>
            <TabsContent value="boms">
              <BomsContent type="vehiclecatalog" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

