import { onGetSearchValuesTypes } from "@/actions/catalog";
import { useQuery } from "@tanstack/react-query";

export function useValueTypes() {

  return useQuery({
    queryKey: ['valuetypes'],
    queryFn: async () => { return onGetSearchValuesTypes() },
  })
}
