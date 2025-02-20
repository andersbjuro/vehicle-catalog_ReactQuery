
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBomItemsToCatalog, addItemsToBom, addItemsToCatalog } from "@/actions/item";
import { BookPlus } from "lucide-react";
import useRoleAccess from "@/hooks/useRoleAccess";
import { useSession } from "next-auth/react";
import useBomStore from "@/hooks/use-bom-store";
import useCatalogStore from "@/hooks/use-catalog-store";

interface Props {
  rowIds: any,
  callbackAction?: () => void
}

export default function AddToCatalogButton({ rowIds, callbackAction }: Props) {
  const session = useSession()
  const { searchValue } = useCatalogStore()
  let access = useRoleAccess(session, searchValue.countryCode, 'CatalogManager').hasAccess && rowIds.length !== 0
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return addItemsToCatalog(searchValue.searchValue, searchValue.valueType, searchValue.countryCode, rowIds)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalog", searchValue.searchValue] })
      toast.success("Artiklar tillaggda till katalogen")
    },
  })
  const removeItems = async () => {
    await mutation.mutateAsync()
    if (callbackAction) callbackAction()
  }

  return (
    <Button size="default" variant='destructive' disabled={!access} onClick={() => removeItems()}>
      <BookPlus className="size-4" />
    </Button>
  );
}
