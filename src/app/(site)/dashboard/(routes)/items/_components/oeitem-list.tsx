"use client"

import { Heading } from "@/components/heading";
import { FlattOeItem, OeItem } from "@/types";
import { useRouter } from "next/navigation";
import { ItemCard } from "./item-card";
import ItemFilter from "./item-filter";
import useItemsFilter from "@/hooks/use-items-filter";
import { createOeItemsFilter } from "@/graphql/filters";
import { useItems } from "@/hooks/useItems";
import { LoaderCircle } from "lucide-react";
import { ItemsGrid } from "./items-grid";
import ToggleViewIcon from "@/components/toggle-view-icon";
import useToggleViewStore from "@/store/use-toggleview-store";
import { routes } from "@/config/routes";
import { useTranslations } from "next-intl";
import { translation } from "@/config/translation";

export default function OeItemList() {
  const t = useTranslations(translation.oePage);
  const { filters } = useItemsFilter();
  const { currentView } = useToggleViewStore()
  const router = useRouter();

  const filter = {
    filter: createOeItemsFilter({ query: filters.query, brand: filters.brand!, productGroup: filters.productGroup! })
  }

  const { data, isLoading } = useItems(filter)

  const showTotal = () => {
    const tot = data?.totalCount || '';
    return tot <= 100 ? tot.toString() : t('of') + tot.toString();
  }

  const flatteOeItems: FlattOeItem[] = []
  data?.items?.forEach((item: any) => {
    if (item.oeRefs.length === 0) {
      flatteOeItems.push({ oeItemId: item.oeItemId, oeName: item.oeName, itemId: '', itemName: '', brand: item.brand.name, productGroup: item.productGroup.name })
    }
    else {
      item.oeRefs.forEach((ref: any) => {
        flatteOeItems.push({ oeItemId: item.oeItemId, oeName: item.oeName, itemId: ref.itemId, itemName: ref.itemName, brand: item.brand.name, productGroup: item.productGroup.name })
      })
    }
  })

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <Heading title={t('title')} description={showTotal()} />
        <div className="flex gap-3 items-center">
          <ToggleViewIcon />
          <ItemFilter />
        </div>
      </div>

      {isLoading && <div className="flex items-center mt-20 mx-auto">
        <LoaderCircle className="size-14 animate-spin" />
      </div>
      }

      {!isLoading && currentView === 'grid' &&
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mt-4">
          {data && data.items ? (
            data.items.map((item: OeItem) => (
              <ItemCard key={item.oeItemId}
                item={item}
                handleClick={() => router.push(routes.editItem(item.oeItemId))}
              />
            ))
          ) : (
            <h1 className="text-2xl font-bold">Ingen data</h1>
          )}
        </div>
      }

      {!isLoading && currentView === 'list' &&
        <div className="grid grid-cols-1">
          {data && data.items &&
            <ItemsGrid items={flatteOeItems} />
          }
        </div>
      }
    </div>
  )
}
