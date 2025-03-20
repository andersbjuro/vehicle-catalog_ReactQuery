import { getSearchValue } from "@/actions/catalog";
import { getVehicle, getVehicleNo } from "@/actions/vehicle";
import { useQuery } from "@tanstack/react-query";

export function useVehicle(filters: any) {

  let v = { value: filters.query, valueType: filters.country === 752 ? 1 : 5 }
  const { data: searchValue } = useQuery({
    queryKey: ['searchvalue', v],
    enabled: !!filters.query,
    queryFn: async () => { return getSearchValue(v) },
  })

  const { data: vehicle } = useQuery({
    queryKey: ['vehicle', filters],
    enabled: searchValue === null ? true : false,
    queryFn: async () => { return filters.country === 752 ? getVehicle(filters.query) : getVehicleNo(filters.query) },
  })

  return { searchValue, vehicle }
}
