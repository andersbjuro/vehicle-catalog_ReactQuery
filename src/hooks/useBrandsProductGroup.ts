import { onGetBrandsProductGroup } from "@/actions/item";
import { useQuery } from "@tanstack/react-query";

export function useBrandsProductGroup(mappingType: number) {

  return useQuery({
    queryKey: ['brandsproductgroup', mappingType.toString()],
    queryFn: async () => { return onGetBrandsProductGroup(mappingType) },
  })
}
