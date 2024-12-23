"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductGroup } from "@/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBrands } from "@/hooks/useBrands";

export default function BomFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const { data } = useBrands()
  const brandId: any = params.get('brand')
  const pGroups: ProductGroup[] = data?.brands.filter((x: { id: any; }) => x.id == brandId)[0]?.productGroups

  const handleSearch = (formData: FormData) => {
    const term = formData.get("query")?.toString()
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  const brandChange = ((value: string) => {
    if (value) {
      params.set('brand', value);
      params.delete('pg');
    } else {
      params.delete('brand');
    }
    replace(`${pathname}?${params.toString()}`);
  })
  const pGrouphange = ((value: string) => {
    if (value) {
      params.set('pg', value);
    } else {
      params.delete('pg');
    }
    replace(`${pathname}?${params.toString()}`);
  })

  return (
    <div>
      <form action={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative  w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            name="query"
            type="search"
            placeholder="sök"
            className="w-full rounded-lg pl-8 "
            defaultValue={searchParams.get('q')?.toString()}
          />
        </div>
        <div className="min-w-40">
          <Select onValueChange={brandChange} defaultValue={searchParams.get('brand')?.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="Varumärke" />
            </SelectTrigger>
            <SelectContent >
              {data && data.brands && data.brands.map((brand: any) => (
                <SelectItem key={brand.id} value={brand.id.toString()}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-40">
          <Select onValueChange={pGrouphange} defaultValue={searchParams?.get('pg')?.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="Produktgrupp" />
            </SelectTrigger>
            <SelectContent>
              {pGroups && pGroups?.map((pg: any) => (
                <SelectItem key={pg.productGroup.id} value={pg.productGroup.id.toString()}>
                  {pg.productGroup.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  )
}
