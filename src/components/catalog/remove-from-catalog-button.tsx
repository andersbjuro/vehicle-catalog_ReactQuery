"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItemsFromCatalog } from "@/actions/item";
import { Trash2 } from "lucide-react";
import useRoleAccess from "@/hooks/useRoleAccess";
import { useSession } from "next-auth/react";
import useCatalogStore from "@/store/use-catalog-store";

interface Props {
  rowIds: any,
  callbackAction?: () => void
}

export default function RemoveFromCatalogButton({ rowIds, callbackAction }: Props) {
  const session = useSession()
  const { searchValue } = useCatalogStore()
  let access = useRoleAccess(session, searchValue.countryCode, 'CatalogManager').hasAccess && rowIds.length !== 0
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return removeItemsFromCatalog(searchValue.searchValue, searchValue.valueType, rowIds)
    },
    onSuccess: () => {
      //queryClient.invalidateQueries({ queryKey: ["catalog", searchValue.searchValue] })
      queryClient.invalidateQueries()
      toast.success("Artiklar borttagna ur katalogen")
    },
  })
  const removeItems = async () => {
    await mutation.mutateAsync()
    if (callbackAction) callbackAction()
  }

  return (
    <Button size="default" variant='destructive' disabled={!access} onClick={() => removeItems()}>
      <Trash2 className="size-4" />
    </Button>
  );
}
