"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VehicleCountrySelector from './vehicle-country-selector'
import useVehicleFilter from '@/hooks/use-vehicle-filter';
import { useVehicle } from '@/hooks/useVehicle';
import useVehicleStore from '@/store/use-vehicle-store';
import SearchInput from './search-input';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VehicleData } from './vehicle-data';
import ItemsContent from '@/components/items-table/items-content';
import BomsContent from '@/components/boms-table/boms-content';
import useCatalogStore from '@/store/use-catalog-store';
import useSettingStore from '@/store/use-setting-store';
import { routes } from '@/config/routes';
import CopySearchvalueContent from './copy-searchvalue-content';
import useNewEceStore from '@/store/use-newece-store';
import { CatalogTable } from '@/components/vehicle-catalog/catalog-table';
import { useTranslations } from 'next-intl';
import { translation } from '@/config/translation';

export default function VehicleContent() {
  const t = useTranslations(translation.ecePage);
  const router = useRouter()
  const { setSearchValue } = useCatalogStore();
  const { setting: { countryCode } } = useSettingStore()
  const { setVehicle } = useVehicleStore();
  const { filters } = useVehicleFilter();
  const { vehicle, searchValue } = useVehicle(filters)
  const { resetCatalogSearch } = useNewEceStore()

  useEffect(() => {
    if (searchValue)
      router.replace(routes.editCatalog(searchValue.id))
  }, [searchValue])

  useEffect(() => {
    if (vehicle) {
      setVehicle(vehicle)
      setSearchValue({ searchValue: vehicle.eceTree.searchId, valueType: vehicle.eceTree.valueType, countryCode: countryCode })
      resetCatalogSearch()
    }
  }, [vehicle])

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
          <CatalogTable />
        </div>
        <div className="flex">
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="items">{t('tab1')}</TabsTrigger>
              <TabsTrigger value="boms">{t('tab2')}</TabsTrigger>
              <TabsTrigger value="copy">{t('tab3')}</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              <ItemsContent type="vehiclecatalog" />
            </TabsContent>
            <TabsContent value="boms">
              <BomsContent type="vehiclecatalog" />
            </TabsContent>
            <TabsContent value="copy">
              <CopySearchvalueContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

