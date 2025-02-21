"use client"

import { BomsTable } from "./boms-table";
import useBomsFilterStore from "@/hooks/use-bomsfilter-store";
import { useBoms } from "@/hooks/useBoms";


export default function BomsContent({ type }: { type: "catalog" | "vehiclecatalog" }) {
  const { filter } = useBomsFilterStore()

  const parameter = { filter: filter }
  const { data } = useBoms(parameter)

  return (
    <div>
      {data &&
        <BomsTable boms={data?.boms.nodes} bomsCount={data?.boms.totalCount} type={type} />
      }
    </div>
  )
}
