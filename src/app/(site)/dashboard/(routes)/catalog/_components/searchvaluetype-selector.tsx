"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchValueType } from '@/types';

interface ValueTypeSelectorProps {
  valueTypes: SearchValueType[];
}

const SearchValueTypeSelector = ({ valueTypes }: ValueTypeSelectorProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleValueChange = ((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('valueType', value);
    } else {
      params.delete('valueType');
    }
    replace(`${pathname}?${params.toString()}`);
  })

  return (
    <div className='w-48'>
      <Select onValueChange={handleValueChange} defaultValue={searchParams.get('valueType')?.toString()}>
        <SelectTrigger>
          <SelectValue placeholder="sökvärdetyp" />
        </SelectTrigger>
        <SelectContent>
          {valueTypes && valueTypes.map((vt: any) => (
            <SelectItem key={vt.id} value={vt.id.toString()}>
              {vt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SearchValueTypeSelector
