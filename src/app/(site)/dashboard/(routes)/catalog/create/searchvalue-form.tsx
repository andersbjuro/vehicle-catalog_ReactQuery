"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { useCurrentSession } from "@/hooks/use-current-session";
import { Button } from "@/components/ui/button";
import { SearchValueActionResponse } from "@/types/searchvalue";
import { createSearchValue } from "@/actions/catalog";
import { useValueTypes } from "@/hooks/useValueType";

function SearchValueForm() {
  const valueTypes = useValueTypes()
  const { user } = useCurrentSession()

  const initialState: SearchValueActionResponse = {
    success: false,
    message: '',
  }

  const [state, action, isPending] = useActionState(createSearchValue, initialState)

  return (

    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>SÖKVÄRDE</CardTitle>
        <CardDescription>
          Här kan du skapa ett nytt sökvärde
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="searchvalue">Sökvärde</Label>
              <Input
                id='searchvalue'
                name='searchvalue'
                type="text"
                className={state?.errors?.searchValue ? 'border-red-500' : ''}
              />
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

            <div className="flex flex-col gap-3">
              <Label>Typ</Label>
              <Select
                key='valuetype'
                name='valuetype'
              >
                <SelectTrigger>
                  <SelectValue placeholder="sökvärdestyp" />
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

          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? 'Skapar Sökvärde...' : 'Skapa Sökvärde'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SearchValueForm
