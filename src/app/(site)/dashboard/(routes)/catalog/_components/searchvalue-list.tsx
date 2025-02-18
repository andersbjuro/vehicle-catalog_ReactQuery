"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button"
import { SearchValueCard } from "./searchvalue-card";
//import { SearchValueSearch } from "./searchvalue-search";
import useCatalogFilter from "@/hooks/use-catalog-filter";
import { useCatalog } from "@/hooks/useCatalog";
import { createSearchValueFilter } from "@/graphql/filters";
import SearchValueFilter from "./searchvalue-filter";

export default function SearchValueList() {
  const { filters } = useCatalogFilter();
  const router = useRouter();

  const filter = {
    filter: createSearchValueFilter({ query: filters.query, valueType: filters.valueType })
  }

  const { data, isLoading } = useCatalog(filter)

  const showTotal = () => {
    let total = ' '
    const t = data?.totalCount || '';
    if (t <= 100) {
      total = "visar " + t;
    } else {
      total = "visar " + 100 + " av " + t;
    }
    return total.toString()
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between ">
        <Heading title="Katalog sökvärden" description={showTotal().toString()} />
        <div className="flex gap-2">
          <SearchValueFilter />
          <Button  className="w-20" onClick={() => router.push(`/dashboard/catalog/create`)}>
            <Plus className="mr-2 h-4 w-4" /> Ny
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 mt-4">
        {data?.searchValues && data?.searchValues.length > 0 ? (
          data?.searchValues.map((sv) => (
            <SearchValueCard key={sv.id}
              searchValue={sv}
              handleClick={() => router.push(`/dashboard/catalog/${sv.id}/edit`)}
            />
          ))
        ) : (
          <h1 className="text-2xl font-bold">Ingen data</h1>
        )}
      </div>
    </div>
  )
}
