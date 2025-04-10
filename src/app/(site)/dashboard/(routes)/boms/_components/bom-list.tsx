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
import useToggleViewStore from "@/store/use-toggleview-store";
import ToggleViewIcon from "@/components/toggle-view-icon";
import { BomsGrid } from "./boms-grid";
import { routes } from "@/config/routes";
import { useTranslations } from "next-intl";
import {translation} from "@/config/translation";

export default function BomList() {
  const t = useTranslations(translation.bomPage);
  const { currentView } = useToggleViewStore()
  const { filters } = useBomsFilter();
  const router = useRouter();

  const filter = {
    filter: createBomFilter({ query: filters.query, brand: filters.brand!, productGroup: filters.productGroup! })
  }

  const { data, isLoading } = useBoms(filter)

  const showTotal = () => {
    const tot = data?.boms.totalCount || '';
    return tot <= 100 ? tot.toString() : t('of') + tot.toString();
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <Heading title={t('title')} description={showTotal()} />
        <div className="flex gap-3 items-center">
          <ToggleViewIcon />
          <BomFilter />
          <Button size="default" className="w-20" onClick={() => router.push(routes.createBom())}>
            <Plus className="mr-2 h-4 w-4" /> {t('addnew')}
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
                handleClick={() => router.push( routes.editBom(bom.id))}
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
