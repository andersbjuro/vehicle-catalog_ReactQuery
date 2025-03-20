"use client"

import { Table } from "@tanstack/react-table"
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItemsFromCatalog } from "@/actions/item";
import { Trash2 } from "lucide-react";
import useRoleAccess from "@/hooks/useRoleAccess";
import { useSession } from "next-auth/react";
import useCatalogStore from "@/store/use-catalog-store";
import { useEffect } from "react";

interface Props<TData> {
  table: Table<TData>,
  callbackAction?: () => void
}

export default function RemoveFromCatalogButton<TData>({ table, callbackAction }: Props<TData>) {

  const session = useSession()
  const { searchValue } = useCatalogStore()
  let access = useRoleAccess(session, searchValue.countryCode, 'CatalogManager').hasAccess //&& table.getSelectedRowModel().rows.length !== 0
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return removeItemsFromCatalog(searchValue.searchValue, searchValue.valueType, table?.getSelectedRowModel().flatRows?.map(i => i.original))
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

  useEffect(() => {
    console.log(table.getSelectedRowModel())
    }, [])

  return (
    <Button size="default" variant='destructive' disabled={!access} onClick={() => removeItems()}>
      <Trash2 className="size-4" />
    </Button>
  );
}
