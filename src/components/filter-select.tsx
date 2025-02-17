"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

interface FilterOption {
  name: string;
  id: string;
}

interface FilterSelectProps {
  options: FilterOption[];
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
  defaultValue?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  options,
  placeholder,
  onChange,
  defaultValue,
  value
}) => {
  return (
    <div className="w-full">
      <Select value={value} onValueChange={onChange} defaultValue={defaultValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{placeholder}</SelectLabel>
            {options?.map((option: any) => (
              <SelectItem key={option.id} value={option.id?.toString()}>
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSelect;
