
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItemsFromBom } from "@/actions/item";
import { Trash2 } from "lucide-react";
import useRoleAccess from "@/hooks/useRoleAccess";
import { useSession } from "next-auth/react";
import useBomStore from "@/hooks/use-bom-store";

interface Props {
  rowIds: any,
  callbackAction?: () => void
}

export default function RemoveFromBomDialog({ rowIds, callbackAction }: Props) {
  const session = useSession()
  const { filter } = useBomStore()
  let access = useRoleAccess(session, filter.countryCode, 'CatalogManager').hasAccess && rowIds.length !== 0
  const [open, setOpen] = useState(false)
  const [option, setOption] = useState('0');
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return removeItemsFromBom(rowIds, option)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bom", filter.id.toString()] })
      toast.success("Artiklar borttagna till bomlistan")
    },
  })
  const removeItems = async () => {
    await mutation.mutateAsync()
    setOpen(false)
    if (callbackAction) callbackAction()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='icon' variant='destructive' disabled={!access}>
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader >
          <DialogTitle>Ta bort valda artiklar ur bomlistan</DialogTitle>
        </DialogHeader>
        <div >
          <Select value={option} onValueChange={setOption}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Välj alternativ för borttagning" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Alternativ</SelectLabel>
                <SelectItem value="0">Bomrader</SelectItem>
                <SelectItem value="1">Bomrader + Katalograder</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button
            variant="default"
            onClick={async () => await removeItems()}
            disabled={option === '' || mutation.isPending}
          >
            Updatera
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Avbryt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
