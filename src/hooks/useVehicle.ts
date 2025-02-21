import { getVehicle, getVehicleNo } from "@/actions/vehicle";
import { useQuery } from "@tanstack/react-query";

export function useVehicle(regNo: string, country: string) {

  return useQuery({
    queryKey: ['vehicle', regNo],
    enabled: !!regNo,
    queryFn: async () => { return country === 'Sverige' ? getVehicle(regNo) : getVehicleNo(regNo) },
  })
}
