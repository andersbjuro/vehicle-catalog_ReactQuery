import {onGetProductGroups } from "@/actions/item";
import { useQuery } from "@tanstack/react-query";

export function useProductGroups() {

  return useQuery({
    queryKey: ['productgroups'],
    queryFn: async () => { return onGetProductGroups() },
  })
}
