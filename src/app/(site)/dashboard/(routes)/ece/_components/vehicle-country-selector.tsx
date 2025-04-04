"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useVehicleFilter from "@/hooks/use-vehicle-filter";
import { ChevronsLeftRight, Globe2 } from "lucide-react"

export default function VehicleCountrySelector() {
  const { filters, updateFilter, clearFilters} = useVehicleFilter();

  const handleCountryChange = (value: any) => {
    clearFilters()
    updateFilter("country", Number(value))
  }

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div role="button" className="flex items-center justify-between text-sm p-3 w-48 hover:bg-primary/5 rounded">
            <div className=" gap-x-2 flex items-center max-w-[150px]">
              <Globe2 className="h-5 w-5" />
              <span className=" text-start font-medium line-clamp-1">{filters.country === 752 ? 'Sverige' : 'Norge'}</span>
            </div>
            <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start" alignOffset={11} forceMount>
          <DropdownMenuRadioGroup value={filters.country.toString()} onValueChange={handleCountryChange} defaultValue={filters.country.toString()}>
            <DropdownMenuRadioItem value="752">Sverige</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="578">Norge</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
