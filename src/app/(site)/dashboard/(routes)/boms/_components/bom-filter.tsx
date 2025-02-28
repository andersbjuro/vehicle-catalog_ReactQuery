"use client"

import { ListFilter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBrandsProductGroup } from "@/hooks/useBrandsProductGroup";
import useBomsFilter from "@/hooks/use-boms-filter";
import FilterSelect from "@/components/filter-select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BomFilter() {
  const [open, setOpen] = useState(false);
  const { filters, updateFilter, clearFilter, clearFilters } = useBomsFilter();
  const { data } = useBrandsProductGroup(0)
  const pGroups = data?.brands.filter((x: { id: any; }) => x.id == filters.brand)[0]?.productGroups.map(((x: any) => x.productGroup))

  const handleSearch = (formData: FormData) => {
    const term = formData.get("query")?.toString() as string
    updateFilter("query", term)
  }
  const brandChange = ((value: string) => {
    updateFilter("brand", Number(value))
    clearFilter("productGroup")
  })
  const pGrouphange = ((value: string) => {
    updateFilter("productGroup", Number(value))
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
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
              <FilterSelect options={data?.brands} value={filters.brand?.toString() || ""} onChange={(value) => brandChange(value)} defaultValue={filters.brand?.toString() || undefined} placeholder="Varumärke" />
            </div>
            <div className="w-full">
              <FilterSelect options={pGroups} value={filters.productGroup?.toString() || ""} onChange={(value) => pGrouphange(value)} defaultValue={filters.productGroup?.toString() || undefined} placeholder="Produktgrupp" />
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
