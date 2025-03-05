"use client"

import { createBomFilter } from "@/graphql/filters";
import BomFilter from "./bom-filter";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { BomCard } from "./bom-card";
import { Bom } from "@/types";
import { useBoms } from "@/hooks/useBoms";
import useBomsFilter from "@/hooks/use-boms-filter";
import useToggleViewStore from "@/hooks/use-toggleview-store";
import ToggleViewIcon from "@/components/toggle-view-icon";
import { BomsGrid } from "./boms-grid";

export default function BomList() {
  const { currentView } = useToggleViewStore()
  const { filters } = useBomsFilter();
  const router = useRouter();

  const filter = {
    filter: createBomFilter({ query: filters.query, brand: filters.brand!, productGroup: filters.productGroup! })
  }

  const { data, isLoading } = useBoms(filter)

  const showTotal = () => {
    let total = ' '
    const t = data?.boms.totalCount || '';
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
        <Heading title="Bomstrukturer" description={showTotal()} />
        <div className="flex gap-3 items-center">
          <ToggleViewIcon />
          <BomFilter />
          <Button size="default" className="w-20" onClick={() => router.push(`/dashboard/boms/create`)}>
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
          {data && data.boms ? (
            data.boms.nodes.map((bom: Bom) => (
              <BomCard key={bom.id}
                bom={bom}
                handleClick={() => router.push(`/dashboard/boms/${bom.id}/edit`)}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>
      }

      {!isLoading && currentView === 'list' &&
        <div className="grid grid-cols-1">
          {data && data.boms &&
            <BomsGrid boms={data.boms.nodes} />
          }
        </div>
      }
    </div>
  )
}
