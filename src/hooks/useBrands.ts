import { onGetBrands } from "@/actions/bom";
import { useQuery } from "@tanstack/react-query";

export function useBrands() {

  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => { return onGetBrands() },
  })
}
