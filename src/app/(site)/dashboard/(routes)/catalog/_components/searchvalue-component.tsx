"use client"

import { useAtomValue, useSetAtom } from "jotai"
import { catalogFilter, catalogSearchValue, searchValueAtom } from "@/atoms/catalogAtoms"
import { SearchValue } from "@/types"
import SearchValueForm from "./searchvalue-form"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import ItemsComponent from "@/components/items/items-component"
import BomsComponent from "@/components/boms/boms-component"
import CatalogComponent from "@/components/catalog/catalog-component"
import { useEffect } from "react"
import { countryCode } from "@/atoms/userAtoms"

interface SearchValueComponentProps {
  searchValue: SearchValue
}

function SearchValueComponent({
  searchValue,
}: SearchValueComponentProps) {

  const country = useAtomValue(countryCode) as number
  const setPostId = useSetAtom(searchValueAtom)
  const setSearch = useSetAtom(catalogFilter)
  const setCatalogSearchValue = useSetAtom(catalogSearchValue)

  useEffect(() => {
    setPostId(searchValue)
    setSearch({ searchValue: searchValue.value, valueType: searchValue.valueType, countryCode: country })
    setCatalogSearchValue({value: searchValue.value, valueType: searchValue.searchValueType.id, countryCode: searchValue.countryCode})
  }, [searchValue]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-1/2">
        <SearchValueForm />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className="w-full">
          <CatalogComponent />
        </div>
        <div className="flex flex-col">
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="items">Artiklar</TabsTrigger>
              <TabsTrigger value="boms">Bomstrukturer</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              <ItemsComponent type="catalog" />
            </TabsContent>
            <TabsContent value="boms">
              <BomsComponent type="catalog"/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default SearchValueComponent
