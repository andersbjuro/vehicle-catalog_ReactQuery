"use client"

//import { useAtomValue } from "jotai";
import { formatDate } from "@/lib/utils";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
// import { searchValueAtom } from '@/atoms/catalogAtoms';
import { SearchValue } from "@/types";

interface Props {
  searchValue: SearchValue
}

const SearchValueForm = ({searchValue}: Props) => {

  //const searchValue = useAtomValue(searchValueAtom);
  return (

    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>SÖKVÄRDE - <span className=" text-primary">{searchValue?.value}</span></CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">Sökvärdetyp: {searchValue?.searchValueType.name} - Land {searchValue?.countryCode}</p>
            <p className="text-xs text-muted-foreground">Skapad: {searchValue ? formatDate(searchValue?.created) : ''} Ändrad {searchValue ? formatDate(searchValue?.modified) : ''}</p>
          </div>
        </CardContent>
      </Card>
    </div>

  )
}

export default SearchValueForm
