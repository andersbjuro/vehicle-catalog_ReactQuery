"use client"

import { ListFilter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/filter-select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useCatalogFilter from "@/hooks/use-catalog-filter";
import { useValueTypes } from "@/hooks/useValueType";

export default function SearchValueFilter() {
  const [open, setOpen] = useState(false);
  const { filters, updateFilter, clearFilters } = useCatalogFilter();
  const { data } = useValueTypes()

  const handleSearch = (formData: FormData) => {
    const term = formData.get("query")?.toString() as string
    updateFilter("query", term)
  }
  const brandChange = ((value: string) => {
    updateFilter("valueType", Number(value))
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="default"
        >
          <ListFilter className="mr-2 size-4" />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[300px] p-5">
        <div className="flex flex-col w-full">
          <form action={handleSearch} className="flex flex-col gap-3">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                name="query"
                type="search"
                placeholder="sök"
                className="w-full rounded-lg pl-8 "
                defaultValue={filters.query}
              />
            </div>
            <div className="w-full">
              <FilterSelect options={data?.searchValueTypes} value={filters.valueType?.toString() || ""} onChange={(value) => brandChange(value)} defaultValue={filters.valueType?.toString() || undefined} placeholder="Katalogtyp" />
            </div>
            <div className='w-full'>
              <Button className='w-full' onClick={clearFilters}>Återställ</Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}
