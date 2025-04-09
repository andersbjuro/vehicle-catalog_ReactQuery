"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useState } from "react";
import { useCurrentSession } from "@/hooks/use-current-session";
import { Button } from "@/components/ui/button";
import { SearchValueActionResponse } from "@/types/searchvalue";
import { createSearchValue } from "@/actions/catalog";
import { useValueTypes } from "@/hooks/useValueType";
import { useTranslations } from "next-intl";
import { translation } from "@/config/translation";
import VehicleInfoDialog from "../_components/vehicle-info-dialog";

function SearchValueForm() {
  const t = useTranslations(translation.catalogPage);
  const valueTypes = useValueTypes()
  const { user } = useCurrentSession()
  const [searchValue, setSearchValue] = useState('')
  const [selectedValueType, setSelectedValueType] = useState('')

  const initialState: SearchValueActionResponse = {
    success: false,
    message: '',
  }

  const [state, action, isPending] = useActionState(createSearchValue, initialState)

  function valueTypeChanged(value: string) {
    setSelectedValueType(value)
  }

  return (

    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{t('createTitle')}</CardTitle>
        <CardDescription>
          {t('createDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>{t('createTypeLabel')}</Label>
              <Select
                key='valuetype'
                name='valuetype'
                onValueChange={valueTypeChanged}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('createTypeLabel').toLowerCase()} />
                </SelectTrigger>
                <SelectContent>
                  {valueTypes.data && valueTypes.data.searchValueTypes.map((type: any) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.valueType && (
                <p id="city-error" className="text-sm text-red-500">
                  {state.errors.valueType[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="searchvalue">{t('createSearchValueLabel')}</Label>
              <div className="flex items-center justify-between gap-2">
                <Input
                  id='searchvalue'
                  name='searchvalue'
                  type={selectedValueType === '' ? 'hidden' : 'text'}
                  placeholder={t('createSearchValueLabel').toLowerCase()}
                  onChangeCapture={(e) => setSearchValue(e?.currentTarget?.value)}
                  className={state?.errors?.searchValue ? 'border-red-500' : ''}
                />
                {selectedValueType === '1' &&
                  <VehicleInfoDialog searchValue={{ value: searchValue, valueType: selectedValueType }} />}
              </div>

              <Input
                id='countryCode'
                name='countryCode'
                type="hidden"
                defaultValue={user?.locale}
              />
              {state?.errors?.searchValue && (
                <p id="city-error" className="text-sm text-red-500">
                  {state.errors.searchValue[0]}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? t('createSubmitIsPending') : t('createSubmit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SearchValueForm
