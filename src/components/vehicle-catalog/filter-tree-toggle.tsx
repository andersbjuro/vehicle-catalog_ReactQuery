"use client"

import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

interface FilterTreeToggleProps {
  options: any[];
  onChange: (value: string) => void;
  value?: string;
  defaultValue?: string;
}

const FilterTreeToggle: React.FC<FilterTreeToggleProps> = ({
  options,
  onChange,
  defaultValue,
  value
}) => {

  return (
    <div className="">
      <ToggleGroup className="w-full justify-between" type="single" value={value} defaultValue={defaultValue} onValueChange={onChange}>
        {options?.map((option) => (
          <ToggleGroupItem key={option.level} value={option.nodeId} className={cn('h-9 px-2 data-[state=on]:bg-gray-300', option.noOfItems > 0 ? 'bg-green-500' : '')} >
             {option.level}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

export default FilterTreeToggle;
