
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";
import { Bom } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItemsFromBom } from "@/actions/item";

interface Props {
  bom: Bom,
  rowIds: any,
  open: boolean;
  onClose: () => void;
}

export default function RemoveFromBomDialog({bom,  rowIds, open, onClose}: Props) {
  const [option, setOption] = useState('0');
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return removeItemsFromBom(bom.id, rowIds, option)
    },
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: ["bom", bom.id.toString()] })
      toast.success("Artiklar borttagna till bomlistan")
    },
  })
  const removeItems = async () => {
    await mutation.mutateAsync()
    onClose()
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
            onClick={onClose}
          >
            Avbryt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
