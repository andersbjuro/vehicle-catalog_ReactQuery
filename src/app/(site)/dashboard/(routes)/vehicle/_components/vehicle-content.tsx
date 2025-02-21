"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VehicleCountrySelector from './vehicle-country-selector'
import useVehicleFilter from '@/hooks/use-vehicle-filter';
import { useVehicle } from '@/hooks/useVehicle';
import useVehicleStore from '@/hooks/use-vehicle-store';
import SearchInput from './search-input';

export default function VehicleContent() {
  const { country } = useVehicleStore();
  const { filters } = useVehicleFilter();
  const { data, isLoading } = useVehicle(filters.query, country)

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-1/2 gap-2">
        <div className="flex items-center justify-start gap-2 w-full">
          <VehicleCountrySelector />
          <SearchInput placeholder="regNo..." />
        </div>
        {data?.fb01}
        {/* <VehicleData /> */}
      </div>

      <div className="flex flex-row flex-1 gap-3 mt-2 ">
        <div className="flex flex-col w-1/2">
          {/* <VehicleCatalogComponent /> */}
        </div>
        <div className="flex flex-col w-1/2">
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="items">Artiklar</TabsTrigger>
              <TabsTrigger value="boms">Bomstrukturer</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              {/* <ItemsComponent type="vehiclecatalog" /> */}
            </TabsContent>
            <TabsContent value="boms">
              {/* <BomsComponent type="vehiclecatalog" /> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

