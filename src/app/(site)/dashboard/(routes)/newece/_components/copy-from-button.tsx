
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { copyCatalogSearch } from "@/actions/vehicle";
import { BookPlus } from "lucide-react";
import useNewEceStore from "@/store/use-newece-store";
import { useEffect, useState } from "react";

interface Props {
  rowIds: any,
  callbackAction?: () => void
}

export default function CopyFromButton({ rowIds, callbackAction }: Props) {
  const { resetCatalogSearch } = useNewEceStore()
  const queryClient = useQueryClient()
  const [access, setAccess] = useState(false)

  const mutation = useMutation({
    mutationFn: () => {
      return rowIds.forEach((row: { searchId: string; newSearchId: string; }) => {
        copyCatalogSearch(row.searchId, row.newSearchId);
      });
    },
    onSuccess() {
      queryClient.invalidateQueries()
      toast.success("Katalogvärden kopierade")
      resetCatalogSearch()
    },
    onError()
    {
      toast.error("Fel när katalogvärden kopieras")
    }
  })

  const handleCreate = async () => {
    await mutation.mutateAsync()
    if (callbackAction) callbackAction()
  }

  function validateSelection(rowIds: any): boolean {
    const uniqueIds = new Set();
    for (const row of rowIds) {
      if (uniqueIds.has(row.level)) {
        return true; // Duplicate found
      }
      uniqueIds.add(row.level);
    }
    return false; // No duplicates
  }

  useEffect(() => {
    const hasDuplicates = validateSelection(rowIds)
    const isEmpty = rowIds.length === 0
    setAccess(hasDuplicates || isEmpty)
  }, [rowIds]);

  return (
    <Button size="default" variant='default' disabled={access} onClick={() => handleCreate()}>
      <BookPlus className="size-4" />
    </Button>
  );
}
