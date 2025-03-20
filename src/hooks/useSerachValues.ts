import { onGetSearchValues } from "@/actions/catalog";
import { useQuery } from "@tanstack/react-query";

export function useSerachValues(filter: any) {

  return useQuery({
    queryKey: ['catalog', filter],
    queryFn: async () => { return onGetSearchValues(filter) },
  })
}
