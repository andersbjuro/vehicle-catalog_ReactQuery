import { SearchValue } from '@/types/index';

import { getVehicleSearchValue, getVehicleNoSearchValue } from "@/actions/vehicle";
import { useQuery } from "@tanstack/react-query";

export function useVehicleSearchValue(searchValue: SearchValue) {

  const { data: vehicle } = useQuery({
    queryKey: ['vehiclesearchvalue', searchValue],
    queryFn: async () => { return searchValue.searchValueType.id === 1 ? getVehicleSearchValue(searchValue.value) : getVehicleNoSearchValue(searchValue.value) },
  })

  return { vehicle }
}
