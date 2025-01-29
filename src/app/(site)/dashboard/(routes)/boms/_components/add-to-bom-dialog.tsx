
import { toast } from "sonner"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Bom } from "@/types";
import useItemsFilterStore from "@/hooks/use-itemsfilter-store";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { addItemsToBom } from "@/actions/item";

interface Props {
  bom: Bom,
  open: boolean;
  onClose: () => void;
}

export default function AddToBomDialog({
  bom,
  open,
  onClose,
}: Props) {
  const { rowSelection } = useItemsFilterStore()
  const [option, setOption] = useState('0');
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return addItemsToBom(bom.id, rowSelection, option)
    },
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: ["bom", bom.id.toString()] })
      toast.success("Artiklar tillaggda till bomlistan")
    },
  })

  const addItems = async () => {
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
        <DialogHeader>
          <DialogTitle>Lägg till Artiklar till bomlistan - {bom.id}</DialogTitle>
        </DialogHeader>
        <div >
          <Select value={option} onValueChange={setOption}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Välj alternativ för updatering" />
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
            onClick={async () => await addItems()}
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
