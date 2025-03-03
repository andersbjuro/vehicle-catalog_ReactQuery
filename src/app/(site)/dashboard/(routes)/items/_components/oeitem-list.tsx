"use client"

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { OeItem } from "@/types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ItemCard } from "./item-card";
import ItemFilter from "./item-filter";
import useItemsFilter from "@/hooks/use-items-filter";
import { createOeItemsFilter } from "@/graphql/filters";
import { useItems } from "@/hooks/useItems";

export default function OeItemList() {
  const { filters } = useItemsFilter();
  const router = useRouter();

  const filter = {
    filter: createOeItemsFilter({ query: filters.query, brand: filters.brand!, productGroup: filters.productGroup! })
  }

  const { data, isLoading } = useItems(filter)

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
      <div className="flex justify-between">
        <Heading title="OE Artiklar" description={showTotal()} />
        <div className="flex gap-2">
          <ItemFilter />
        </div>
      </div>
      {!isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mt-4">
          {data && data.items ? (
            data.items.map((item: OeItem) => (
              <ItemCard key={item.oeItemId}
                item={item}
                handleClick={() => router.push(`/dashboard/items/${item.oeItemId}/edit`)}
              />
            ))
          ) : (
            <h1 className="text-2xl font-bold">Ingen data</h1>
          )}
        </div>

      ) : (

        <div></div>
      )}
    </div>
  )
}
