import { onGetBrands } from "@/actions/item";
import { useQuery } from "@tanstack/react-query";

export function useBrands() {

  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => { return onGetBrands() },
  })
}
