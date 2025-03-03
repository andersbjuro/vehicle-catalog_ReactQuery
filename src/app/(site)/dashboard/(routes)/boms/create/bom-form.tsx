"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBom } from "@/actions/bom";
import { useActionState } from "react";
import { useCurrentSession } from "@/hooks/use-current-session";
import { useProductGroups } from "@/hooks/useProductGroups";
import { useBrands } from "@/hooks/useBrands";
import { Button } from "@/components/ui/button";
import { BomActionResponse } from "@/types/bom";

function BomForm() {
  const brands = useBrands()
  const productGroups = useProductGroups()
  const { user } = useCurrentSession()

  const initialState: BomActionResponse = {
    success: false,
    message: '',
  }

  const [state, action, isPending] = useActionState(createBom, initialState)

  return (

      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>BOM</CardTitle>
          <CardDescription>
            Här kan du skapa en ny bomartikel
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form action={action} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Namn</Label>
              <Input
                id='name'
                name='name'
                type="text"
                className={state?.errors?.name ? 'border-red-500' : ''}
              />
              <Input
                id='countryCode'
                name='countryCode'
                type="hidden"
                defaultValue={user?.locale}
              />
              {state?.errors?.name && (
                <p id="name-error" className="text-sm text-red-500">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Varumärke</Label>
              <Select
                key='brandId'
                name='brandId'
              >
                <SelectTrigger>
                  <SelectValue placeholder="varumärke" />
                </SelectTrigger>
                <SelectContent>
                  {brands.data && brands.data.map((brand: any) => (
                    <SelectItem key={brand.id} value={brand.id.toString()}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.brandId && (
                <p id="brand-error" className="text-sm text-red-500">
                  {state.errors.brandId[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>Produktgrupp</Label>
              <Select
                key='productGroupId'
                name='productGroupId'
              >
                <SelectTrigger>
                  <SelectValue placeholder="produktgrupp" />
                </SelectTrigger>
                <SelectContent>
                  {productGroups.data && productGroups.data.map((pg: any) => (
                    <SelectItem key={pg.id} value={pg.id.toString()}>
                      {pg.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.productGroupId && (
                <p id="productgroup-error" className="text-sm text-red-500">
                  {state.errors.productGroupId[0]}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? 'Skapar Bom...' : 'Skapa Bom'}
          </Button>
        </form>
        </CardContent>
      </Card>
  )
}

export default BomForm
