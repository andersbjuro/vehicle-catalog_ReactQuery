"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useVehicleStore from "@/store/use-vehicle-store"
import { ChevronsLeftRight, Globe2 } from "lucide-react"

export default function VehicleCountrySelector() {
  const { country, setCountry } = useVehicleStore()

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div role="button" className="flex items-center justify-between text-sm p-3 w-48 hover:bg-primary/5 rounded">
            <div className=" gap-x-2 flex items-center max-w-[150px]">
              <Globe2 className="h-5 w-5" />
              <span className=" text-start font-medium line-clamp-1">{country}</span>
            </div>
            <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start" alignOffset={11} forceMount>
          <DropdownMenuRadioGroup value={country} onValueChange={setCountry} defaultValue={country}>
            <DropdownMenuRadioItem value="Sverige">Sverige</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Norge">Norge</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
