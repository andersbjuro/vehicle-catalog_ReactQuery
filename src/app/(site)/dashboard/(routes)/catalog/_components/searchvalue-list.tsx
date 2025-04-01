"use client"

import { useRouter } from "next/navigation"
import { LoaderCircle, Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button"
import { SearchValueCard } from "./searchvalue-card";
import useCatalogFilter from "@/hooks/use-catalog-filter";
import { useSerachValues } from "@/hooks/useSerachValues";
import { createSearchValueFilter } from "@/graphql/filters";
import SearchValueFilter from "./searchvalue-filter";
import useToggleViewStore from "@/store/use-toggleview-store";
import ToggleViewIcon from "@/components/toggle-view-icon";
import { SearchValueGrid } from "./searchvalue-grid";
import { routes } from "@/config/routes";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { translation } from "@/config/translation";

export default function SearchValueList() {
  const t = useTranslations(translation.catalogPage);
  const { currentView } = useToggleViewStore()
  const { filters } = useCatalogFilter();
  const router = useRouter();

  const filter = {
    filter: createSearchValueFilter({ query: filters.query, valueType: filters.valueType })
  }

  const { data, isLoading } = useSerachValues(filter)
  const showTotal = () => {
    const tot = data?.totalCount || '';
    return tot <= 100 ? tot.toString() : t('of') + tot.toString();
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between ">
        <Heading title={t('title')} description={showTotal().toString()} />
        <div className="flex gap-3 items-center">
          <ToggleViewIcon />
          <SearchValueFilter />
          <Button size="default" className="w-20" onClick={() => router.push(routes.createCatalog())}>
            <Plus className="mr-2 h-4 w-4" /> {t('addnew')}
          </Button>
        </div>
      </div>
      <Suspense>
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
                  handleClick={() => router.push(routes.editCatalog(sv.id))}
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
      </Suspense>
    </div>
  )
}
