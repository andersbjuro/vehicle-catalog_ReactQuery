import { onGetNewVehicleItems } from "@/actions/vehicle";
import { useQuery } from "@tanstack/react-query";

export function useNewVehicleItems() {

  return useQuery({
    queryKey: ['newvehicleitems'],
    queryFn: async () => { return onGetNewVehicleItems() },
  })
}
