"use client"

import { useSearchParams } from "next/navigation";
import { createBomFilter } from "@/graphql/filters";
import BomFilter from "./bom-filter";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { BomCard } from "./bom-card";
import { Bom } from "@/types";
import { useBoms } from "@/hooks/useBoms";

export default function BomList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = {
    filter: createBomFilter({ searchValue: searchParams.get('q') || '', brandId: searchParams.get('brand'), productGroupId: searchParams.get('pg') })
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
    return total
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <Heading title="Bomstrukturer" description={showTotal().toString()} />
        <BomFilter />
        <Button className="w-20" onClick={() => router.push(`/dashboard/boms/create`)}>
          <Plus className="mr-2 h-4 w-4" /> Ny
        </Button>
      </div>
      {!isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 mt-4">
          {data && data.boms ? (
            data.boms.nodes.map((bom: Bom) => (
              <BomCard key={bom.id}
                bom={bom}
                handleClick={() => router.push(`/dashboard/boms/${bom.id}/edit`)}
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
