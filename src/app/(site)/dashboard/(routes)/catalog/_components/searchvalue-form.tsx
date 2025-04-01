"use client"

import { formatDate } from "@/lib/utils";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { SearchValue } from "@/types";
import { useTranslations } from "next-intl";
import { translation } from "@/config/translation";

interface Props {
  searchValue: SearchValue
}

const SearchValueForm = ({searchValue}: Props) => {
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
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">{t('valueType')} {searchValue?.searchValueType.name} - Land {searchValue?.countryCode}</p>
            <p className="text-xs text-muted-foreground">{t('created')} {searchValue ? formatDate(searchValue?.created) : ''} {t('updated')} {searchValue ? formatDate(searchValue?.modified) : ''}</p>
          </div>
        </CardContent>
      </Card>
    </div>

  )
}

export default SearchValueForm
