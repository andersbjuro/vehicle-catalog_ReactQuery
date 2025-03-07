
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBomItemsToCatalog } from "@/actions/item";
import { BookPlus } from "lucide-react";
import useRoleAccess from "@/hooks/useRoleAccess";
import { useSession } from "next-auth/react";
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
      return addBomItemsToCatalog(searchValue.searchValue, searchValue.valueType, searchValue.countryCode, rowIds)
    },
    onSuccess: () => {
      //queryClient.invalidateQueries({ queryKey: ["catalog", searchValue.searchValue] })
      queryClient.invalidateQueries()
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
