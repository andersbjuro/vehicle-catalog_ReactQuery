import { getVehicleSearchValue, getVehicleNoSearchValue } from "@/actions/vehicle";
import { useQuery } from "@tanstack/react-query";

export function useVehicleSearchValue(searchValue: any) {

  const { data: vehicle } = useQuery({
    queryKey: ['vehiclesearchvalue', searchValue],
    queryFn: async () => { return getVehicleSearchValue(searchValue.value)  },
    //queryFn: async () => { return searchValue.valueType === "1" ? getVehicleSearchValue(searchValue.value) : getVehicleNoSearchValue(searchValue.value) },
    enabled:  searchValue.value?.length >= 6,
  })

  return { vehicle }
}
