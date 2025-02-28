import { getSearchValue } from "@/actions/catalog";
import { getVehicle, getVehicleNo } from "@/actions/vehicle";
import { useQuery } from "@tanstack/react-query";

export function useVehicle(regNo: string, country: string) {

  let v = { value: regNo, valueType: country === "Sverige" ? 1 : 5 }
  const { data: searchValue } = useQuery({
    queryKey: ['searchvalue', v],
    enabled: !!regNo,
    queryFn: async () => { return getSearchValue(v) },
  })

  const { data } = useQuery({
    queryKey: ['vehicle', regNo],
    enabled: searchValue === null ? true : false,
    queryFn: async () => { return country === 'Sverige' ? getVehicle(regNo) : getVehicleNo(regNo) },
  })

  return { searchValue, data }
}
