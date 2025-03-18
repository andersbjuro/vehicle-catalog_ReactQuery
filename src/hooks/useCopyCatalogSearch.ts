import { onGetCatalogSearchToCopy } from "@/actions/vehicle";
import { useQuery } from "@tanstack/react-query";

export function useCopyCatalogSearchQuery(searchId: string) {

  return useQuery({
    queryKey: ['copysearchvalue', searchId],
    queryFn: async () => { return onGetCatalogSearchToCopy(searchId) },
    //enabled: searchId !== ''
  })
}
