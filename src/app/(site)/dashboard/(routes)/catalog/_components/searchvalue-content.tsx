"use client"

import { useEffect } from "react";
// import { catalogFilter, catalogSearchValue, searchValueAtom } from "@/atoms/catalogAtoms"
// import { SearchValue } from "@/types"
import SearchValueForm from "./searchvalue-form"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSearchValueById } from "@/actions/catalog";
import useCatalogStore from "@/hooks/use-catalog-store";
import CatalogComponent from "@/components/catalog/catalog-component";
import CatalogContent from "@/components/catalog/catalog-content";
// import ItemsComponent from "@/components/items/items-component"
// import BomsComponent from "@/components/boms/boms-component"
// import CatalogComponent from "@/components/catalog/catalog-component"
// import { useEffect } from "react"
// import { countryCode } from "@/atoms/userAtoms"

export default function SearchValueContent() {

  // const country = useAtomValue(countryCode) as number
  // const setPostId = useSetAtom(searchValueAtom)
  // const setSearch = useSetAtom(catalogFilter)
  // const setCatalogSearchValue = useSetAtom(catalogSearchValue)

  // useEffect(() => {
  //setPostId(searchValue)
  //setSearch({ searchValue: searchValue.value, valueType: searchValue.valueType, countryCode: country })
  //setCatalogSearchValue({value: searchValue.value, valueType: searchValue.searchValueType.id, countryCode: searchValue.countryCode})
  //}, [searchValue]);

  const params = useParams();
  const { id } = params;
  const { setFilter, setSearchValue } = useCatalogStore()
  const filter = { id: Number(id) }

  const { data, isFetched } = useQuery({
    queryKey: ["searchvalue", id],
    queryFn: async () => { return getSearchValueById(filter) },
  })

  useEffect(() => {
    if (data) {
      setSearchValue({value: data.value, valueType: data.valueType, countryCode: data.countryCode})
      setFilter(filter)
    }
  }, [data]);

  if (!isFetched) return <div>Loading...</div>

  return (
    <div className="flex flex-col w-full">
      <div className="w-1/2">
        <SearchValueForm searchValue={data} />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="w-full">
          <CatalogContent  />
        </div>
        <div className="flex ">
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="items">Artiklar</TabsTrigger>
              <TabsTrigger value="boms">Bomstrukturer</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              {/* <ItemsComponent type="catalog" /> */}
            </TabsContent>
            <TabsContent value="boms">
              {/* <BomsComponent type="catalog"/> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

