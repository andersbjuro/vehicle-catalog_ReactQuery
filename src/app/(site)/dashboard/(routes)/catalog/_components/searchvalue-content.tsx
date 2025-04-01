"use client"

import { useEffect } from "react";
import SearchValueForm from "./searchvalue-form"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSearchValueById } from "@/actions/catalog";
import useCatalogStore from "@/store/use-catalog-store";
import ItemsContent from "@/components/items-table/items-content";
import BomsContent from "@/components/boms-table/boms-content";
import { CatalogTable } from "@/components/catalog/catalog-table";
import { useTranslations } from "next-intl";
import { translation } from "@/config/translation";

export default function SearchValueContent() {
  const t = useTranslations(translation.catalogPage);
  const params = useParams();
  const { id } = params;
  const { setFilter, setSearchValue } = useCatalogStore()
  const filter = { id: Number(id) }

  const { data } = useQuery({
    queryKey: ["searchvalue", id],
    queryFn: async () => { return getSearchValueById(filter) },
  })

  useEffect(() => {
    if (data) {
      setSearchValue({ searchValue: data.value, valueType: data.valueType, countryCode: data.countryCode })
      setFilter(filter)
    }
  }, [data]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-1/2">
        <SearchValueForm searchValue={data} />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="w-full">
          <CatalogTable />
        </div>
        <div className="flex ">
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="items">{t('tab1')}</TabsTrigger>
              <TabsTrigger value="boms">{t('tab2')}</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              <ItemsContent type="catalog" />
            </TabsContent>
            <TabsContent value="boms">
              <BomsContent type="catalog" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

