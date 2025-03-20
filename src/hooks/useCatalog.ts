import { getCatalog } from "@/actions/catalog";
import { useQuery } from "@tanstack/react-query";

export function useCatalog(filter: any) {
  return useQuery({
    queryKey: ["catalog", filter.searchValue],
    queryFn: async () => { return getCatalog(filter) },
    enabled: filter.searchValue !== ""
  })
}
