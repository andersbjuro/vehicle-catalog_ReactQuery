import { getOeItemList } from "@/actions/item";
import { useQuery } from "@tanstack/react-query";

export function useItems(filter: any) {

  return useQuery({
    queryKey: ['items', filter],
    queryFn: async () => { return getOeItemList(filter) },
  })
}
