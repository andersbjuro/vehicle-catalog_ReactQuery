"use client"

import useNewEceStore from "@/store/use-newece-store"
import { CopyFromTable } from "../../newece/_components/copy-from-table"
import { useCopyCatalogSearchQuery } from "@/hooks/useCopyCatalogSearch"
import useCatalogStore from "@/store/use-catalog-store";
import { useEffect } from "react";

function CopySearchvalueContent() {
  const { searchValue } = useCatalogStore();
  const { setCatalogSearch } = useNewEceStore()
  const { data, isFetched } = useCopyCatalogSearchQuery(searchValue.searchValue)

  useEffect(() => {
    setCatalogSearch(data)
  }, [searchValue, data])

  return (
    <div>
      {isFetched &&
        <CopyFromTable />
      }
    </div>
  )
}

export default CopySearchvalueContent
