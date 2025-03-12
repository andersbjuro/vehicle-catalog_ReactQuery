'use client';

import { Search} from 'lucide-react';
import { Input } from "@/components/ui/input"
import useVehicleFilter from '@/hooks/use-vehicle-filter';

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const { filters, updateFilter, clearFilter } = useVehicleFilter();

  const handleSearch = (formData: FormData) => {
    const term = formData.get("query")?.toString() as string
    updateFilter("query", term)
  }

  return (
    <div className="relative ml-auto flex-1 ">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <form action={handleSearch}>
        <Input
          name="query"
          type="search"
          placeholder={placeholder}
          className="w-full rounded-lg pl-8 "
          defaultValue={filters.query}
        />
      </form>
    </div>
  );
}
