import { onGetNewEceItems } from "@/actions/vehicle";
import { useQuery } from "@tanstack/react-query";

export function useNewEceItems() {

  return useQuery({
    queryKey: ['neweceitems'],
    queryFn: async () => { return onGetNewEceItems() },
  })
}
