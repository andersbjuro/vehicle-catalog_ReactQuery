
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createCatalogSearch } from "@/actions/vehicle";
import { BookPlus } from "lucide-react";
import useNewEceStore from "@/store/use-newece-store";

interface Props {
  rowIds: any,
  callbackAction?: () => void
}

export default function CreateCatalogSearchButton({ rowIds, callbackAction }: Props) {
  const {setCatalogSearch} = useNewEceStore()
  let access = rowIds.length === 1

  const mutation = useMutation({
    mutationFn: () => {
      return createCatalogSearch(rowIds[0].rowId)
    },
    onSuccess(data) {
      setCatalogSearch(data?.data.createCatalogSearch)
    },
  })

  const handleCreate = async () => {
    await mutation.mutateAsync()
    if (callbackAction) callbackAction()
  }

  return (
    <Button size="default" variant='default' disabled={!access} onClick={() => handleCreate()}>
      <BookPlus className="size-4" />
    </Button>
  );
}
