"user client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useItemsFilterStore from '@/hooks/use-itemsfilter-store'
import { useBrands } from '@/hooks/useBrands';
import { ProductGroup } from '@/types';
import { ListFilter, Search } from 'lucide-react';
import { useState } from 'react';

export default function ItemsFilterBar() {
  const [open, setOpen] = useState(false);
  const { query, brandId, productGroupId, setQuery, setBrand, setProductGroup, resetFilter } = useItemsFilterStore()
  const { data } = useBrands()
  const pGroups: ProductGroup[] = data?.brands.filter((x: { id: any; }) => x.id == brandId)[0]?.productGroups

  function handleSearch(formData: FormData) {
    const value = formData.get("query")?.toString()
    setQuery(value!)
  }

  function handleBrandChange(value: string): void {
    setBrand(Number(value));
  }

  function handleProductGroupChange(value: string): void {
    setProductGroup(Number(value));
  }

  function handelResetFilter(): void {
    resetFilter()
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="default"
          className="mb-2"
        >
          <ListFilter className="mr-2 size-4" />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[300px]">
        <div className="flex flex-col gap-y-3 w-full">
          <div className="relative ml-auto w-full ">
            <form action={handleSearch}>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                name="query"
                type="search"
                className="w-full rounded-lg pl-8 "
                placeholder='sök...'
                defaultValue={query || ''}
              />
            </form>
          </div>
          <div className="w-full">
            <Label className="text-muted-foreground">Varumärke</Label>
            <Select onValueChange={handleBrandChange} defaultValue={brandId.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="varumärke" />
              </SelectTrigger>
              <SelectContent>
                {data && data.brands && data.brands.map((brand: any) => (
                  <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Label className="text-muted-foreground">Produktgrupp</Label>
            <Select onValueChange={handleProductGroupChange} defaultValue={productGroupId.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="produktgrupp" />
              </SelectTrigger>
              <SelectContent>
                {pGroups && pGroups.map((pg: any) => (
                  <SelectItem key={pg.productGroup.id} value={pg.productGroup.id.toString()}>
                    {pg.productGroup.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='w-full'>
            <Button className='w-full' onClick={handelResetFilter}>Återställ</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
