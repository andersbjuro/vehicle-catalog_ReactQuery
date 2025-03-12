"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useSettingStore from '@/store/use-setting-store'
import { setCountryOnServer } from '@/actions/settings'
import { ChevronsLeftRight, Globe2 } from "lucide-react"

export default function UserCountrySelector() {
  const {
    setting: { availableCountries, countryCode },
    setCountryCode,
  } = useSettingStore()

  const selected = availableCountries.find(({ code }) => code === Number(countryCode));

  const handleCountryCodeChange = async (newCode: string) => {
     const a = await setCountryOnServer(newCode)
    setCountryCode(Number(newCode))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role="button" className="flex items-center justify-between text-sm p-3 w-48 hover:bg-primary/5 rounded">
          <div className=" gap-x-2 flex items-center max-w-[150px]">
            <Globe2 className="h-5 w-5" />
            <span className=" text-start font-medium line-clamp-1">{selected?.text}</span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" alignOffset={11} forceMount>
        <DropdownMenuRadioGroup
          value={countryCode.toString()}
          onValueChange={handleCountryCodeChange}
        >
          {availableCountries.map((c) => (
            <DropdownMenuRadioItem key={c.text} value={c.code.toString()}>
              {c.text}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
