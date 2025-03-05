"use client"

import { useRouter } from "next/navigation"
import { LoaderCircle, Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button"
import { SearchValueCard } from "./searchvalue-card";
import useCatalogFilter from "@/hooks/use-catalog-filter";
import { useCatalog } from "@/hooks/useCatalog";
import { createSearchValueFilter } from "@/graphql/filters";
import SearchValueFilter from "./searchvalue-filter";
import useToggleViewStore from "@/hooks/use-toggleview-store";
import ToggleViewIcon from "@/components/toggle-view-icon";
import { SearchValueGrid } from "./searchvalue-grid";

export default function SearchValueList() {
  const { currentView } = useToggleViewStore()
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
        <div className="flex gap-3 items-center">
          <ToggleViewIcon />
          <SearchValueFilter />
          <Button size="default" className="w-20" onClick={() => router.push(`/dashboard/catalog/create`)}>
            <Plus className="mr-2 h-4 w-4" /> Ny
          </Button>
        </div>
      </div>

      {isLoading && <div className="flex items-center mt-20 mx-auto">
        <LoaderCircle className="size-14 animate-spin" />
      </div>
      }

      {!isLoading && currentView === 'grid' &&
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mt-4">
          {data && data.searchValues ? (
            data.searchValues.map((sv) => (
              <SearchValueCard key={sv.id}
                searchValue={sv}
                handleClick={() => router.push(`/dashboard/catalog/${sv.id}/edit`)}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>
      }

      {!isLoading && currentView === 'list' &&
        <div className="grid grid-cols-1">
          {data && data.searchValues &&
            <SearchValueGrid serachValues={data.searchValues} />
          }
        </div>
      }

      {/* {!isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mt-4">
          {data && data.searchValues ? (
            data.searchValues.map((sv) => (
              <SearchValueCard key={sv.id}
                searchValue={sv}
                handleClick={() => router.push(`/dashboard/catalog/${sv.id}/edit`)}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>

      ) : (
        <div className="flex items-center mt-20 mx-auto">
          <LoaderCircle className="size-14 animate-spin" />
        </div>
      )} */}
    </div>
  )
}
