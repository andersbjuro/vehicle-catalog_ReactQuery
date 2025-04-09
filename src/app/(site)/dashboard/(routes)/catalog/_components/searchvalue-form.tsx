"use client"

import { formatDate } from "@/lib/utils";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { SearchValue } from "@/types";
import { useTranslations } from "next-intl";
import { translation } from "@/config/translation";
import VehicleInfoDialog from "./vehicle-info-dialog";

interface Props {
  searchValue: SearchValue
}

const SearchValueForm = ({ searchValue }: Props) => {
  const t = useTranslations(translation.catalogPage);
  return (

    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle><span className=" text-primary">{searchValue?.value}</span></CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {searchValue &&
            <div className="flex items-center justify-b mb-2 gap-2">
              <div className="flex flex-col text-sm w-full">
                <p className="text-xs text-muted-foreground">{t('valueType')} {searchValue?.searchValueType.name} - Land {searchValue?.countryCode}</p>
                <p className="text-xs text-muted-foreground">{t('created')} {searchValue ? formatDate(searchValue?.created) : ''} {t('updated')} {searchValue ? formatDate(searchValue?.modified) : ''}</p>
              </div>
              {(searchValue?.valueType === 1 || searchValue?.valueType === 5) && <VehicleInfoDialog searchValue={{value: searchValue.value, valueType: searchValue.valueType}} />}
            </div>
          }
        </CardContent>
      </Card>
    </div>

  )
}

export default SearchValueForm
