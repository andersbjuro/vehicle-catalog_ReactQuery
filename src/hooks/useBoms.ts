import { onGetBoms } from "@/actions/bom";
import { useQuery } from "@tanstack/react-query";

export function useBoms(filter: any) {

  return useQuery({
    queryKey: ['boms', filter],
    queryFn: async () => { return onGetBoms(filter) },
  })
}
