"use client"

import SearchInput from "@/components/search-input"
import { SearchValueType } from "@/types";
import SearchValueTypeSelector from "./searchvaluetype-selector";

interface SearchValueSearchProps {
  searchValueTypes: SearchValueType[];
}

export const SearchValueSearch = ({ searchValueTypes }: SearchValueSearchProps) => {
  return (
    <div className="flex sm:flex-row items-center justify-between gap-2 w-96">
      <SearchInput placeholder="sök..." />
      <SearchValueTypeSelector valueTypes={searchValueTypes} />
    </div>
  )
}
