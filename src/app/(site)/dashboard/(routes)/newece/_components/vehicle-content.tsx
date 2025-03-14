"use client"

import { Heading } from "@/components/heading"
import { NewItemsTable } from "./new-item-table"
import { CopyFromTable } from "./copy-from-table"
import { useNewEceItems } from "@/hooks/useNewEceItems"
import { LoaderCircle } from "lucide-react"

export default function VehicleContent() {

  const { data, isLoading } = useNewEceItems()

  {
    isLoading && <div className="flex items-center mt-20 mx-auto">
      <LoaderCircle className="size-14 animate-spin" />
    </div>
  }

  return (
    <div className="flex flex-col w-full">
      <Heading title="Nya sökvärden" description='' />
      <div className="grid grid-cols-2 gap-2 mt-2">
        {!isLoading &&
          <div>{data &&
            <NewItemsTable newItems={data} />
          }</div>
        }

        {!isLoading && <CopyFromTable />}
      </div>
    </div>
  )
}
