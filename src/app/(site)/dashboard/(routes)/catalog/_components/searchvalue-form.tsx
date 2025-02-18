"use client"

import { useAtomValue } from "jotai";
import { formatDateTime } from "@/lib/utils";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { searchValueAtom } from '@/atoms/catalogAtoms';
import { BackButton } from "@/components/back-button";

function SearchValueForm() {

  const searchValue = useAtomValue(searchValueAtom);
  return (

    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>SÖKVÄRDE - <span className=" text-primary">{searchValue?.value}</span></CardTitle>
            <BackButton title="Stäng" variant="secondary" className="w-20" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">Sökvärdetyp: {searchValue?.searchValueType.name} - Land {searchValue?.countryCode}</p>
            <p className="text-xs text-muted-foreground">Skapad: {searchValue ? formatDateTime(searchValue?.created).dateOnly : ''} Ändrad {searchValue ? formatDateTime(searchValue?.modified).dateOnly : ''}</p>
          </div>
        </CardContent>
      </Card>
    </div>

  )
}

export default SearchValueForm
